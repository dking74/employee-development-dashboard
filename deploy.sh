#!/bin/sh
git subtree push --prefix frontend https://git.heroku.com/employee-development.git master || true
git subtree push --prefix backend https://git.heroku.com/employee-development-api.git  master || true