import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    // Extract form data from the request
    const { firstName, lastName, email, phone, message } = await req.json();

    // Configure SMTP Transporter (Gmail)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail (sender's email)
        pass: process.env.EMAIL_PASS, // Your App Password
      },
    });

    // Email content configuration
    const mailOptions = {
      from: email, // Sender's email (from the form input)
      to: process.env.EMAIL_TO, // Recipient email (set in environment variables)
      subject: `New Contact Form Submission from ${firstName} ${lastName}`, // Subject of the email
      text: `
        Name: ${firstName} ${lastName}
        Email: ${email}
        Phone: ${phone}
        Message: ${message}
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Response on success
    return Response.json(
      { success: true, message: 'Email sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);

    // Response on failure
    return Response.json(
      { success: false, error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
