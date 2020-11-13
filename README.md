[![Build Status](https://travis-ci.org/swsnu/swpp2020-team5.svg?branch=master)](https://travis-ci.org/swsnu/swpp2020-team5)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=swsnu_swpp2020-team5&metric=alert_status)](https://sonarcloud.io/dashboard?id=swsnu_swpp2020-team5)
[![Coverage Status](https://coveralls.io/repos/github/swsnu/swpp2020-team5/badge.svg?branch=master)](https://coveralls.io/github/swsnu/swpp2020-team5?branch=master)
# swpp2020-team5

## How to run

So far, the project isn't deployed on an actual server-it could be only run by the local server using yarn.

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
