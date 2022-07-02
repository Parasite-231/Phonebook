// external imports
const UserPhoneBookSchema = require("./models/userPhonebook");
const express = require("express");
// const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
//collection made out of the schema of the model
const UserPhoneBook = new mongoose.model("UserPhoneBook", UserPhoneBookSchema);

const app = express();
// request parsers
app.use(express.json());
app.use(cors());

// dotenv.config();
require("dotenv").config({ path: "./../Development/.env" });
port = process.env.PORT;
databaseURL = process.env.APP_MONGO_CONNECTION;
// console.log(port);

// database connection
mongoose
  .connect(databaseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connection is successful!"))
  .catch((err) => console.log(err));

// routing setup

app.get("/getPhoneBook", (req, res) => {
  UserPhoneBook.find({}, (err, data) => {
    if (err) {
      res.json(err);
    } else {
      res.json(data);
    }
  });
});

app.post("/addPhoneNumber", async (req, res) => {
  const grabbedPhoneNumber = req.body;
  const newPhoneNumber = new UserPhoneBook(grabbedPhoneNumber);
  await newPhoneNumber.save();

  res.json(newPhoneNumber);
});

//port initiate
app.listen(port, () => {
  console.log(` Listening to SERVER PORT : ${port}`);
});
