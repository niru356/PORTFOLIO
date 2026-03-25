const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const twilio = require('twilio');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Email Configuration (using environment variables)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'example@gmail.com',
        pass: process.env.EMAIL_PASS || 'password'
    }
});

// Twilio SMS Configuration
const twilioClient = process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN 
    ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN) 
    : null;


// API Endpoint for Contact Form
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const mailOptions = {
        from: email,
        to: 'rathnirakar655@gmail.com',
        replyTo: email,
        subject: `[Portfolio] New Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        html: `<p>You have a new contact form submission from your portfolio:</p>
               <p><strong>Name:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Message:</strong></p>
               <p>${message.replace(/\n/g, '<br>')}</p>`
    };

    try {
        // Send Email if configured
        if(process.env.EMAIL_USER && process.env.EMAIL_PASS) {
             await transporter.sendMail(mailOptions);
        } else {
             console.log("Mock sending email (Credentials not configured):", mailOptions);
        }

        // Send SMS if configured to phone 6372743454
        if(twilioClient && process.env.TWILIO_PHONE_NUMBER) {
             const smsMessage = `New Portfolio Message!\nFrom: ${name}\nEmail: ${email}\n\n${message}`;
             await twilioClient.messages.create({
                 body: smsMessage,
                 from: process.env.TWILIO_PHONE_NUMBER,
                 to: '+916372743454' // Targeted Phone number configured
             });
        } else {
             console.log("Mock sending SMS to +916372743454 (Twilio Credentials not configured).");
        }

        res.status(200).json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Failed to send message. Please try later.' });
    }
});



app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
