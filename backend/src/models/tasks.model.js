import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Completed", "Due"],
      default: "Pending",
    },
    priority: {
      type: String,
      enum: ["High","Medium","Low", 'None'],
      default: "None"
    },
    dueDate: {
      type: Date,
      default: null
    },
  },
  { timestamps: true }
);

export const Task = mongoose.model("Task", taskSchema);
