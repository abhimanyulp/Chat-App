const express = require("express");
const cors = require("cors");
const { connection } = require("./db");
const { userRouter } = require("./routes/user.routes")
const { auth } = require("./middleware/auth.middlware");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());


app.use("/users", userRouter);
app.use(auth);


app.listen(process.env.port, async () => {
    try {
        await connection;
        console.log("Connected to MongoDB");
    } catch (err) {
        console.log("Not able to connect to MongoDB");
        console.log(err);
    }
    console.log(`Server is running at port ${process.env.port}`);
})