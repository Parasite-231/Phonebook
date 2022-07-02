const { default: mongoose } = require("mongoose");

//name of the schema that is going to create
const UserPhoneBookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  phoneNumber: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = UserPhoneBookSchema;
