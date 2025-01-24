const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const passport = require('passport');
const passportJWT = require("./config/passport-jwt-strategy")

const TransactionController = require('./controllers/TransactionController.js')
dotenv.config();

const db = require('./config/mongoose.js');

const app = express();
const PORT = process.env.PORT || 8000;

// Enable CORS
const corsOptions = {
  origin: [
    'https://school-payment-and-dashboard-application-three.vercel.app',
    'http://localhost:5173'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ["Authorization", "Content-Type"],
  credentials: true
};

app.use(cors(corsOptions));

app.post('/transactions/webhook/status-update', TransactionController.webhookController)

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());


app.use('/', require('./routes'))

// Start the Server
app.listen(PORT, (error) => {
  if (error) {
    console.error('Error starting server:', error);
  } else {
    console.log("Server running on PORT:", PORT);
  }
});