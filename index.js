const express = require("express");
const cors = require("cors");
const { userRoute } = require("./routes/userRoute");
const { connection } = require("./config/db");
const { employeeRoute } = require("./routes/employeeRoute");
const {authMiddleware}=require("./middleware/authMiddleware")


const app = express();
app.use(express.json());
app.use(cors());


app.use("/users", userRoute);
app.use("/employee", authMiddleware,employeeRoute);


app.listen(8080, async () => {
    try {
        await connection;
        console.log("server is running at port 8080 ")
    } catch (err) {
        console.log(err);
    }
})