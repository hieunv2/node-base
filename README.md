### Install dependencies

    - yarn install

### Add environment variable

    - mv .env.example to .env

### Running Migrations

    - yarn migrate

### Run developer

    - yarn dev

npx sequelize db:drop && npx sequelize db:create && npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all
