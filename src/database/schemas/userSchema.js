const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: { type: Schema.Types.String },
  lastName: { type: Schema.Types.String },
  email: { type: Schema.Types.String, unique: true },
  password: { type: Schema.Types.String },
});


const Users = mongoose.model("Users", userSchema);
module.exports = Users;
