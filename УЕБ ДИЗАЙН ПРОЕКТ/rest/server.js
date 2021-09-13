const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');
const mongo_uri = "mongodb+srv://root:1234@cluster0.4sj5a.mongodb.net/users?retryWrites=true&w=majority";

app.use(cors())

mongoose.connect(mongo_uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});
console.log(`MongoDB Connected`);

app.use(express.json());

const usersRouter = require("./user");
app.use("/", usersRouter);

app.listen(3000, () => console.log("Server Started"));