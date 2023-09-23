const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config();

//middleware

app.use(cors());
app.use(express.json());

//routes
app.use("/authentication", require("./routes/jwtAuth"));
// app.use("/authentication", require("./routes/loginauth"));
app.use("/dashboard", require("./routes/dashboard"));

app.listen(5000, () => {
  console.log(`Server is starting on port 5000`);
});
