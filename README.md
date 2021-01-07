<img src="./banner.png">

## :newspaper: Articles Store

A webapp where users can post articles on the go.

## :rocket: Live Version - Deployed on [Heroku](https://articles-daily.herokuapp.com/)

## :sparkles: Features

1. Authentication and Authorization using PassportJS and JSON Web Tokens.
2. Personal **My Articles** page to show your articles. You can also add and delete articles.
3. User Profile Page - Displays username, name and updatable intro.
4. A Home page where articles from all users are shown.
5. Articles can be searched on home page via tags.
6. **Additional** An Admin page accessible to only admins. Shows all registered users and their details.

## :footprints: Steps for Running the App Locally.

1. Clone the repo `git clone https://github.com/tarunnsingh/articles-store-mern.git`.
2. Install dependences in root and client directory. `npm install`.
3. Create a file in `config/localkeys.js` and `client/src/config/localkeys.js` and the following code.

```javascript
const MONGODB_URI = "mongodb://localhost:27017"; // If using mongo shell locally. (This creates a DB named test)
// OR -> "mongodb+srv://<username>:<password>@cluster0-ncegj.mongodb.net/<dbname>?retryWrites=true&w=majority"
const JWT_SECRET_KEY = "INSERT_A_RANDOM_STRING";

module.exports = {
  MONGODB_URI,
  JWT_SECRET_KEY,
};
```

4. Install nodemon as a dev-dependency. `npm i --save-dev nodemon`.
5. Start the App from the root directory by `npm run dev`.
6. Go to `http://localhost:3000`.

## :grey_question: How to Use.

1. Go to Register Tab to register as a new user. The role tab is prefilled with **user**. You can change it to **admin**, and can be an admin as well.
2. Once registered, you will be redirected to Login page. Login with your username and password.
3. Add new Articles under My-Articles tab.
4. If an Admin, go to Admin tab to see list of registered users and their details. **Note**: You cannot see other admins in the list. Functionality to remove a user is not implemented.

## :file_folder: Folder Structure.

The root is the server, with app.js as the entry point. The `client` folder contains the React frontend built using `create-react-app`.

## API Reference.

The server has following API endpoints.

- **/user**

  - **\[POST\] /register**: Registers the User and returns the User Object or error message.
  - **\[POST\] /login**: Logs in the User and returns the User Object (along with cookie with access_token) or error message.
  - **\[GET\] /logout**: Clears the cookie and User Object.
  - **\[POST\] /todo**: Adds the New article to Database.
  - **\[DELETE\] /todo/:id**: Deletes the Article from DB and filters out the Object ID from owners articles array.
  - **\[GET\] /todo**: Returns all articles of the User.
  - **\[GET\] /all**: Returns list of all users in DB with the role 'user'.
  - **\[GET\] /authenticated**: Returns the isAuthenticated boolean as well as the User Object.
  - **\[POST\] /updateIntro**: Updates User Intro.

- **/todo**
  - **\[GET\] /all**: Returns all articles from DB as an Object (in reverse sorted chronology)
  - **\[POST\] /search**: Returns set of Articles mathcing with the queried tags.

<img src="https://hackernoon.com/drafts/ar1wv331n.png" />

## Thanks! :star:
