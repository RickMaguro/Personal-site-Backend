const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Endpoint to handle email sending
app.post('/send-email', async (req, res) => {
    const { name, email, message } = req.body;

    // Configure the email transport using SMTP
    let transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE, // Email service
        auth: {
            user: process.env.EMAIL_USER, // Email
            pass: process.env.EMAIL_PASS  // Email password
        }
    });

    let mailOptions = {
        from: email,
        to: process.env.EMAIL_TO, // The email address to send to
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