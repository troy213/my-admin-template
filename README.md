### Installation

client
`cd client`
`npm install`

server
`cd server`
`npm install`

### .env set up

create **.env** file inside **/server**

```env
PORT = <your_desired_port_number>

HOST=<your_db_hostname>
USER=<your_db_username>
PASSWORD=<your_db_password>
DATABASE=<your_db_name>

ACCESS_TOKEN_SECRET = <your_access_token>
REFRESH_TOKEN_SECRET = <your_refresh_token>
```

### Create users table SQL

```sql
CREATE TABLE `admin_template`.`users` ( `id` VARCHAR(36) NOT NULL , `username` VARCHAR(255) NOT NULL , `password` VARCHAR(255) NOT NULL , `roles` TINYINT(1) NOT NULL DEFAULT '2' , `refresh_token` VARCHAR(255) NULL DEFAULT NULL , PRIMARY KEY (`id`), UNIQUE (`username`)) ENGINE = InnoDB;
```

### Development

client
`cd client`
`npm run dev`

server
`cd server`
`npm run dev`

### Test

client
`cd client`
`npm run test`
or
`npm run coverage`
