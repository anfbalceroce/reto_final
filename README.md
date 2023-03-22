# Reto final bootcamp desarrollo backend
Create .env using .env.example and fill PostgreSQL details and generate base64 string for JWT_SECRET_KEY.
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
