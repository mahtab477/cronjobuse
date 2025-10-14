const cron = require("node-cron");
const User = require("./models/userModel");

function setupDayUpdater() {
  cron.schedule("0 0 * * *", async () => {
    try {
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];

      const today = new Date();
      const currentDay = days[today.getDay()];
      const currentDate = today.toISOString().split("T")[0];

      await User.updateMany({}, { day: currentDay, date: currentDate });

      console.log(`Updated all users: ${currentDay}, ${currentDate}`);
    } catch (error) {
      console.error("Error updating days:", error);
    }
  });
}

module.exports = setupDayUpdater;
