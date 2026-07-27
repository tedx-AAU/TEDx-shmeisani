const nodemailer = require('nodemailer');

// Create reusable transporter object using SMTP transport for Gmail
const createTransporter = () => {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'tedxalshmaisani.jo@gmail.com',
      pass: 'vvtoqykmsxsxyhme',
    },
  });
};

const emailTemplates = {
  ticketDelivery: (bookingData) => ({
    subject: `🎉 Your TEDx ALShmaisani Tickets Are Confirmed!`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your Tickets - TEDx AlShmaisani</title>
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
            <div class="logo">TEDx<span style="color:#ffffff;">ALShmaisani</span></div>
          </div>
          <div class="content">
            <div class="headline">Hi ${bookingData.buyerName},</div>
            <p>Thank you for joining us at <strong>TEDx AlShmaisani</strong>. Your registration has been successfully received and confirmed!</p>
            <p>Here are your booking details:</p>
            
            <div class="details-box">
              <div class="details-row"><span class="label">Ticket Type:</span> <span class="value">${bookingData.ticketType === 'full' ? 'Full Pathway (Pre-TEDx + Main TEDx)' : 'Main Event'}</span></div>
              <div class="details-row"><span class="label">Number of Tickets:</span> <span class="value">${bookingData.numberOfTickets}</span></div>
              <div class="details-row"><span class="label">Total Paid:</span> <span class="value">${bookingData.totalAmount} JD</span></div>
            </div>

            <p style="background: #fff3f3; color: #b71c1c; padding: 15px; border-radius: 6px; font-weight: bold; border-left: 4px solid #EB0028;">
              🚨 Important: We have attached your digital tickets to this email. Please download them and make sure to show the QR/Barcode on each ticket at the entrance gate.
            </p>

            <p>We can't wait to see you soon and share an inspiring experience together!</p>
            <p>Best regards,<br><strong>The TEDx AlShmaisani Team</strong></p>
          </div>
          <div class="footer">
            TEDx AlShmaisani • Amman, Jordan <br>
            This is an automated delivery email regarding your ticket purchase.
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
Hi ${bookingData.buyerName},

Thank you for joining us at TEDx Shmeisani.
Your registration has been successfully received and confirmed!

Booking Details:
- Ticket Type: ${bookingData.ticketType === 'full' ? 'Full Pathway' : 'Main Event'}
- Number of Tickets: ${bookingData.numberOfTickets}
- Total Paid: ${bookingData.totalAmount} JD

🚨 Important: We have attached your digital tickets to this email. Please download them and present the QR/Barcode at the entrance gate.

Best regards,
The TEDx AlShmaisani Team
    `,
  }),

  contactNotification: (contactData) => ({
    subject: `🚨 New Contact Message from ${contactData.name} - TEDx AlShmaisani`,
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
🚨 New Contact Message - TEDx AlShmaisani
Name: ${contactData.name}
Email: ${contactData.email}
Subject: ${contactData.subject || 'No Subject'}
Message:
${contactData.message}
    `
  }),

  contactConfirmation: (contactData) => ({
    subject: ' Thank you for contacting TEDx AlShmaisani!',
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
            <div class="logo">TEDx<span style="color:#ffffff;">AlShmaisani</span></div>
          </div>
          <div class="content">
            <h3>Hello ${contactData.name},</h3>
            <p>Thank you for reaching out to us! We have received your message regarding <strong>"${contactData.subject || 'General Inquiry'}"</strong>.</p>
            <p>Our team is currently reviewing your message and will get back to you as soon as possible.</p>
            <br>
            <p>Best regards,</p>
            <p><strong>The TEDx AlShmaisani Team</strong></p>
          </div>
          <div class="footer">
            TEDx AlShmaisani • Amman, Jordan
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
Hello ${contactData.name},

Thank you for reaching out to TEDx AlShmeisani! We have received your message regarding "${contactData.subject || 'General Inquiry'}".

Our team is currently reviewing your message and will get back to you as soon as possible.

Best regards,
The TEDx AlShmaisani Team
    `
  })
};

// Send email base function
const sendEmail = async (to, template, data) => {
  try {
    if (!to) {
      console.error('Error: No recipient email provided!');
      return { success: false, error: 'No recipients defined' };
    }

    const transporter = createTransporter();
    const emailContent = template(data);

    const mailOptions = {
      from: `"TEDx AlShmaisani" <tedxalshmaisani.jo@gmail.com>`,
      to: to,
      subject: emailContent.subject,
      text: emailContent.text,
      html: emailContent.html,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

// Send tickets email with attachments support
const sendTicketsEmail = async (to, bookingData, ticketAttachments) => {
  try {
    if (!to) {
      console.error('Error: No recipient email provided for tickets!');
      return { success: false, error: 'No recipients defined' };
    }

    const transporter = createTransporter();
    const emailContent = emailTemplates.ticketDelivery(bookingData);

    const mailOptions = {
      from: `"TEDx AlShmaisani" <tedxalshmaisani.jo@gmail.com>`,
      to: to,
      subject: emailContent.subject,
      text: emailContent.text,
      html: emailContent.html,
      attachments: ticketAttachments || []
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Tickets email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Error sending tickets email:', error);
    return { success: false, error: error.message };
  }
};

// Send contact notification to admin
const sendContactNotification = async (contactData) => {
  const adminEmail = 'tedxalshmaisani.jo@gmail.com';
  return await sendEmail(
    adminEmail,
    emailTemplates.contactNotification,
    contactData
  );
};

// Send confirmation email to user
const sendContactConfirmation = async (contactData) => {
  return await sendEmail(
    contactData.email,
    emailTemplates.contactConfirmation,
    contactData
  );
};

// Send custom email
const sendCustomEmail = async (to, subject, message) => {
  try {
    if (!to) {
      console.error('Error: No recipient email provided!');
      return { success: false, error: 'No recipients defined' };
    }

    const transporter = createTransporter();

    const mailOptions = {
      from: `"TEDx AlShmaisani" <tedxalshmaisani.jo@gmail.com>`,
      to: to,
      subject: subject,
      text: message,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Custom email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Error sending custom email:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendEmail,
  sendTicketsEmail,
  sendContactNotification,
  sendContactConfirmation,
  sendCustomEmail,
  emailTemplates,
};