
import { Document } from "mongoose";


export interface Message extends Document {
  content: string;
  senderId: string 
  receiverId: string; 
  createdAt: Date; 
}
