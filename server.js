const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Configuration
dotenv.config();


// Constants
const PORT = process.env.PORT || 3333;


// Routes
app.get('/api', (req, res) => {
    res.json({ msg: "Hello Express API" });
});

app.use(express.static(path.resolve('frontend', 'build')));
if (process.env.NODE_ENV === 'production') {
    app.get('*', (req, res) => {
        res.sendFile(path.resolve('frontend', 'build', 'index.html'));
    });
}



// Server
app.listen(PORT, () => console.log(`Server running @${PORT}`));