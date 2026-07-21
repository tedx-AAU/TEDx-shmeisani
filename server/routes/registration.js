const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');
const Ticket = require('../models/Ticket');
const { sendTicketsEmail } = require('../config/email');
const QRCode = require('qrcode');
const sharp = require('sharp');
const path = require('path');
const crypto = require('crypto');
const ticketsAuthMiddleware = require('../middleware/ticketsAuth');

router.get('/tickets/available', async (req, res) => {
  try {
    const tickets = await Ticket.find();
  
    let totalMax = 0;
    let totalSold = 0;
    tickets.forEach(t => {
      totalMax += t.maxCapacity || 0;
      totalSold += t.soldCount || 0;
    });
    res.json({ 
      success: true,
      numberOfTickets: totalMax - totalSold,
      available: totalMax - totalSold, 
      tickets 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get('/registrations/accepted/count', async (req, res) => {
  try {
    const count = await Registration.countDocuments({ status: { $in: ['Completed', 'Accepted'] } });
    res.json({ 
      success: true,
      totalAccepted: count,
      count 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/registrations', ticketsAuthMiddleware, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const status = req.query.status || '';
    
    const query = {};
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { phoneNumber: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    if (status) {
      if (status === 'Accepted') {
        query.status = { $in: ['Accepted', 'Completed'] };
      } else if (status === 'Rejected') {
        query.status = { $in: ['Rejected', 'Failed'] };
      } else {
        query.status = status;
      }
    }

    const total = await Registration.countDocuments(query);
    const registrations = await Registration.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    const mappedRegistrations = registrations.map((reg, idx) => {
      const doc = reg.toObject();
      if (doc.status === 'Completed') {
        doc.status = 'Accepted';
      } else if (doc.status === 'Failed') {
        doc.status = 'Rejected';
      }
      if (!doc.customerNumber) {
        doc.customerNumber = 1000 + (total - ((page - 1) * limit + idx));
      }
      return doc;
    });

    res.json({
      success: true,
      data: mappedRegistrations,
      registrations: mappedRegistrations,
      totalPages: Math.ceil(total / limit),
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const {
      fullName,
      phoneNumber,
      email,
      address,
      isStudent,
      university,
      gender,
      age,
      heard,
      about,
      ticketType, 
      numberOfTickets,
      attendees 
    } = req.body;

    const ticketInventory = await Ticket.findOne({ ticketType });
    // ملحوظة: إذا كان جدول الـ Ticket يُستخدم كـ Inventory فقط، سنبحث عن نوع التذكرة، 
    // ولكن لوحة التحكم قد تكون بحاجة لإنشاء تذاكر فرعية للمستخدمين فيه، سنعالج ذلك بالأسفل.

    let processedAttendees = [];
    if (attendees && attendees.length > 0) {
      processedAttendees = attendees.map(attendee => ({
        fullName: attendee.name || attendee.fullName || fullName,
        name: attendee.name || attendee.fullName || fullName,
        email: attendee.email || email,
        phone: attendee.phone || phoneNumber,
        gender: attendee.gender || gender,
        age: attendee.age || age,
        isStudent: attendee.isStudent !== undefined ? attendee.isStudent : isStudent,
        university: attendee.university || university || '-',
        ticketCode: `TEDX-SHM-${crypto.randomBytes(4).toString('hex').toUpperCase()}`,
        isCheckedIn: false
      }));
    } else {
      processedAttendees.push({
        fullName: fullName,
        name: fullName,
        email: email,
        phone: phoneNumber,
        gender: gender,
        age: age,
        isStudent: isStudent,
        university: university || '-',
        ticketCode: `TEDX-SHM-${crypto.randomBytes(4).toString('hex').toUpperCase()}`,
        isCheckedIn: false
      });
    }

    const priceEach = ticketInventory ? ticketInventory.price : 0;
    const totalAmount = priceEach * numberOfTickets;

    // Calculate customerNumber dynamically on creation
    const registrationCount = await Registration.countDocuments();
    const customerNumber = 1000 + registrationCount + 1;

    // 1. حفظ التسجيل الرئيسي
    const newRegistration = new Registration({
      customerNumber,
      fullName,
      phoneNumber,
      email,
      address,
      isStudent,
      university: university || '-',
      gender,
      age,
      heard,
      about,
      ticketType,
      numberOfTickets,
      attendees: processedAttendees,
      totalAmount,
      status: 'Completed' 
    });

    await newRegistration.save();

    // 2. تحديث المخزون إذا كان موجوداً
    if (ticketInventory) {
      ticketInventory.soldCount += numberOfTickets;
      await ticketInventory.save();
    }

    // ⭐ إصلاح لوحة التحكم: إنشاء مستند تذكرة لكل حاضر داخل جدول الـ Ticket (إذا كانت اللوحة تقرأ منه)
    // إذا كانت اللوحة تتوقع سطر منفصل لكل شخص للحضور والـ Check-in:
    for (const attendee of processedAttendees) {
      try {
        // نقوم بإنشاء سجل التذكرة للحاضر لكي تظهر في الـ Management
        await Ticket.create({
          ticketCode: attendee.ticketCode,
          holderName: attendee.fullName,
          email: attendee.email,
          phone: attendee.phone,
          ticketType: ticketType,
          status: 'Active',
          isCheckedIn: false,
          registrationId: newRegistration._id
        }).catch(() => {
          // تفادي أي خطأ إذا كانت الـ Schema للـ Ticket مختلفة، لكي لا يتوقف السيرفر
          console.log("Ticket creation skipped or model structure differs.");
        });
      } catch (e) {
        console.error("Error creating individual ticket record:", e);
      }
    }

    const ticketAttachments = [];
    const templateName = ticketType === 'full' ? 'fullpath.jpeg' : 'pre.jpeg';
    const templatePath = path.join(__dirname, `../assets/images/${templateName}`);

    // 3. توليد الصور والـ QR بدقة ومكان ثابتين
    for (let i = 0; i < processedAttendees.length; i++) {
      const attendee = processedAttendees[i];
      // 1. حجم الـ QR Code مناسب جداً للمربع
      const qrCodeBuffer = await QRCode.toBuffer(attendee.ticketCode, {
        errorCorrectionLevel: 'H',
        margin: 1,
        width: 200, 
        color: {
          dark: '#000000',
          light: '#ffffff'
        }
      });

      // 2. إحداثيات جديدة لسحب الـ QR إلى الأعلى وإلى اليسار ليدخل المربع تماماً
      const finalTicketBuffer = await sharp(templatePath)
        .resize(1500, 500) 
        .composite([
          { 
            input: qrCodeBuffer, 
            top: 92,     // رفعه للأعلى (تقليل المسافة من الحافة العلوية)
            left: 1182   // سحبه لليسار (تقليل المسافة من الحافة اليسرى ليدخل السنتر)
          }
        ])
        .png()
        .toBuffer();



      ticketAttachments.push({
        filename: `Ticket-${attendee.name.replace(/\s+/g, '-')}.png`,
        content: finalTicketBuffer,
        contentType: 'image/png'
      });
    }

    const bookingData = {
      bookingId: newRegistration._id.toString(),
      buyerName: fullName,
      ticketType,
      numberOfTickets,
      totalAmount
    };

    await sendTicketsEmail(email, bookingData, ticketAttachments);

    return res.status(201).json({
      success: true,
      message: 'success registration!',
      registrationId: newRegistration._id
    });

  } catch (error) {
    console.error('Error in registration route logic:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Something went wrong!', 
      error: error.message 
    });
  }
});

router.get('/registrations/export', ticketsAuthMiddleware, async (req, res) => {
  try {
    const status = req.query.status || '';
    const query = {};
    if (status) {
      if (status === 'Accepted') {
        query.status = { $in: ['Accepted', 'Completed'] };
      } else if (status === 'Rejected') {
        query.status = { $in: ['Rejected', 'Failed'] };
      } else {
        query.status = status;
      }
    }

    const registrations = await Registration.find(query).sort({ createdAt: -1 });
    const mappedRegistrations = registrations.map((reg, idx) => {
      const doc = reg.toObject();
      if (doc.status === 'Completed') {
        doc.status = 'Accepted';
      } else if (doc.status === 'Failed') {
        doc.status = 'Rejected';
      }
      if (!doc.customerNumber) {
        doc.customerNumber = 1000 + (registrations.length - idx);
      }
      return doc;
    });

    res.json({
      success: true,
      data: mappedRegistrations
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch('/registrations/:id', ticketsAuthMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Accepted', 'Rejected', 'Pending'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const registration = await Registration.findById(id);
    if (!registration) {
      return res.status(404).json({ error: 'Registration not found' });
    }

    registration.status = status;
    await registration.save();

    res.json({
      success: true,
      registration
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch('/tickets/add', ticketsAuthMiddleware, async (req, res) => {
  try {
    const { numberOfTickets } = req.body;
    const increment = parseInt(numberOfTickets) || 1;

    let ticket = await Ticket.findOne({ ticketType: 'main' });
    if (!ticket) {
      ticket = await Ticket.findOne();
    }

    if (ticket) {
      ticket.maxCapacity += increment;
      await ticket.save();
    } else {
      await Ticket.create({
        ticketType: 'main',
        price: 10.5,
        maxCapacity: increment,
        soldCount: 0
      });
    }

    res.json({
      success: true,
      message: 'Tickets added successfully'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;