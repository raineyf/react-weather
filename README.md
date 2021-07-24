# node-react-heroku

This is a repo meant to provide boilerplate for a Node.js (backend) and React (frontend) project built for the Heroku cloud.

## Setup

-   Fork this repo, download locally and run `npm run setup` to install the necessary packages.
-   Change the directory name and `name` value in `package.json`.
-   Run `npm run dev` to start your local server and find your React app running at port 3000. The server is running at port 3001. You should see the message "You are connected to the server" in your React app.
-   When you are ready to build your app for Heroku, use the Heroku CLI (`sudo npm i -g heroku`) and login with `heroku login`.
-   Initialize a new Git repo: `git init`, `heroku git:remote -a insert-your-app-name-here`, `git add .`, `git commit -am "Deploy app to Heroku"`.
-   Finally, push to the Git Heroku remote: `git push heroku master`.

## Pushing New Changes

```
git add .
git commit -m "my commit message"
git push heroku master
```

## About

**Node Version:** `>= 14.17.1`
**npm Version:** `>= 6.14.13`

**Dev Dependencies** (not including `create-react-app` dependencies):

-   `concurrently` - used to run server and client at the same time
-   `node-sass` - used to support SASS in client

## Resources

-   [How to Create a React App with a Node Backend: The Complete Guide](https://www.freecodecamp.org/news/how-to-create-a-react-app-with-a-node-backend-the-complete-guide/)
