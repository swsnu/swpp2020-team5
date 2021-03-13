[![Build Status](https://travis-ci.org/swsnu/swpp2020-team5.svg?branch=master)](https://travis-ci.org/swsnu/swpp2020-team5)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=swsnu_swpp2020-team5&metric=alert_status)](https://sonarcloud.io/dashboard?id=swsnu_swpp2020-team5)
[![Coverage Status](https://coveralls.io/repos/github/swsnu/swpp2020-team5/badge.svg?branch=master)](https://coveralls.io/github/swsnu/swpp2020-team5?branch=master)
# swpp2020-team5
 
## How to run

AllTastesMatter is deployed on https://altama.shop.

### Running the frontend on local ennvironments

The project runs on Linux environments, and uses yarn for local builds-yarn must be installed on your local machine.
To install yarn, run:
on the shell. Test whether yarn is installed by running:
```
yarn --version
```
If yarn is ready, move to src/frontend in the shell, and run:
```
yarn
```
to install all the modules the project requires.
If module installation is complete, run:
```
yarn start
```
to start up the frontend server on your local machine.
When the server is ready, it would automatically load the initial frontend state(the sign-in page).

### Running the backend on local ennvironments

Sign up is needed if you want to check the real services. However, you will run into 'CheckUser Error' when trying to sign up with only frontend running. 

Now you need to run the backend. To run backend, follow these steps.

1. Activate your django environment
2. Open the swpp2020-team5/backend/AllTastesMatter/setting.py with editor
3. Change the ALLOWED_HOSTS = [] to ALLOWED_HOSTS = ['local host'] and save.
4. move to swpp2020-team5/backend/ and run:
```
python manage.py runserver
```
5. If it requires to install some package, install the package and try it again.  
For example, if you are required to install django_extensions, run:
```
pip install django_extension
```

### After the Frontend and Backend run

Now you can sign up from the site and test the services. Enjoy!
