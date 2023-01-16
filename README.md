users table SQL

```sql
CREATE TABLE `admin_template`.`users` ( `id` VARCHAR(36) NOT NULL , `username` VARCHAR(255) NOT NULL , `password` VARCHAR(255) NOT NULL , `roles` TINYINT(1) NOT NULL DEFAULT '2' , `refresh_token` VARCHAR(255) NULL DEFAULT NULL , PRIMARY KEY (`id`), UNIQUE (`username`)) ENGINE = InnoDB;
```
