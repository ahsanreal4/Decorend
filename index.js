const express = require("express");
const connectDB = require("./database/database.js");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());

// API
app.use("/api", require("./routes/users"));

//Connect our database
connectDB();

// START SERVER

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
