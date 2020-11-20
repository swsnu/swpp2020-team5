import sys
sys.path.append('/home/mushypeas/workspace/project/backend/')
sys.path.append('/home/mushypeas/workspace/swpp/lib/python3.8/site-packages')
print(sys.path)
from ATM.models import Restaurant

# from selenium.common.exceptions import ElementClickInterceptedException
# from selenium.common.exceptions import ElementNotInteractableException
# from selenium.common.exceptions import ElementNotVisibleException
# from selenium.common.exceptions import NoSuchElementException
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


driver = webdriver.Chrome('backend/crawling/chromedriver86')
# driver = webdriver.Chrome('backend/crawling/chromedriver87')
driver.implicitly_wait(3)
url = 'https://map.kakao.com/'
driver.get(url)
driver.find_element_by_id("search.keyword.query").send_keys('샤로수길 음식점' + Keys.RETURN)
links = driver.find_elements_by_class_name("moreview")
restaurants = []
ActionChains(driver).click(links[0]).perform() # don't know why but it doesn't work without this
# for each restaurant
for link in links:
  restaurant = {}
  restaurant['kakaoLink'] = link.get_attribute('href')
  ActionChains(driver).click(link).perform()
  # driver.switch_to.window(driver.window_handles[1])
  driver.switch_to_window(driver.window_handles[1])
  # fetch menus
  menus = driver.find_elements_by_class_name("info_menu")
  menu = {}
  for _menu in menus:
    menu_name = _menu.find_element_by_class_name("loss_word").text
    menu_price = _menu.find_element_by_class_name("price_menu").text
    menu[menu_name] = menu_price
  restaurant['menu'] = menus
  # fetch open time

  # restaurant['oepnTime'] = 