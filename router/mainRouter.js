const express = require('express');
const router = express.Router();
const userRouter = require("./userRouter");

router.use("/api/users", userRouter); // Change from /user to /api/users
module.exports = router;