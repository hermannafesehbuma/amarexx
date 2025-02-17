export async function POST(req) {
  try {
    console.log('📩 Received request to send shipment notification email.');

    // Parse request body
    const shipmentDetails = await req.json();
    console.log('✅ Parsed request body:', shipmentDetails);

    // Validate required fields
    if (
      !shipmentDetails.trackingNumber ||
      !shipmentDetails.shipper?.email ||
      !shipmentDetails.receiver?.email ||
      !shipmentDetails.status_id.status
    ) {
      console.error('❌ Missing required fields:', shipmentDetails);
      return new Response(
        JSON.stringify({ success: false, error: 'Missing required fields' }),
        { status: 400 }
      );
    }

    console.log('🚚 Tracking Number:', shipmentDetails.trackingNumber);
    console.log('📤 Shipper Email:', shipmentDetails.shipper.email);
    console.log('📥 Receiver Email:', shipmentDetails.receiver.email);
    console.log('📦 Shipment Status:', shipmentDetails.status_id.status);

    // Define the email payload
    const emailData = {
      personalizations: [
        {
          to: [
            { email: shipmentDetails.shipper.email },
            { email: shipmentDetails.receiver.email },
          ],
          subject: `Shipment Created - Tracking Number: ${shipmentDetails.trackingNumber}`,
        },
      ],
      from: { email: process.env.EMAIL_USER },
      content: [
        {
          type: 'text/html',
          value: `
            <!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Shipment Creation Confirmation</title>
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
      
                  <p>We are excited to inform you that your shipment with tracking number <span class="highlight">${shipmentDetails.trackingNumber}</span> has been successfully created!</p>
      
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
      
                  <p>Thank you for choosing <span class="highlight">Amarex Express</span>. We are committed to providing you with the best shipping experience and timely delivery.</p>
      
                  <a href="https://your-dashboard-link.com" class="cta">Track Your Shipment</a>
      
                  <div class="footer">
                    <p>Best regards,<br>Amarex Express Team</p>
                    <p><small>If you have any questions, feel free to contact us at contact@amarexexpress.com.</small></p>
                  </div>
                </div>
              </body>
            </html>
          `,
        },
      ],
    };

    // Send email through Titan API
    const response = await fetch('https://api.titan.email/v1/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.TITAN_API_KEY}`,
      },
      body: JSON.stringify(emailData),
    });

    if (!response.ok) {
      throw new Error(`Failed to send email: ${response.statusText}`);
    }

    console.log('✅ Email sent successfully');
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('❌ Error sending notification email:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Failed to send email',
      }),
      { status: 500 }
    );
  }
}
