const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  department: {
    type: String,
    enum: [
      "Business Operations",
      "HR",
      "Marketing & Sales",
      "Finance",
      "IT",
      "Software",
    ],
  },
  taskList: [
    {
      type: Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
