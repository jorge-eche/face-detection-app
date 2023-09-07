# Face-Recognition Application.

A Fullstack PERN app that recognizes faces on images uploaded by the user.

## Table of contents

  - [Overview](#overview)
  - [The project - Features](#the-project)
  - [Screenshot](#screenshot)
  - [Links](#links)
  - [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [If I had more time I would change this](#if-i-had-more-time-i-would-change-this)
  - [Continued development](#continued-development)
  - [Author](#author)

## Overview

### The project

Users should be able to:

- Input a URL and let the app recognize and frame the face from the image.
- Register their own user safely, with hashed passwords.
- Sign in and sign out from their profile.
- Be guided by Form Validation during Sign-in / Register. .
- See how many entries (image URLs) they have inputed so far.
- View the website optimal layout depending on their device's screen size.
- See hover states for interactive elements.
- View a spinner component while the app is making HTTP requests to Clarifai API.

### Screenshot

![Screenshot of the project1](./src/img/screenshot1.png)
![Screenshot of the project2](./src/img/screenshot2.png)

### Links

- Live Site URL: [Face Recognition App Live](https://smartbrain-edxx.onrender.com/)

## My process

### Built with

- [React](https://reactjs.org/) - JavaScript library
- [Create React App](https://create-react-app.dev/) - React environment
- [Clarifai face-detection API](https://clarifai.com/clarifai/main/models/face-detection) - gRPC face-recognition API
- [Tachyons](http://tachyons.io/) - CSS Framework
- [Node.js](https://nodejs.org/en) - Server-side language
- [Express.js](https://expressjs.com/) - Node.js framework
- [PostgreSQL](https://www.postgresql.org/) - Relational Database System
- [Knex.js](https://knexjs.org/) - SQL query builder
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - Frontend language
- [CSS3](https://www.w3.org/Style/CSS/) - For style
- [Semantic HTML5 markup](https://www.w3.org/html/) - For the web structure
- [particles-bg](https://www.npmjs.com/package/particles-bg) - Particle animation library
- [BcryptJS](https://www.npmjs.com/package/bcryptjs) - Password hashing library
- [React Spinners](https://www.npmjs.com/package/react-spinners) - Collection of loading spinners library.

### What I learned

- First of all, I learned how to deploy a full PERN application! Of course I had to find free options so I ended up using Render for the frontend and backend and Amazon Web Services for the database as, at the time of my writing this lines, Render only offered a free 90-day trial for databases and AWS a full whole year.
- Particularly challenging was implementing the Clarifai face-recognition API into the website. First I started connecting it from the frontend but after I have built the backend I passed it to server-side. Later on, I decided to changed the RESTfull way of connecting to the API to the new gRPC.
- Reading documentation: this is one of the most difficult and yet critical knowledge an aspiring developer should know. I struggled not only with Clarifai but also had to learn how to implement particles-bg, Knex, BcryptJS, among others. How satisfying it is when you make it work is only comparable to how frustrating it is when you do not know what is going wrong!
- Enter backend basic concepts! I learned how to manage requests and sending the corresponding responses, about server endpoints, middlewares, using Node on the terminal. 
- Node.js and Express.js basic syntaxis. It was very exciting to see JavaScript working and doings its magic on the server side! 
- This was my first encounter with databases, especifically PostgreSQL. On my way to make us of a database I created tables, done conditional selections, applied SQL functions and a long list of other useful actions we can do with PostgresSQL.
- Finally, let's not forget about my two new software buddies: Postman for the server and pgAdmin for the database.

### If I had more time I would change this

- In the future I may add error messages, for example when we enter wrong information while signing in or registering. EDIT: August 2023, form validations error messages + focus method on empty inputs were added!
- It would be also interesting to add a profile section where the user can edit/update his information or delete his profile altogether.
- There is always some new cool functionality to add or a better way to improve your website, but as a student one has to move on to explore new topics and start new projects because as they say: 'Perfection is the enemy of the Good'.

### Continued development

- Most probably I am going to start studying testing and then TypeScript.

## Author

- Twitter - [@CokoEche](https://twitter.com/CokoEche)
- LinkedIn - [@jorgeecheverria-dev] (https://www.linkedin.com/in/jorgeecheverria-dev/)
