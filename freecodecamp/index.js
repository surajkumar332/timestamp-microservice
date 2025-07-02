const express = require("express");
const app = express();

// Enable CORS (for FCC test compatibility)
const cors = require("cors");
app.use(cors());

// Root route
app.get("/", (req, res) => {
  res.send("Timestamp Microservice is working!");
});

// Timestamp API
app.get("/api/:date?", (req, res) => {
  let dateString = req.params.date;

  // If no date is provided, use current date
  let date;
  if (!dateString) {
    date = new Date();
  } else {
    // Check if date is a number (unix timestamp in milliseconds)
    if (!isNaN(dateString)) {
      date = new Date(parseInt(dateString));
    } else {
      date = new Date(dateString);
    }
  }

  // Invalid date check
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// Listen on port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
