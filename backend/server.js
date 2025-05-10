// backend/server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;
const MESSAGES_FILE = path.join(__dirname, 'messages.json');

// Middleware
app.use(cors());
app.use(express.json());

// Load existing messages or create file
if (!fs.existsSync(MESSAGES_FILE)) {
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify([]));
}

// Endpoint to receive messages and send email
app.post('/contact', [
  body('name').trim().escape().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('message').trim().escape().notEmpty().withMessage('Message cannot be empty'),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Validation failed', errors: errors.array() });
  }

  const { name, email, message } = req.body;

  // Save the message to messages.json
  fs.readFile(MESSAGES_FILE, (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Server error while reading the file.' });
    }

    let messages = [];
    if (data.length > 0) {
      messages = JSON.parse(data);
    }

    messages.push({ name, email, message, timestamp: new Date() });

    fs.writeFile(MESSAGES_FILE, JSON.stringify(messages, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error saving message.' });
      }

      // Send email notification
      sendEmailNotification(name, email, message);

      res.status(200).json({ message: 'Message received!' });
    });
  });
});

// Function to send the email
const sendEmailNotification = (name, email, message) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Or another email provider
    auth: {
      user: 'obwogialex728@gmail.com',  // Replace with your email
      pass: '@Alexn2004'    // Replace with your email password or an app-specific password
    }
  });

  const mailOptions = {
    from: 'obwogialex728@gmail.com',
    to: 'obwogialex728@gmail.com',  // Your email where you want notifications
    subject: 'New Contact Form Submission',
    text: `You have received a new message from ${name} (${email}):\n\n${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email: ', error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

// Test route
app.get('/', (req, res) => {
  res.send('Backend is running...');
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
