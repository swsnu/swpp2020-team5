# import sys
# sys.path.append('/home/mushypeas/workspace/project/backend/')
# sys.path.append('/home/mushypeas/workspace/swpp/lib/python3.8/site-packages')
# print(sys.path)
# from ATM.models import Restaurant

# from selenium.common.exceptions import ElementClickInterceptedException
from selenium.common.exceptions import ElementNotInteractableException
from selenium.common.exceptions import StaleElementReferenceException
# from selenium.common.exceptions import ElementNotVisibleException
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import JavascriptException
# from selenium.webdriver.support import expected_conditions as WHEN
from selenium.webdriver.common.action_chains import ActionChains
# from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.keys import Keys
# from selenium.webdriver.common.by import By
from selenium import webdriver
from collections import OrderedDict
from urllib.request import urlopen
# from bs4 import BeautifulSoup

import requests
import json
import time
import re


# driver = webdriver.Chrome('backend/crawling/chromedriver86')
driver = webdriver.Chrome('backend/crawling/chromedriver87')
driver.implicitly_wait(3)
driver.get('https://map.kakao.com/')
driver.find_element_by_id("search.keyword.query").send_keys('샤로수길 음식점' + Keys.RETURN)
links = driver.find_elements_by_class_name("moreview")
restaurants = []
ActionChains(driver).click(links[0]).perform() # don't know why but it doesn't work without this
# for each restaurant
for link in links:
  restaurant = {}
  restaurant['kakaoLink'] = link.get_attribute('href')
  ActionChains(driver).click(link).perform()
  driver.switch_to.window(driver.window_handles[1])
  kakao_id = re.findall(r'\d+', driver.current_url)[0]

  #
  # fetch menus
  #
  menu = {}
  menus = driver.find_elements_by_class_name("info_menu")
  try:
    driver.find_element_by_css_selector(".cont_menu .link_more").click()
  except NoSuchElementException:
    pass
  for _menu in menus:
    menu_name = _menu.find_element_by_class_name("loss_word").text
    try:
      menu_price = _menu.find_element_by_class_name("price_menu").text
    except NoSuchElementException:
      menu_price = None
    menu[menu_name] = menu_price
  restaurant['menu'] = menu

  #
  #  fetch open time
  #
  open_time = {"영업 시간": {}, "휴무일": []}
  # determin whether the full info is in the popup or not
  try:
    driver.find_element_by_css_selector(".location_detail.openhour_wrap .btn_more").click()
    optimes = driver.find_elements_by_css_selector(".inner_floor .list_operation")
  except NoSuchElementException:
    optimes = driver.find_elements_by_css_selector(".location_present .list_operation")
  if len(optimes) > 2:  # there's something I'm not aware of, if the length is longer than 2
    print("optimes len exceeded in" + restaurant['kakaoLink'])
    exit()
  # optimes[0]: 영업시간 optimes[1]: 휴무일
  opdays = optimes[0].find_elements_by_tag_name("li")
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
    open_time["영업 시간"][opday] = optime
  if len(optimes) > 1: # 휴무일 info exists
    offdays = optimes[1].find_elements_by_tag_name("li")
    for _offtime in offdays:
      offday = _offtime.text
      open_time["휴무일"].append(offday)

  restaurant['openTime'] = open_time

  #
  #  fetch name & kakao rating
  #
  name = driver.find_element_by_css_selector(".place_details .tit_location").text
  restaurant['name'] = name

  avg_of_kakao_ratings = float(driver.find_element_by_css_selector(".link_evaluation .color_b").text)
  num_of_kakao_ratings = float(driver.find_element_by_css_selector(".link_evaluation .color_g").text.strip("()").replace(",", ""))
  sum_of_kakao_ratings = avg_of_kakao_ratings * num_of_kakao_ratings

  # # 
  # #  fetch kakao reviews
  # # 
  # kakao_reviews = []
  # while True:
  #   pages = len(driver.find_elements_by_css_selector(".paging_mapdetail .link_page"))
  #   for i in range(pages):
  #     driver.find_elements_by_css_selector(".paging_mapdetail .link_page")[i].click()
  #     time.sleep(1)
  #     review_list = driver.find_elements_by_css_selector(".list_evaluation li")
  #     for _review in review_list:
  #       review = {}

  #       review["restaurant"] = None # would be assigned soon

  #       userprofile = _review.find_element_by_class_name("profile_info")
  #       review["author"] = userprofile.get_attribute("data-username") # should be a dataset, but just for now
  #       # userid = userprofile.get_attribute("data-userid") # for later use

  #       review["site"] = "kakao"
  #       review["date"] = _review.find_element_by_css_selector(".time_write").text

  #       _rating = _review.find_element_by_css_selector(".star_info .num_rate")
  #       padding = _rating.find_element_by_css_selector(".screen_out").text
  #       rating = int((_rating.text).replace(padding, ""))
  #       review["rating"] = rating

  #       _comment = _review.find_element_by_class_name("comment_info")
  #       content = _comment.find_element_by_tag_name("span").text
  #       if content.endswith("..."): # expand potentially long comments
  #         try:
  #           morebutton = _comment.find_element_by_class_name("btn_fold")
  #           ActionChains(driver).move_to_element(morebutton).perform()
  #           morebutton.click()
  #           content = _comment.find_element_by_tag_name("span").text
  #         except JavascriptException: # comment wasnt long but ended with ...
  #           pass
  #         except ElementNotInteractableException: # why does this happen?
  #           print("what?")
  #           pass
  #       review["content"] = content

  #       print(review)
  #       kakao_reviews.append(review)
  #   try:
  #     driver.find_element_by_css_selector(".paging_mapdetail .btn_next").click()
  #     time.sleep(1)
  #   except NoSuchElementException:
  #     break

  # 
  #  fetch food category
  #   
  address_token = driver.find_element_by_css_selector(".location_detail .txt_address").text.split()
  address = ""
  for i in range(2):
    address += address_token[i] + " "
  address.strip()
  tosearch = address + name
  driver.get('https://map.kakao.com/')
  driver.find_element_by_id("search.keyword.query").send_keys(tosearch + Keys.RETURN)
  driver.find_element_by_class_name("subcategory").click()
  category = driver.find_elements_by_css_selector(".breadcrumb a")[1].text
  restaurant["foodCategory"] = category

  #
  #  save&move to naverlink
  #
  driver.get('https://www.naver.com/')
  driver.find_element_by_css_selector(".green_window .input_text").send_keys(tosearch + Keys.RETURN)
  driver.find_elements_by_class_name("biz_name_area")[0].click()
  driver.close()
  driver.switch_to.window(driver.window_handles[1])
  naver_id = re.findall(r'place/\d+', driver.current_url)[0].replace("place/", "")
  naver_link = "https://pcmap.place.naver.com/restaurant/" + naver_id
  restaurant["naverLink"] = naver_link
  driver.get(naver_link)
  ratinginfo = driver.find_elements_by_css_selector("._1Y6hi")

  #
  #  fetch naver ratings & get average rating
  #   
  avg_of_naver_ratings = float(ratinginfo[0].find_element_by_tag_name("em").text)
  num_of_naver_ratings = float(ratinginfo[1].find_element_by_tag_name("em").text.replace(",", ""))
  sum_of_naver_ratings = avg_of_naver_ratings * num_of_naver_ratings
  rating = (sum_of_kakao_ratings + sum_of_naver_ratings) / (num_of_kakao_ratings + num_of_naver_ratings)
  restaurant["avgRating"] = rating

  # #
  # #  fetch naver reviews 
  # #
  # driver.get("https://pcmap.place.naver.com/restaurant/"+ str(38460514) + "/review/visitor")
  # naver_reviews = []
  # while True:
  #   try:
  #     driver.find_element_by_class_name("_3iTUo").click()
  #     time.sleep(0.5)
  #   except NoSuchElementException:
  #     break
  # reviews = driver.find_elements_by_class_name("_2Cv-r")
  # for _review in reviews:
  #   review = {}

  #   try:  # check for reviews with no comments
  #     morebutton = _review.find_element_by_class_name("M_704") # expand long comments
  #     ActionChains(driver).move_to_element(morebutton).click(morebutton).perform()
  #     review['content'] = _review.find_element_by_class_name("WoYOw").text
  #   except NoSuchElementException:
  #     review['content'] = ""

  #   review['restaurant'] = None
  #   review['author'] = _review.find_element_by_class_name("hbo4A").text
  #   review['rating'] = _review.find_element_by_class_name("_2tObC").text
  #   review['date'] = _review.find_elements_by_css_selector(".ZvQ8X ._3WqoL")[0].text
  #   review['site'] = "naver"
  #   naver_reviews.append(review)
  print(restaurant)
  driver.close()
  driver.switch_to.window(driver.window_handles[0])