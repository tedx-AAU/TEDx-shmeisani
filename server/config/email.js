const nodemailer = require('nodemailer');


const createTransporter = () => {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,         
    secure: true,   
    auth: {
      user: 'tedxalshmaisani.jo@gmail.com',
      pass: 'vvto qykm sxsx yhme',
    },
    connectionTimeout: 10000, 
    greetingTimeout: 10000,  
  });
};


const emailTemplates = {
 
  ticketDelivery: (bookingData) => ({
    subject: `🎉 Your Tickets for TEDx Shmeisani are HERE! - [Booking #${bookingData.bookingId.substring(0, 8)}]`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your Tickets - TEDx Shmeisani</title>
        <style>
          body { font-family: 'Arial', sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border-top: 6px solid #EB0028; }
          .header { background: #000000; padding: 30px; text-align: center; }
          .logo { color: #EB0028; font-size: 2rem; font-weight: bold; font-family: 'Helvetica Neue', Arial, sans-serif; }
          .content { padding: 40px 30px; color: #333333; line-height: 1.6; }
          .headline { font-size: 1.5rem; font-weight: bold; color: #000000; margin-bottom: 20px; }
          .details-box { background: #f8f9fa; border: 1px solid #eeeeee; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .details-row { margin-bottom: 10px; font-size: 1rem; }
          .label { font-weight: bold; color: #666666; }
          .value { color: #000000; }
          .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 0.85rem; color: #666666; border-top: 1px solid #eeeeee; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">TEDx<span style="color:#ffffff;">Shmeisani</span></div>
          </div>
          <div class="content">
            <div class="headline">Hi ${bookingData.buyerName},</div>
            <p>Thank you for booking your tickets for <strong>TEDx Shmeisani</strong>! Your transaction is complete, and your tickets have been generated successfully.</p>
            
            <div class="details-box">
              <div class="details-row"><span class="label">Ticket Type:</span> <span class="value">${bookingData.ticketType === 'full' ? 'Full Pathway (Pre-TEDx + Main)' : 'Main Event'}</span></div>
              <div class="details-row"><span class="label">Number of Tickets:</span> <span class="value">${bookingData.numberOfTickets}</span></div>
              <div class="details-row"><span class="label">Total Paid:</span> <span class="value">${bookingData.totalAmount} JD</span></div>
            </div>

            <p style="background: #fff3f3; color: #b71c1c; padding: 15px; border-radius: 6px; font-weight: bold; border-left: 4px solid #EB0028;">
              🚨 Important: We have attached your digital tickets to this email. Please download them and make sure to show the QR/Barcode on each ticket at the entrance gate.
            </p>

            <p>We look forward to seeing you at the event!</p>
            <p>Best regards,<br><strong>The TEDx Shmeisani Team</strong></p>
          </div>
          <div class="footer">
            TEDx Shmeisani • Amman, Jordan <br>
            This is an automated delivery email regarding your ticket purchase.
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
Hi ${bookingData.buyerName},

Thank you for booking your tickets for TEDx Shmeisani!
Your transaction is complete, and your tickets have been generated successfully.

Booking Details:
- Ticket Type: ${bookingData.ticketType === 'full' ? 'Full Pathway' : 'Main Event'}
- Number of Tickets: ${bookingData.numberOfTickets}
- Total Paid: ${bookingData.totalAmount} JD

🚨 Important: We have attached your digital tickets (Images) to this email. Please download them and present the QR/Barcode at the entrance gate.

Best regards,
The TEDx Shmeisani Team
    `,
  }),

  
  contactNotification: (contactData) => ({
    subject: `🚨 New Contact Message from ${contactData.name} - TEDxShmeisani`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
          .card { max-width: 600px; margin: 0 auto; background: #fff; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); border-left: 5px solid #EB0028; padding: 25px; }
          h2 { color: #000; margin-top: 0; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #666; }
          .value { color: #222; margin-top: 5px; background: #f9f9f9; padding: 10px; border-radius: 4px; }
        </style>
      </head>
      <body>
        <div class="card">
          <h2>🚨 New Contact Inquiry</h2>
          <div class="field"><div class="label">Name:</div><div class="value">${contactData.name}</div></div>
          <div class="field"><div class="label">Email:</div><div class="value">${contactData.email}</div></div>
          <div class="field"><div class="label">Subject:</div><div class="value">${contactData.subject || 'No Subject'}</div></div>
          <div class="field"><div class="label">Message:</div><div class="value" style="white-space: pre-wrap;">${contactData.message}</div></div>
        </div>
      </body>
      </html>
    `,
    text: `
🚨 New Contact Message - TEDxShmeisani
Name: ${contactData.name}
Email: ${contactData.email}
Subject: ${contactData.subject || 'No Subject'}
Message:
${contactData.message}
    `
  }),


  contactConfirmation: (contactData) => ({
    subject: ' Thank you for contacting TEDxShmeisani!',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; margin:0; }
          .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border-top: 6px solid #EB0028; }
          .header { background: #000000; padding: 25px; text-align: center; }
          .logo { color: #EB0028; font-size: 1.8rem; font-weight: bold; }
          .content { padding: 30px; color: #333; line-height: 1.6; }
          .footer { background: #f8f9fa; padding: 15px; text-align: center; font-size: 0.8rem; color: #777; border-top: 1px solid #eee; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">TEDx<span style="color:#ffffff;">Shmeisani</span></div>
          </div>
          <div class="content">
            <h3>Hello ${contactData.name},</h3>
            <p>Thank you for reaching out to us! We have received your message regarding <strong>"${contactData.subject || 'General Inquiry'}"</strong>.</p>
            <p>Our team is currently reviewing your message and will get back to you as soon as possible.</p>
            <br>
            <p>Best regards,</p>
            <p><strong>The TEDx Shmeisani Team</strong></p>
          </div>
          <div class="footer">
            TEDx Shmeisani • Amman, Jordan
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
Hello ${contactData.name},

Thank you for reaching out to TEDxShmeisani! We have received your message regarding "${contactData.subject || 'General Inquiry'}".

Our team is currently reviewing your message and will get back to you as soon as possible.

Best regards,
The TEDx Shmeisani Team
    `
  })
};


const sendEmail = async (to, template, data, attachments = []) => {
  try {
    const transporter = createTransporter();
    const emailContent = template(data);

    const mailOptions = {
      from: `"TEDx Shmeisani" <tedxalshmaisani.jo@gmail.com>`, 
      to: to,
      subject: emailContent.subject,
      text: emailContent.text,
      html: emailContent.html,
      attachments: attachments,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};


const sendTicketsEmail = async (to, bookingData, ticketAttachments) => {
  return await sendEmail(
    to,
    emailTemplates.ticketDelivery,
    bookingData,
    ticketAttachments
  );
};

module.exports = {
  sendEmail,
  sendTicketsEmail,
  emailTemplates,
};