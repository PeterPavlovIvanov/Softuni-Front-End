const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');
const mongo_uri = "mongodb+srv://root:1234@cluster0.4sj5a.mongodb.net/users?retryWrites=true&w=majority";

app.use(cors())

var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

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