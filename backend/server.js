const express = require("express");
const mongoose = require("mongoose");
const setupDayUpdater = require("./updateDayCron");
const User = require("./models/userModel");

const app = express();
app.use(express.json());

// ✅ Connect MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/userDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(" MongoDB Connected"))
  .catch((err) => console.log(" MongoDB Error:", err));

// ✅ Start cron job
setupDayUpdater();

// Routes
app.post("/users", async (req, res) => {
  try {
    const user = new User({ name: req.body.name });
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.listen(5000, () => console.log(" Server running on port 5000"));
