const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const userRoute=require('./routes/userRoute');
const session=require('express-session');
const postRoute = require('./routes/postRoute');
const subscriptionPlan=require('./models/subscriptionModel');

const cookieParser=require('cookie-parser');
const subsRoute = require('./routes/subscriptionRoute');
require('dotenv').config();

const app = express();
app.use(express.static('public'));
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(session({
    secret: 'your-secret-key',  // Use a strong secret in production
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // Set to true if using HTTPS
  }));



app.use('/api/auth',userRoute);
app.use('/api/post',postRoute);
app.use('/api/payment',subsRoute);


const PORT=process.env.PORT || 8080;


let data = mongoose.connect(process.env.MONGO_URI);
data.then(app.listen(PORT,async() => {
//   const plans = [
//     {name:'Free'},
//     { name: 'BasicMonthly', price: 100, duration: 'monthly', postLimit: 10 },
//     { name: 'BasicYearly', price: 1000, duration: 'yearly', postLimit: 10 },
//     { name: 'PremiumMonthly', price: 500, duration: 'monthly', postLimit: 1000 },
//     { name: 'PremiumYearly', price: 5000, duration: 'yearly', postLimit: 1000 },
// ];
// await subscriptionPlan.insertMany(plans)
    console.log("Srerver is running...at ",PORT);
}))

