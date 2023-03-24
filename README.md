# Reto final bootcamp desarrollo backend
Create .env using .env.example and fill PostgreSQL details.
## Install dependencies
``` npm i ```
## Prep database
```
node ace migration:reset
node ace migration:run
node ace db:seed
```
## Run
``` npm run dev ```
