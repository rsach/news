#!/bin/bash
# cd /app
#

#rm -rf /varar/www
#mkdir /var/www
#rm -rf /var/www/html
#
#mkdir /var/www/html
#cp -rf build1/* /usr/share/nginx/html/


cp /nginx.conf /etc/nginx/
set -eu

envsubst '${API_HOST}' < /default.conf.template > /etc/nginx/conf.d/default.conf

exec "$@"




# rm /etc/nginx/conf.d/default.conf
#
#
#rm -rf /etc/nginx/sites-enabled
#
#mkdir /etc/nginx/sites-enabled
#
#cp /default /etc/nginx/sites-enabled/
#
#
