from selenium.common.exceptions import ElementNotInteractableException, NoSuchElementException, JavascriptException
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from selenium import webdriver

import requests
import json
import time
import re

restaurants_old = json.loads(open("restaurants(old).json").read())
restaurants = open("restaurants.json", "a")

driver = webdriver.Chrome('./chromedriver86')
# driver = webdriver.Chrome('./chromedriver87')
driver.implicitly_wait(3)

start_at = 0
end_at   = 500
currently_at = 0

for restaurant in restaurants_old:

  currently_at += 1
  if end_at == currently_at:
    print("Thumb: ending at " + str(currently_at))
    break
  print("Thumb: currently at " + str(currently_at))
  if start_at > currently_at:
    continue

  driver.get(restaurant["kakaoLink"])
  map_link = driver.find_element_by_css_selector("a.link_place").get_attribute("href")

  driver.get(restaurant["naverLink"] + "/photo")
  time.sleep(1)
  thumbnail = []
  images = driver.find_elements_by_css_selector("._2OSze .place_thumb img")
  for image in images:
    raw_url = image.get_attribute("src")
    img_url = re.findall("=http\\S+", raw_url)[0].replace("%3A", ":").replace("%2F", "/").replace("%3Foriginal", "").strip("=")
    thumbnail.append(img_url)
  restaurant["thumbNail"] = thumbnail
  restaurant["mapLink"] = map_link
  json.dump(restaurant, restaurants, indent=2, ensure_ascii=False)
  restaurants.write(",\n")
driver.close()