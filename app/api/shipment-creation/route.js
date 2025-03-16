import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    // Parse request body
    const shipmentDetails = await req.json();

    // Validate required fields
    if (
      !shipmentDetails.trackingNumber ||
      !shipmentDetails.shipper?.email ||
      !shipmentDetails.receiver?.email ||
      !shipmentDetails.status_id.status
    ) {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing required fields' }),
        { status: 400 }
      );
    }

    // Setup email transporter for Titan Mail
    const transporter = nodemailer.createTransport({
      host: 'smtp.titan.email', // Titan SMTP server
      port: 465, // Or 587 for TLS
      secure: true, // Use true for SSL (port 465)
      auth: {
        user: process.env.TITAN_SMTP_USER, // Your Titan email address
        pass: process.env.TITAN_SMTP_PASS, // Your Titan Mail App Password
      },
    });

    await transporter.verify();

    // Compose email
    const mailOptions = {
      from: process.env.TITAN_SMTP_USER, // Sender email from your Titan account
      to: [shipmentDetails.shipper.email, shipmentDetails.receiver.email],
      subject: `Shipment Created - Tracking Number: ${shipmentDetails.trackingNumber}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Shipment Created</title>
            <style>
              body {
                font-family: 'Arial', sans-serif;
                color: #333;
                background-color: #f4f7fa;
                padding: 40px;
                margin: 0;
              }
              .email-container {
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
                padding: 30px;
                max-width: 650px;
                margin: 0 auto;
              }
              h1 {
                color: #fcb819;
                font-size: 28px;
                font-weight: 600;
                text-align: center;
                margin-bottom: 20px;
              }
              .status-update {
                background-color: #e6f7ff;
                border-left: 6px solid #fcb819;
                padding: 15px;
                margin: 30px 0;
                font-size: 18px;
                font-weight: 500;
                border-radius: 5px;
              }
              .info {
                display: flex;
                justify-content: space-between;
                margin-top: 20px;
              }
              .info div {
                width: 45%;
              }
              .footer {
                text-align: center;
                margin-top: 40px;
                font-size: 16px;
                color: #666;
                padding-top: 10px;
                border-top: 1px solid #ddd;
              }
              .logo {
                display: block;
                margin: 0 auto 30px;
                width: 140px;
              }
              .highlight {
                font-weight: bold;
                color: #fcb819;
              }
              .cta {
                display: block;
                text-align: center;
                margin-top: 30px;
                padding: 12px 24px;
                background-color: #fcb819;
                color: #ffffff;
                text-decoration: none;
                border-radius: 4px;
                font-size: 16px;
                font-weight: 600;
                transition: background-color 0.3s ease;
              }
              .cta:hover {
                background-color: #005f99;
              }
            </style>
          </head>
          <body>
            <div class="email-container">
              <img src="https://qmkoxktojvjqokgxzqxw.supabase.co/storage/v1/object/public/amarex//logo-amarex.png" alt="Amarex Express Logo" class="logo">
              <h1>Shipment Created</h1>
              <p>Dear <span class="highlight">Customer</span>,</p>
    
              <p>We are pleased to inform you that your shipment with tracking number <span class="highlight">${shipmentDetails.trackingNumber}</span> has been successfully created.</p>
    
              <div class="status-update">
                <p><strong>Initial Status:</strong> ${shipmentDetails.status_id.status}</p>
              </div>
    
              <div class="info">
                <div>
                  <strong>Shipper:</strong><br>
                  ${shipmentDetails.shipper.email}
                </div>
                <div>
                  <strong>Receiver:</strong><br>
                  ${shipmentDetails.receiver.email}
                </div>
              </div>
    
              <p>Thank you for choosing <span class="highlight">Amarex Express</span>. We look forward to serving you.</p>
    
              <a href="https://amarexx.com" class="cta">Track Your Shipment</a>
    
              <div class="footer">
                <p>Best regards,<br>Amarex Express Team</p>
                <p><small>If you have any questions, feel free to contact us at contact@amarexexpress.com.</small></p>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Failed to send email',
      }),
      { status: 500 }
    );
  }
}
