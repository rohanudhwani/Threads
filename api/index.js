const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const crypto = require('crypto');
const nodeMailer = require('nodemailer');


const app = express(); 
const port = 3000;
const cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const jwt = require('jsonwebtoken');

mongoose.connect("mongodb+srv://rohanudhwani:rohan@cluster0.w4ufti3.mongodb.net/",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("connected");
}).catch((err) => {
    console.log(err);
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});



const User = require('./models/user');
const Post = require('./models/post');