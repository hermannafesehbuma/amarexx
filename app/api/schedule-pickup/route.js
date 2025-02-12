import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    // Extract form data from the request
    const {
      firstName,
      lastName,
      streetAddress,
      apt,
      state,
      zipCode,
      phoneNumber,
      email,
    } = await req.json();

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
      subject: `Schedule a Pickup Request from ${firstName} ${lastName}`, // Subject of the email
      text: `
        First Name: ${firstName}
        Last Name: ${lastName}
        Street Address: ${streetAddress}
        Apt/Suite/Order: ${apt}
        State/Province: ${state}
        Zip Code: ${zipCode}
        Phone Number: ${phoneNumber}
        Email: ${email}
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Response on success
    return Response.json(
      { success: true, message: 'Pickup request submitted successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);

    // Response on failure
    return Response.json(
      { success: false, error: 'Failed to submit pickup request' },
      { status: 500 }
    );
  }
}
