const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');
require("dotenv").config();

app.use(cors())

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});
console.log(`MongoDB Connected`);

app.use(express.json());

const usersRouter = require("./routes/user");
app.use("/users", usersRouter);

const twitsRouter = require("./routes/twits");
app.use("/twits", twitsRouter);

app.listen(3000, () => console.log("Server Started"));