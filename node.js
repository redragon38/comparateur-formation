require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const validator = require('validator');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

// Limiter basique
const limiter = rateLimit({ windowMs: 60*1000, max: 10 });
app.use(limiter);

// Servir front-end
app.use(express.static(path.join(__dirname, 'public')));

// API contact
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, type, message, company } = req.body || {};

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'Champs requis manquants.' });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Email invalide.' });
    }

    const safe = {
      name: validator.escape(name),
      email: validator.normalizeEmail(email),
      subject: validator.escape(subject),
      type: validator.escape(type || ''),
      message: validator.escape(message),
      company: validator.escape(company || '')
    };

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      },
      tls: { rejectUnauthorized: false }
    });

    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: process.env.TO_EMAIL,
      subject: `[Contact site] ${safe.subject} — ${safe.type || 'Type inconnu'}`,
      text: `Nom: ${safe.name}\nEmail: ${safe.email}\nSociété: ${safe.company}\nType: ${safe.type}\nSujet: ${safe.subject}\n\nMessage:\n${safe.message}`,
      html: `<p><strong>Nom:</strong> ${safe.name}</p>
<p><strong>Email:</strong> ${safe.email}</p>
<p><strong>Société:</strong> ${safe.company}</p>
<p><strong>Type:</strong> ${safe.type}</p>
<p><strong>Sujet:</strong> ${safe.subject}</p>
<hr/>
<p>${safe.message}</p>`
    };

    await transporter.sendMail(mailOptions);
    return res.json({ message: 'Message envoyé, nous reviendrons vers vous sous 24–48h ouvrées.' });

  } catch (err) {
    console.error('Erreur envoi mail:', err);
    return res.status(500).json({ message: 'Erreur serveur lors de l\'envoi.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
