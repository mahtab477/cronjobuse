const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    default: function () {
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      return days[new Date().getDay()];
    },
  },
  date: {
    type: String,
    default: function () {
      const today = new Date();
      return today.toISOString().split("T")[0]; // yyyy-mm-dd format
    },
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
