const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
require('dotenv').config();

const ticketsAuthMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res
        .status(401)
        .json({ error: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if this is a ticket admin token (userType is required for ticket tokens)
    if (!decoded.userType || decoded.userType !== 'ticketsAdmin') {
      return res
        .status(401)
        .json({ error: 'Invalid token type for ticket access.' });
    }

    const ticketsAdmin = await Admin.findById(decoded.ticketsAdminId).select(
      '-password'
    );

    if (!ticketsAdmin) {
      return res
        .status(401)
        .json({ error: 'Invalid token. Tickets admin not found.' });
    }

    // Verify the admin has the correct role
    if (ticketsAdmin.role !== 'ticketsAdmin' && ticketsAdmin.role !== 'admin') {
      return res
        .status(403)
        .json({ error: 'Access denied. Invalid ticket admin role.' });
    }

    req.ticketsAdmin = ticketsAdmin;
    next();
  } catch (error) {
    console.error('Ticket auth middleware error:', error);

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        error: 'Token expired. Please login again.',
        code: 'TOKEN_EXPIRED',
      });
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        error: 'Invalid token format.',
        code: 'INVALID_TOKEN',
      });
    }

    res.status(401).json({ error: 'Authentication failed.' });
  }
};

module.exports = ticketsAuthMiddleware;
