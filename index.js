const express = require("express");
const connectDB = require("./database/database.js");
const cors = require("cors");

const PORT = 3001;

const app = express();
app.use(express.json());
app.use(cors({ origin: "http:localhost:3001" }));

// API
app.use("/api", require("./routes/users"));

//Connect our database
connectDB();

// START SERVER

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
