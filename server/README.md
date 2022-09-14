# React-Nodejs-JWT Server 

* a basic nodejs backend that will authenticate & return a signed jwt cookie to the client if they are a valid user 

*** Steps to create this project *** 
1) create a project directory 
2) run `npm init` to create a package.json 
3) install the following dependencies using npm install
    - nodemon (for easy reloading when running locally)
    - express 
    - cors 
    - jsonwebtoken
    - cookie-parser
4) add the following commands to your script field in package.json for easy reloading 
    ` "start": "nodemon server.js" `
4) create `server.js` file 
5) run `npm start` to serve the API at `localhost:5000` 