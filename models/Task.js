const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TaskSchema = new Schema(
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
    collaborators: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    pinned: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true }
);

const project = mongoose.model("Task", TaskSchema);
module.exports = project;
