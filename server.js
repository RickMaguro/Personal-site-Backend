const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Endpoint to handle email sending
app.post('/send-email', async (req, res) => {
    const { name, email, message } = req.body;

    // Configure the email transport using SMTP
    let transporter = nodemailer.createTransport({
        service: 'gmail', // Email service
        auth: {
            user: 'rick800721@gmail.com', // Email
            pass: 'aoywzjkqbsfybfqv'   // Email password
        }
    });

    let mailOptions = {
        from: email,
        to: 'rick800721@gmail.com', // The email address to send to
        subject: `Message from ${name}`,
        text: message
    };

    try {
      await transporter.sendMail(mailOptions);
        res.status(200).send({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send({ message: 'Failed to send email' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});