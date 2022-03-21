# How to start Dronuts

## Backend

### DB (mongodb)

1. Make sure you computer has mongodb locally installed.
2. Run `mongod` in your terminal
3. Check which port it's running on ()

### Express

1. In `app/src/mongoosedb.ts`, change `PORT` to the port your mongod is running on.
2. In `App` directory, run `npm i`
3. In `App` directory, run `npm run compile`. This will compile with tsc.
4. Run `npm start` to start Express Server.

## Frontend

### React

1. In `dronuts-react` run `npm i`
2. Run `npm start`
