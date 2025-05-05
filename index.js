const express = require("express")
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors")
const helmet = require("helmet")
// const xssClean = require("xss-clean")
const hpp = require("hpp")
const morgan = require("morgan")
const serverless = require("serverless-http");

const mainRouter = require("./Router/mainRouter.js")

const connectToDatabase = require("./config/dbConnection")
connectToDatabase();

app.use(cors()); // uses to prevent cors error
app.use(helmet()); // uses to set security headers
// app.use(xssClean());    // uses to prevent xss attacks
app.use(hpp()); // uses to prevent http param pollution

app.use(express.json())
app.use(morgan());


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use("/", mainRouter)



// Default route
app.use("/", (req, res) => {
    res.status(200).json({
        message: "User APP backend running"
    });
});


app.listen(process.env.Port || 5000, () => {
    console.log("Server is listening on port ", process.env.Port || 5000)
})
module.exports = app;
module.exports.handler = serverless(app);
