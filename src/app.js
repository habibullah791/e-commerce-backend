const express = require('express');
const env = require('dotenv');
const bodyParser = require('body-parser');
const { body } = require('express-validator');
const app = express();
const mongoose = require('mongoose');

// Environmental variable
env.config()

// Routes
const adminRoutes = require('./routers/admin/auth.js')
const userRoutes = require('./routers/user/auth')


// connecting with the database
//mongodb+srv://<username>:<password>@cluster0.teplr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.teplr.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    ).then(()=>{
        console.log("Database connected");
    });



// parsing the data ofpostrequest
app.use(bodyParser());

// POST REQUESTS
// prefix everi api  with api
app.use('/api', userRoutes)
app.use('/api', adminRoutes)


// listening the app 
app.listen(process.env.PORT, ()=>{
    console.log(`listening at the port ${process.env.PORT}`);
})