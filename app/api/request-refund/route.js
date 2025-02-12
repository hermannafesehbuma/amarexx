import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

export async function POST(req) {
  try {
    // Extract form data from the request
    const { firstName, lastName, email, phone, packagename, trackingNumber } =
      await req.json();

    // File handling (if any file was uploaded)
    const formData = req.formData();
    const file = formData.get('file');
    let filePath = '';

    if (file) {
      // Save the uploaded file locally
      filePath = path.join(process.cwd(), 'uploads', file.name);
      await fs.promises.writeFile(filePath, file.data);
    }

    // Configure SMTP Transporter (Titan Mail)
    const transporter = nodemailer.createTransport({
      host: process.env.TITAN_SMTP_HOST, // Titan SMTP server
      port: process.env.TITAN_SMTP_PORT, // 465 (SSL) or 587 (TLS)
      secure: true, // Use false for port 587 (STARTTLS)
      auth: {
        user: process.env.TITAN_SMTP_USER, // Your Titan email
        pass: process.env.TITAN_SMTP_PASS, // Your Titan Mail App Password
      },
    });

    // Email content configuration
    const mailOptions = {
      from: email, // Sender's email (from the form input)
      to: process.env.EMAIL_TO, // Recipient email (set in environment variables)
      subject: `Refund Request from ${firstName} ${lastName}`,
      text: `
        First Name: ${firstName}
        Last Name: ${lastName}
        Email: ${email}
        Phone: ${phone}
        Package Name: ${packagename}
        Tracking Number: ${trackingNumber}
        File: ${file ? 'File attached' : 'No file uploaded'}
      `,
      attachments: file
        ? [
            {
              filename: file.name,
              path: filePath,
            },
          ]
        : [],
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Response on success
    return Response.json(
      { success: true, message: 'Refund request submitted successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);

    // Response on failure
    return Response.json(
      { success: false, error: 'Failed to submit refund request' },
      { status: 500 }
    );
  }
}
