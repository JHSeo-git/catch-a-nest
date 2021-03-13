```
docker exec -it catch_a_nest_db bash
mysql -u root -p
create database catch_a_nest;
grant all privileges on catch_a_nest.* TO 'seo'@'%' identified by 'root';
flush privileges;
```
