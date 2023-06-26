const express = require("express");
const http = require("http");
const socketio = require('socket.io');
const cors = require("cors");
const { connection } = require("./db");
const { userRouter } = require("./routes/user.routes")
const { chatting } = require('./configs/chatting');
const { auth } = require("./middleware/auth.middlware");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());



//home route
app.get("/", async (req, res) => {
    try {
        res.send({ msg: "home route" })
        //  res.render("index.ejs")
    } catch (err) { console.log(err) }
})
app.use("/users", userRouter);



const port = process.env.port || 4500


// using http server because express server doesnt support socket.io
const serverHttp = http.createServer(app)
const io = socketio(serverHttp); // with wss we are attaching http server
chatting(io); // using the imported chatting function and passing io instance/ object 


serverHttp.listen(port, async () => {
    try {
        await connection;
        console.log("connected to db ")

    }
    catch (err) {
        console.log("error | connection", err)
    }
    console.log(`server started @ http://localhost:${port}`)
})