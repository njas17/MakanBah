# restaurant-recommendations

Makan bah! is a restaurant recommendations website, which allows it's users to search for restaurants nearby them and also create a personalised bucket-list of their restaurant choices. The name "Makan bah!" was derived from the word "Makan", which means "Eat" in the English language, and "bah" from Sabahan slang which is a colloquial words used in Sabah, Malaysia. With Makan Bah!, you don't have to worry again where to eat next!


## Setup

### Dependencies 

- Run `npm install` in project directory. This will install server-related dependencies such as `express`.
- `cd client` and run `npm install`. This will install client dependencies (React).

### Database Prep

- Access the MySQL interface in your terminal by running `mysql -u root -p`
- Create a new database called makanbahDB: `create database makanbahDB`
- Add a `.env` file to the main folder of this repository containing the MySQL authentication information for MySQL user. For example:

```bash
  DB_HOST=localhost
  DB_USER=root
  DB_NAME=facebook
  DB_PASS=YOURPASSWORD
```

- Run `npm run migrate` in the main folder of this repository, in a new terminal window. This will create a table called 'makanbahDB' in your database.

### Development

- Run `npm start` in project directory to start the Express server on port 5000
- `cd client` and run `npm start` to start client server in development mode with hot reloading in port 3000.
