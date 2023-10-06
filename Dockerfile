

FROM mysql:latest

COPY /src/database.js /etc/mysql/conf.d/


 ENV MYSQL_ROOT_PASSWORD=0000

EXPOSE 3306

CMD ["mysqld"]
