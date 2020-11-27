from selenium.common.exceptions import ElementNotInteractableException, NoSuchElementException, JavascriptException, ElementClickInterceptedException
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from selenium import webdriver
import requests
import json
import time
import re

restaurant_db = open("restaurants.json", "a")
mismatches = open("mismatches.txt").readlines()

start_at = 0
end_at   = 2
currently_at = 0

# driver = webdriver.Chrome('./chromedriver86')
driver = webdriver.Chrome('./chromedriver87')
driver.implicitly_wait(3)

driver.get('https://map.kakao.com/')
time.sleep(1)
for mismatch in mismatches:

  currently_at += 1
  if end_at == currently_at:
    print("review: ending at " + str(currently_at))
    exit()
  print("review: currently at " + str(currently_at))
  if start_at > currently_at:
    continue

  split_mismatch = mismatch.split(">")
  if len(split_mismatch) == 3:
    search_name =     split_mismatch[0]
    restaurant_name = split_mismatch[1].strip()
    naver_id =        split_mismatch[2].strip()
  elif len(split_mismatch) == 2:
    search_name =     split_mismatch[0]
    restaurant_name = split_mismatch[0].strip()
    naver_id =        split_mismatch[1].strip()

  driver.find_element_by_id("search.keyword.query").clear()
  driver.find_element_by_id("search.keyword.query").send_keys('샤로수길 ' + search_name + Keys.RETURN)
  time.sleep(1)
  try:
    link = driver.find_element_by_class_name("moreview").get_attribute("href")
  except NoSuchElementException:
    continue
  restaurant = {}
  driver.execute_script(f"window.open('{link}');")
  driver.switch_to.window(driver.window_handles[1])
  kakao_id = re.findall(r'\d+', driver.current_url)[0]

  #
  # fetch menus
  #
  restaurant_menu = {}
  menus = driver.find_elements_by_class_name("info_menu")
  try:
    driver.find_element_by_css_selector(".cont_menu .link_more").click()
  except NoSuchElementException:
    pass
  if len(menus) > 0:
    for menu in menus:
      menu_name = menu.find_element_by_class_name("loss_word").text
      try:
        menu_price = menu.find_element_by_class_name("price_menu").text
      except NoSuchElementException:
        menu_price = None
      restaurant_menu[menu_name] = menu_price

  #
  #  fetch open time
  #
  restaurant_open_time = {"영업 시간": {}, "휴무일": []}
  # determin whether the full info is in the popup or not
  try:
    morebutton = driver.find_element_by_css_selector(".location_detail.openhour_wrap .btn_more")
    ActionChains(driver).move_to_element(morebutton).click(morebutton).perform()
    optime_categ = driver.find_elements_by_css_selector(".location_detail .inner_floor .tit_operation")
    optime_table = driver.find_elements_by_css_selector(".location_detail .inner_floor .list_operation")
  except NoSuchElementException:
    optime_categ = driver.find_elements_by_css_selector(".location_present .tit_operation")
    optime_table = driver.find_elements_by_css_selector(".location_present .list_operation")
  for i in range(len(optime_categ)):
    categ = optime_categ[i].text
    if "영업시간" in categ:
      opdays = optime_table[i].find_elements_by_tag_name("li")
      for _optime in opdays:
        opday = _optime.text
        optime = _optime.find_element_by_class_name("time_operation").text
        try:
          # caution is an optional text for details
          caution = _optime.find_element_by_class_name("txt_caution").text
        except NoSuchElementException:
          caution = ""
        optime = optime + caution
        opday = opday.replace(optime, "")
        restaurant_open_time["영업 시간"][opday] = optime
    elif "휴무일" in categ:
      offdays = optime_table[i].find_elements_by_tag_name("li")
      for _offtime in offdays:
        offday = _offtime.text
        restaurant_open_time["휴무일"].append(offday)

  #
  #  fetch kakao rating
  #
  avg_of_kakao_ratings = float(driver.find_element_by_css_selector(".link_evaluation .color_b").text)
  num_of_kakao_ratings = float(driver.find_element_by_css_selector(".link_evaluation .color_g").text.strip("()").replace(",", ""))
  sum_of_kakao_ratings = avg_of_kakao_ratings * num_of_kakao_ratings

  #
  #  fetch json address
  #
  kakao_address_token = driver.find_element_by_css_selector(".location_detail .txt_address").text.split()
  address = ""
  for i in range(4):
    address += kakao_address_token[i] + " "
  url = 'https://dapi.kakao.com/v2/local/search/address.json?query=' + address
  rest_api_key = '5a1efcd81d2d654f4aa0979d9867a01a'
  header = {'Authorization': 'KakaoAK ' + rest_api_key}
  r = requests.get(url, headers=header)
  try:
    restaurant_location = r.json()["documents"][0]
  except IndexError:
    restaurant_location = {"address_name": address}

  # 
  #  fetch food category
  #   
  driver.get('https://map.kakao.com/')
  driver.find_element_by_id("search.keyword.query").send_keys('샤로수길 ' + search_name + Keys.RETURN)
  try:
    driver.find_element_by_class_name("subcategory").click()
  except ElementNotInteractableException: # restaurant name is too damn long
    mismatches.write(restaurant_name + " - category hidden\n")
    restaurant_category = None
  except ElementClickInterceptedException: # searched result is not a restaurant
    restaurant_category = None
  except NoSuchElementException: # searched result is somehow not found
    mismatches.write(restaurant_name + " - category search failed\n")
    restaurant_category = None
  else:
    try:
      restaurant_category = driver.find_elements_by_css_selector(".breadcrumb a")[1].text
    except IndexError:
      restaurant_category = driver.find_elements_by_css_selector(".breadcrumb a")[0].text

  naver_link = "https://pcmap.place.naver.com/restaurant/"+ naver_id + "/review/visitor"
  driver.get(naver_link)

  #
  #  fetch naver ratings & get average rating
  #   
  try:
    driver.find_element_by_css_selector("._1Y6hi._1A8_M")
  except NoSuchElementException:
    num_of_naver_ratings = 0
    sum_of_naver_ratings = 0
  else:
    ratinginfo = driver.find_elements_by_css_selector("._1Y6hi")
    if(len(ratinginfo) > 1):
      avg_of_naver_ratings = float(ratinginfo[0].find_element_by_tag_name("em").text)
      num_of_naver_ratings = float(ratinginfo[1].find_element_by_tag_name("em").text.replace(",", ""))
      sum_of_naver_ratings = avg_of_naver_ratings * num_of_naver_ratings
    else:
      num_of_naver_ratings = 0
      sum_of_naver_ratings = 0

  sum_of_ratings = sum_of_kakao_ratings + sum_of_naver_ratings
  num_of_ratings = num_of_kakao_ratings + num_of_naver_ratings
  if num_of_ratings == 0:
    restaurant_rating = 0
  else:
    restaurant_rating = sum_of_ratings / num_of_ratings

  restaurant['name'] = restaurant_name
  restaurant["foodCategory"] = restaurant_category
  restaurant["avgRating"] = round(restaurant_rating, 2)
  restaurant["numOfRating"] = num_of_ratings
  restaurant['menu'] = restaurant_menu
  restaurant['openTime'] = restaurant_open_time
  restaurant["location"] = restaurant_location
  restaurant['kakaoLink'] = link
  restaurant["naverLink"] = naver_link

  json.dump(restaurant, restaurant_db, indent=2, ensure_ascii=False)
  restaurant_db.write(",\n")

  driver.close()
  driver.switch_to.window(driver.window_handles[0])
