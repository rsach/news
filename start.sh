#!/bin/bash

# sudo apt-get update -y
# sudo apt-get install nodejs -y
# sudo apt-get install npm -y
# node dist/news/server/main.js

service nginx restart
npm i -g pm2
pm2 start /dist/news/server/main.js
pm2 logs
