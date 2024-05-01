const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const router = express.Router();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/mailapp', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
    name: String,
    surname: String,
    username: String,
    password: String,
});

const User = mongoose.model('User', userSchema);

app.post('/register', async (req, res) => {
    const { name, surname, username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, surname, username, password: hashedPassword });

    await user.save();

    res.status(201).send();
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (user && await bcrypt.compare(password, user.password)) {
        res.status(200).send();
    } else {
        res.status(401).send();
    }
});

app.listen(3001, () => console.log('Server running on http://localhost:3001'));

app.get('/users', async (req, res) => {
        const users = await User.find({});
        res.send(users);
});

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-password'
    }
});

let mailOptions = {
    from: 'your-email@gmail.com',
    to: 'receiver-email@gmail.com',
    subject: 'Test mail',
    text: 'Hello, this is a test email!'
};

transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
}); // Added closing parenthesis and curly brace here

router.post('/send-email', async (req, res) => {
        const { to, subject, text } = req.body;

        let transporter = nodemailer.createTransport({
                host: 'smtp.example.com', // replace with your SMTP server
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                        user: 'test@example.com', // replace with your email
                        pass: 'password' // replace with your password
                }
        });

        let info = await transporter.sendMail({
                from: '"Mailer" <test@example.com>', // sender address
                to: to, // list of receivers
                subject: subject, // Subject line
                text: text, // plain text body
        });

        res.send('Email sent: ' + info.response);
});

module.exports = router;