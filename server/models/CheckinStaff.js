const mongoose = require("mongoose");

const checkinStaffSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      default: "checkin_staff",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "CheckinStaff",
  checkinStaffSchema
);