from bs4 import BeautifulSoup
import requests
from urllib.request import urlopen
import json
from collections import OrderedDict
import time
from selenium import webdriver
from konlpy.tag import Kkma
from konlpy.tag import Okt
from konlpy.tag import Hannanum
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import ElementNotVisibleException
from selenium.common.exceptions import ElementNotInteractableException

driver = webdriver.Chrome('./chromedriver')
driver.implicitly_wait(3)
url = 'https://map.kakao.com/'
driver.get(url)
i = 0
while True:
    try:
        i += 1
        driver.find_element_by_class_name(
            "RestaurantReviewList__MoreReviewButton").click()
        driver.find_element_by_id("search.keyword.query").send_keys("")
        if i > 50:
            break
        # driver.find_element_by_class_name("_3iTUo").click()
        # time.sleep(2)
    except NoSuchElementException:
        break
    except ElementNotInteractableException:
        try:
            driver.find_element_by_class_name("close_icon").click()
        except BaseException:
            break
# reviews = driver.find_elements_by_class_name("WoYOw")
reviews = driver.find_elements_by_class_name(
    "RestaurantReviewItem__ReviewText")
print(len(reviews))
reviews_text = ""
for review in reviews:
    reviews_text += (review.text + " ")
han = Hannanum()
tokens = han.morphs(reviews_text)
keywords = {}
for token in tokens:
    if token in keywords:
        keywords[token] += 1
    else:
        keywords[token] = 1

for keyword in keywords:
    if keywords[keyword] >= 5 and len(keyword) >= 2:
        print(keyword + ": " + str(keywords[keyword]))
