import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

export async function POST(req) {
  try {
    // Extract form data from the request
    const {
      firstName,
      lastName,
      email,
      phone,
      packagename,
      trackingNumber,
      claimType,
      message,
      packageType,
    } = await req.json();

    // File handling (if any file was uploaded)
    const formData = req.formData();
    const file = formData.get('file');
    let filePath = '';

    if (file) {
      // Save the uploaded file locally
      filePath = path.join(process.cwd(), 'uploads', file.name);
      await fs.promises.writeFile(filePath, file.data);
    }

    // Configure SMTP Transporter (Gmail)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail email
        pass: process.env.EMAIL_PASS, // Your App Password
      },
    });

    // Email content configuration
    const mailOptions = {
      from: email,
      to: process.env.EMAIL_TO, // Your recipient email
      subject: `Claim Request from ${firstName} ${lastName}`,
      text: `
        First Name: ${firstName}
        Last Name: ${lastName}
        Email: ${email}
        Phone: ${phone}
        Package Name: ${packagename}
        Package Type: ${packageType}
        Tracking Number: ${trackingNumber}
        Claim Type: ${claimType}
        Message: ${message}
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
      { success: true, message: 'Claim request submitted successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);

    // Response on failure
    return Response.json(
      { success: false, error: 'Failed to submit claim request' },
      { status: 500 }
    );
  }
}
