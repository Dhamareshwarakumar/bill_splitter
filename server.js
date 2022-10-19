const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const passport = require('passport');


// Middlewares
app.use(express.json());
// removed the line urlencoded as it is not necessary for this project
// app.use(express.urlencoded({ extended: true }));
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
app.use('/api/groups', require('./routes/groups'));
app.use('/api/expenses', require('./routes/expenses'));
app.use('/api/transactions', require('./routes/transactions'));


app.use(express.static(path.resolve('frontend', 'build')));
if (process.env.NODE_ENV === 'production') {
    app.get('*', (req, res) => {
        res.sendFile(path.resolve('frontend', 'build', 'index.html'));
    });
}



// Server
app.listen(PORT, () => console.log(`Server running @${PORT}`));
