import mongoose, { Schema, Document } from "mongoose";
import { Message } from "./message.dto"; // Import the Message interface
import User from "../users/user.schema"; // Import the User model
const MessageSchema: Schema = new Schema<Message>(
  {
    content: {
      type: String,
      required: true,
    },
    senderId: {

    type: String,
      required: true,
    },
    receiverId: {
   type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt
  }
);

// Create the Message model using the schema
const Message = mongoose.model<Message>("Message", MessageSchema);

export default Message;
