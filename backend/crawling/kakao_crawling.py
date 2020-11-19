# import sys
# sys.path.append('/home/mushypeas/workspace/project/backend/')
# from ATM.models import Restaurant

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


browser = webdriver.Chrome('backend/crawling/chromedriver')
browser.implicitly_wait(3)
url = 'https://map.kakao.com/'
browser.get(url)
browser.find_element_by_id("search.keyword.query").send_keys('샤로수길 음식점' + Keys.RETURN)
links = browser.find_elements_by_class_name("moreview")
restaurants = []
ActionChains(browser).click(links[0]).perform() # don't know why but it doesn't work without this
for link in links:
  restaurant = {}
  ActionChains(browser).click(link).perform()