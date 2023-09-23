const express = require("express");
const router = express.Router();
const pool = require("../logindb");
const jwtGenerator = require("../utils/jwtGenerator");
const authorize = require("../middleware/authorize");

// Login route
router.post("/login",authorize, async (req, res) => {
  try {
    // Destructure the req.body (UserUniqueid, password)
    const { UserUniqueid, password } = req.body;

    // Check if user exists
    const user = await pool.query("SELECT * FROM users WHERE user_uid = $1", [UserUniqueid]);

    if (user.rows.length === 0) {
      // User doesn't exist
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    // Check if incoming password is the same as the database password
    if (password === user.rows[0].user_password) {
      // Password is correct, generate a JWT token
      const jwtToken = jwtGenerator(user.rows[0].user_id);
      return res.json({ jwtToken });
    } else {
      // Password is incorrect
      return res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get all users route
router.get("/users", async (req, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users");
    res.json(allUsers.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});


module.exports = router;
