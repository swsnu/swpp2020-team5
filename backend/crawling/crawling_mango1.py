from selenium.common.exceptions import ElementClickInterceptedException
from selenium.common.exceptions import ElementNotInteractableException
from selenium.common.exceptions import ElementNotVisibleException
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.action_chains import ActionChains
from selenium import webdriver

import requests
import json
import time

restaurants = json.loads(open("restaurants.json").read())
reviews_db = open("reviews_mango1.json", "a")
mismatches = open("mismango.txt", "a")
start_at = 105
end_at   = 210
currently_at = 0

driver = webdriver.Chrome('./chromedriver86')
driver.implicitly_wait(3)

for restaurant in restaurants:
  currently_at += 1
  if end_at == currently_at:
    print("mango1: ending at " + str(currently_at))
    driver.close()
    exit()
  print("mango1: currently at " + str(currently_at))
  if start_at > currently_at:
    continue

  try:  # to get rid of ads
    url = "https://www.mangoplate.com/search/" + restaurant["name"]
    driver.get(url)
  except ElementClickInterceptedException:
    driver.find_element_by_css_selector(".ad_btn.ad_block_btn").click()

  try:  # the actual crawling
    url = "https://www.mangoplate.com/search/" + restaurant["name"]
    driver.get(url)
    driver.find_element_by_class_name("thumb").click()
  except NoSuchElementException:
    name_token = restaurant["name"].split()
    for token in name_token:
      try:
        url = "https://www.mangoplate.com/search/" + name_token
        driver.get(url)
        driver.find_element_by_class_name("thumb").click()
      except NoSuchElementException:
        pass
      else:
        break
  addr_bundle = driver.find_element_by_css_selector(".only-desktop td").text
  mango_road_token = addr_bundle.split("\n")[0].split()
  mango_addr_token = addr_bundle.split("\n")[1].split()
  mango_road = mango_road_token[1] + mango_road_token[2] + mango_road_token[3]
  mango_addr = mango_addr_token[2] + mango_addr_token[3] + mango_addr_token[4]

  addr_token = restaurant["location"]["address"]["address_name"].split()
  road_token = restaurant["location"]["address_name"].split()
  road = road_token[1] + road_token[2] + road_token[3]
  addr = addr_token[1] + addr_token[2] + addr_token[3]

  if mango_addr != addr and mango_road != road:
    mismatches.write(restaurant["name"] + "\n")
    print("address mismatch: " + str(currently_at))
    print("  ㄴ" + restaurant["name"])
    continue

  reviews = []
  prevlen = -1
  while prevlen != len(reviews):
    prevlen = len(reviews)
    time.sleep(1)
    morebutton = driver.find_element_by_class_name("RestaurantReviewList__MoreReviewButton")
    ActionChains(driver).move_to_element(morebutton).click(morebutton).perform()
    reviews = driver.find_elements_by_class_name("RestaurantReviewItem__ReviewText")
  reviews_text = ""
  for review in reviews:
    reviews_text += review.text + "\n"
  mangoreview = {}
  mangoreview["Id"] = restaurant["Id"]
  mangoreview["text"] = restaurant["text"]
  json.dump(mangoreview, reviews_db, indent=2, ensure_ascii=False)
driver.close()
