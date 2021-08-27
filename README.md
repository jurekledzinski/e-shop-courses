# ![WebApp](https://github.com/jurekledzinski/e-shop-courses/blob/media/images/Course%20shop.jpg?raw=true)

# Course shop

Course shop with login, register users, admin panel.

### Features

- Slider
- Login, register users and admin.
- Admin panel.
- Add, remove, edit courses.
- Add, remove, edit images in slider.
- Slider can display 3 latest courses, 3 highest top rated courses, custom courses.
- Change colors in slider text.
- Update admin profile.
- Management orders.
- User courses.
- Shopping cart.
- Protected links, api.
- Checking the inventory.
- Page not found.

### Technologies

Build with:

- [ReactJS](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [React router](https://reactrouter.com/) - Collection of navigational components.
- [React table](https://react-table.tanstack.com/) - Lightweight and extensible
  data tables for React.
- [NodeJS](https://nodejs.org/en/) - JavaScript runtime built on Chrome's V8 JavaScript engine.
- [ExpressJS](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js.
- [Mongoose](https://mongoosejs.com/) - Elegant MongoDB object modeling for Node.js.
- [Firebase](https://firebase.google.com/) - Platform developed by Google for creating mobile and web applications.
- [PassportJS](http://www.passportjs.org/) - Simple, unobtrusive authentication for Node.js.
- [Scss](https://sass-lang.com/) - CSS extension language.
- [Webpack](https://webpack.js.org/) - bundle assets, style, scripts, images ...
- [Date-fns](https://date-fns.org/) - Library, toolset for manipulating JavaScript dates.
- [Paypal](https://developer.paypal.com/docs/api/overview/) - Payment infrastructure for the internet.
- [Gsap](https://greensock.com/gsap/) - Professional-grade JavaScript animation for the modern web.
- [Axios](https://github.com/axios/axios) - Promise based HTTP client for the browser and node.js.

### Installation

Application requires [Express](https://expressjs.com/) v4+ and [Webpack](https://webpack.js.org/) v5 to run.

Backend installation

```sh
clone respository or download files
create .env file in root folder
add in .env file:
ATLAS_URL= xxxx mongo atlas url xxxx
NODE_ENV=development
SESS_NAME= xxxx session name xxxx
SESS_SECRET= xxxx session secret xxxx
CLIENT_PAYPAL= xxxx client paypal xxxx
SECRET_PAYPAL= xxxx secret paypal xxxx
PAYPAL_API=https://api-m.sandbox.paypal.com
ROLE_ADMIN=Admin
npm install in root folder
```

Client installation

```sh
cd ./client
npm install in client folder
```

- In app.js file in root folder, in cors origin change to http://localhost:3000
- In package.json file in client folder, remove proxy.
- In client/src/helpers/request.js in axios.create --- add line: baseURL: "http://localhost:5000"

### Run application

Run backend server

```sh
npm run start_local - run locally
```

Run client server

```sh
cd ./client
npm start - run locally
```

#### See live

[Course shop](https://whispering-wave-19363.herokuapp.com/)

## License

MIT
