# Makan Bah! Original Introduction (credit to @dasikha)

Makan bah! is a restaurant recommendations website, which allows it's users to search for restaurants nearby them and also create a personalised bucket-list of their restaurant choices. The name "Makan bah!" was derived from the word "Makan", which means "Eat" in the English language, and "bah" from Sabahan slang which is a colloquial words used in Sabah, Malaysia. With Makan Bah!, you don't have to worry again where to eat next!

## Project Description

Makan bah! original project was developed by Khalilah. This project is an extension to the original project from <https://github.com/dasikha/MakanBah>.

## MVP

### Feature Extension

**User Login** - The feature extension consist of:

- Four new components: HomePage, LandingPage, LoginPage, RegistrationPage
- Simple Navigation - using React Router, to show the differences for site user - logged in and not logged in.
- User Registration - using bcrypt, to encrypt the password when stored in the database so it will be harder for an attacker to crack.
- User Login - using JWT, as authentication token when user is logged in. sessionStorage - the session even when you refresh the page. If you want the page token/information is available on different tab of browser, localStorage can be use.

#### Feature References/Credits

- Web Dev Simplified: [Youtube - JWT Authentication Tutorial - Node.js](https://www.youtube.com/watch?v=mbsmsi7l3r4)
- Web Dev Simplified: [Youtube - Build Node.js User Authentication - Password Login](https://www.youtube.com/watch?v=Ud5xKCYQTjM)
- [Implement Authentication in React App using Node.js](https://www.cluemediator.com/implement-login-authentication-in-react-app-using-node-js)
- [How To Add Login Authentication to React Applications](https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications#conclusion)
- BCRYPT
- React-Router
- JWT

## Database Table Changes

- Additional fields are introduced in the User table i.e. password, isAdmin fields (however admin is not used at the moment)

![Additional field](usertbl.png)

## Setup

### Dependencies

- Run `npm install` in project directory. This will install server-related dependencies such as `express`.
- `cd client` and run `npm install` and `yarn install`. This will install client dependencies (React).

### Database Prep

- Access the MySQL interface in your terminal by running `mysql -u root -p`
- Create a new database called makanbahDB: `create database makanbahDB`
- Add a `.env` file to the main folder of this repository containing the MySQL authentication information for MySQL user. For example:

```bash
  DB_HOST=localhost
  DB_USER=root
  DB_NAME=makanbahDB
  DB_PASS=YOURPASSWORD
  JWT_SECRET=YOURSECRETKEY
```

- Run `npm run migrate` in the main folder of this repository, in a new terminal window. This will create three tables called 'restaurants', 'bucket_list', and 'user' in your makanbahDB database.

### Development

- Run `npm start` in project directory to start the Express server on port 5000 
- Go to `(localhost:5000/users)` to view the restaurants' list
- `cd client` and run `npm start` to start client server in development mode with hot reloading in port 3000 `(localhost:3000)`

## Basic Requirements

### Create your API Key

- [ ] Get your API Key from [here](https://developers.google.com/places/web-service/get-api-key)
Follow all the steps in the link:

1. Creating API keys
2. Adding the API key to your request
3. Restricting API keys

### Display a list of restaurants in your front-end

- [ ] Get the restaurants in Kota Kinabalu database from Google Place API. You can access the API from <https://maps.googleapis.com/maps/api/place/nearbysearch/jsonlocation=5.9804,116.0735&radius=1500&type=restaurant&key=YOUR_API_KEY>
Remember to key in `YOUR_API_KEY` to the end of the link provided.
- [ ] Save the data into a JSON file (to avoid "No Access Allow Origin" error)
- [ ] Store the JSON file inside your public folder

## Notes

_This is a student project that was created at [CodeOp](http://CodeOp.tech), a full stack development bootcamp in Kuala Lumpur._
