import express from 'express';
import { createServer as createViteServer } from 'vite';
import { Resend } from 'resend';
import path from 'path';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // ==========================================
  // VERCEL FUNCTION SIMULATION: /api/contact
  // ==========================================
  app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      const resendApiKey = process.env.RESEND_API_KEY;

      if (!resendApiKey) {
        return res.status(500).json({ error: 'RESEND_API_KEY is not configured on the server.' });
      }

      const resend = new Resend(resendApiKey);

      const { data, error } = await resend.emails.send({
        from: 'Collector Capital <onboarding@resend.dev>', // Resend test domain
        to: ['support@collectorcapital.global'], // Cambia esto a tu correo real
        subject: `New Contact: ${subject}`,
        html: `
          <h3>New message from Collector Capital Contact Form</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong><br/>${message}</p>
        `,
      });

      if (error) {
        return res.status(400).json({ error });
      }

      res.status(200).json({ success: true, data });
    } catch (err) {
      console.error('Error sending email:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
