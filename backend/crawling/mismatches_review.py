from selenium.common.exceptions import ElementNotInteractableException, NoSuchElementException, JavascriptException
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from selenium import webdriver
import requests
import json
import time
import re

review_db = open("reviews0.json", "a")
mismismatches = open("mismatches.txt").readlines()
start_at = 0
end_at   = 6
currently_at = 0
# driver = webdriver.Chrome('./chromedriver86')
driver = webdriver.Chrome('./chromedriver87')
driver.implicitly_wait(3)

driver.get('https://map.kakao.com/')
time.sleep(1)
for mismatch in mismismatches:

  currently_at += 1
  if end_at == currently_at:
    print("review0: ending at " + str(currently_at))
    exit()
  print("review0: currently at " + str(currently_at))
  if start_at > currently_at:
    continue

  split_mismatch = mismatch.split(">")
  restaurant_name = split_mismatch[0]
  kakao_id = split_mismatch[1]
  naver_id = split_mismatch[2]

  time.sleep(1)
  link = "https://place.map.kakao.com/" + kakao_id
  restaurant_comments = ""
  restaurant_reviews = {}
  driver.execute_script(f"window.open('{link}');")
  driver.switch_to.window(driver.window_handles[1])

  # 
  #  fetch kakao reviews
  # 
  kakao_reviews = []
  while True:
    pages = len(driver.find_elements_by_css_selector(".paging_mapdetail .link_page"))
    for i in range(pages):
      driver.find_elements_by_css_selector(".paging_mapdetail .link_page")[i].click()
      time.sleep(1)
      screen_orienter = driver.find_element_by_css_selector(".ahead_info .ico_star.inner_star")
      ActionChains(driver).move_to_element(screen_orienter).perform()
      review_list = driver.find_elements_by_css_selector(".list_evaluation li")
      for _review in review_list:
        review = {}

        review["restaurant"] = int(kakao_id)
        review["site"] = "kakao"

        userprofile = _review.find_element_by_class_name("profile_info")
        review["author"] = userprofile.get_attribute("data-username") # should be a dataset, but just for now
        # userid = userprofile.get_attribute("data-userid") # for later use

        review["date"] = _review.find_element_by_css_selector(".time_write").text
        try:
          _rating = _review.find_element_by_css_selector(".star_info .num_rate")
          padding = _rating.find_element_by_css_selector(".screen_out").text
          rating = int((_rating.text).replace(padding, ""))
        except NoSuchElementException:
          rating = None
        review["rating"] = rating

        _comment = _review.find_element_by_class_name("comment_info")
        content = _comment.find_element_by_tag_name("span").text
        if content.endswith("..."): # expand potentially long comments
          try:
            _comment.find_element_by_class_name("btn_fold").click()
            content = _comment.find_element_by_tag_name("span").text
          except JavascriptException: # comment wasnt long but ended with ...
            pass
          except ElementNotInteractableException: # why does this happen?
            pass
        review["content"] = content
        restaurant_comments += content + "\n"
        kakao_reviews.append(review)
    try:
      driver.find_element_by_css_selector(".paging_mapdetail .btn_next").click()
      time.sleep(1)
    except NoSuchElementException:
      break

  #
  #  fetch naver reviews 
  #
  driver.get("https://pcmap.place.naver.com/restaurant/"+ naver_id + "/review/visitor")
  naver_reviews = []
  while True:
    try:
      driver.find_element_by_class_name("_3iTUo").click()
      time.sleep(0.5)
    except NoSuchElementException:
      break
  reviews = driver.find_elements_by_class_name("_2Cv-r")
  for _review in reviews:
    review = {}
    review['restaurant'] = int(kakao_id)
    review['site'] = "naver"
    review['author'] = _review.find_element_by_class_name("hbo4A").text
    review['date'] = _review.find_elements_by_css_selector(".ZvQ8X ._3WqoL")[0].text
    review['rating'] = _review.find_element_by_class_name("_2tObC").text

    try:  # check for reviews with no comments
      morebutton = _review.find_element_by_class_name("M_704") # expand long comments
      ActionChains(driver).move_to_element(morebutton).click(morebutton).perform()
      content = _review.find_element_by_class_name("WoYOw").text
      review['content'] = content
      restaurant_comments += content + "\n"
    except NoSuchElementException:
      review['content'] = ""

    naver_reviews.append(review)
  restaurant_reviews['name'] = restaurant_name
  restaurant_reviews['naver'] = naver_reviews
  restaurant_reviews['kakao'] = kakao_reviews
  json.dump(restaurant_reviews, review_db, indent=2, ensure_ascii=False)
  review_db.write(",\n")
  driver.close()
  driver.switch_to.window(driver.window_handles[0])
