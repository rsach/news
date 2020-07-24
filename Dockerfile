FROM nginx:latest

LABEL author="Rahul Sachdeva"

ADD ab.sh ab.sh
ADD start.sh start.sh



RUN chmod 755 ab.sh
RUN chmod 755 start.sh

COPY ./dist dist

RUN apt-get update && apt-get install -y --no-install-recommends dialog apt-utils nodejs npm



ADD nginx.conf nginx.conf
ADD default.conf.template default.conf.template

EXPOSE 80 443


ENTRYPOINT [ "./ab.sh", "./start.sh"]
CMD [ "nginx", "-g", "daemon off;"]
