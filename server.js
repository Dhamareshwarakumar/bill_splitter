const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const passport = require('passport');


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());


// Configuration
dotenv.config();
require('./config/db');
require('./config/passport_jwt')(passport);


// Constants
const PORT = process.env.PORT || 3333;


// Routes
app.get('/api', (req, res) => {
    res.json({ msg: "Hello Express API" });
});
app.use('/api/users', require('./routes/users'));


app.use(express.static(path.resolve('frontend', 'build')));
if (process.env.NODE_ENV === 'production') {
    app.get('*', (req, res) => {
        res.sendFile(path.resolve('frontend', 'build', 'index.html'));
    });
}



// Server
app.listen(PORT, () => console.log(`Server running @${PORT}`));