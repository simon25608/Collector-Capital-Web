import { Resend } from 'resend';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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
}
