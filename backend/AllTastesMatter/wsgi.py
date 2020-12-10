"""
WSGI config for AllTastesMatter project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/howto/deployment/wsgi/
"""

import os
import sys
from django.core.wsgi import get_wsgi_application

#sys.path.append('/home/ubuntu/swpp2020-team5/backend/AllTastesMatter')
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(BASE_DIR)

os.environ['DJANGO_SETTINGS_MODULE'] = 'AllTastesMatter.settings'
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'AllTastesMatter.settings')

application = get_wsgi_application()
