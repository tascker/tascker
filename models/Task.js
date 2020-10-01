const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const projectSchema = new Schema(
  {
    title: String,
    notes: String,
    deadline: Date,
    status: {
      type: String,
      enum: ["to-do", "on going", "done"],
      default: "to-do",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    collaborators: [{
      type: Schema.Types.ObjectId,
      ref: "User"
    }],
    // subTaks: {
    //   type: Schema.Types.ObjectId,
    //   ref: "subTask",
    // },
  },
  { timestamps: true }
);

const project = mongoose.model("Task", projectSchema);
module.exports = project;
