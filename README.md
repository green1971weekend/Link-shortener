# Link Shortener

![CI](https://github.com/green1971weekend/Link-shortener/workflows/CI/badge.svg?branch=main)

Full-stack application based on MongoDB, Express, ReactJS, NodeJS technologies. 

The main idea is to convert giving links by the user and provide a short version followed by the original link.

* Comprehensive description on source code included.

# Getting Started

* Install `Node.js`;
* To set up the environment, run the command: `npm install`;
* To run the application in development mode, run the command `npm run dev`;
* To create an artifact for client deployment, run the command `npm run client:build`

# Application settings

For the correct application running, it is necessary to create the `config` directory in the root of project.
After that create the `default.json` file in this folder.

```
{
    "port": Config desired port,
    "jwtSecret": "String for jwt encryption",
    "mongoUri": "Config mongodb database",
    "baseUrl": "Base web-application url"
}
```
For creation your own mongodb cluster follow this [link](https://www.mongodb.com/2)

# Build with

* [NPM](https://www.npmjs.com/)
* [React](https://ru.reactjs.org/docs/getting-started.html)
* [React Router](https://reactrouter.com/web/guides/quick-start)
* [Webpack](https://webpack.js.org/)
* [Express](https://expressjs.com/ru/)
* [Mongoose](https://mongoosejs.com/)

## Server dependencies

* npm install express mongoose
* npm install -D nodemon concurrently (concurrently serves for launch simultaneously server and client parts)
* npm i config
* npm i bcryptjs
* npm i express-validator
* npm i jsonwebtoken
* npm i shortid
* npm install --save-dev cross-env

## Client dependencies

* npm i materialize-css@next
* npm i react-router-dom

# License
This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/green1971weekend/Link-shortener/blob/main/LICENSE) file for details.
