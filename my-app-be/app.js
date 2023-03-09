if (process.env.NODE_ENV !== 'production') require('dotenv').config();

// console.log ('App.js is now running...');
// console.log ()














// db
const db = require('./app/models');
// connect to db

// bring all routers

const PORT = parseInt (process.env.PORT, 10) || 8000;

