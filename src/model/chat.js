import mongoose, { Types } from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    receiver: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    message: {
      type: String,
    },
    message_type: {
      type: String,
    },
    created_at: { type: Date, default: Date.now },
    status: {
      type: Number,
      enum: [0, 1, 2],
      default: 0,
    },
  },
  { versionKey: false }
);
export const Chat = mongoose.model("chat", chatSchema);
