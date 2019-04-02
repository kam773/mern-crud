const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');



// Routes
const students = require('./routes/api/students')

// Init app
const app = express();


// BodyParser middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

// cors
app.use(cors())

// DB config
const db = require('./config/keys').mongoURI;

// Connect to mongoDB
mongoose.connect(db, { useNewUrlParser: true, useFindAndModify: false })
    .then(() => console.log('MongoDB connected...'))
    .catch((err) => console.log(err))


// Use Routes
app.use('/api/students', students);

const port = process.env.PORT || 5000;

app.listen(port, function () {
    console.log("Server is running on Port: " + port);
});