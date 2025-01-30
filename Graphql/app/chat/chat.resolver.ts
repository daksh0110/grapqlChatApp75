import { PubSub } from 'graphql-subscriptions';
import Message from './message.schema';

const pubsub = new PubSub();

export const resolvers2 = {
  Query: {
    getMessages: async (_: any, { senderId, receiverId }: { senderId: string, receiverId: string }) => {
      return await Message.find({ senderId, receiverId });
    },
  },

  Mutation: {
    sendMessage: async (_: any, { content, senderId, receiverId }: { content: string, senderId: string, receiverId: string }) => {
      const newMessage = new Message({
        content,
        senderId,
        receiverId,
        createdAt: new Date(),
      });

      await newMessage.save();

      // Publish the message to the subscription channel (using receiverId as an identifier)
      pubsub.publish("MESSAGE_SENT", { messageSent: newMessage, receiverId });

      return newMessage;
    },
  },

  Subscription: {
    messageSent: {
      subscribe: (_: any, { receiverId }: { receiverId: string }) => {
      
        return pubsub.publish("MESSAGE_SENT", { receiverId })
      },
      resolve: (payload: any, args: { receiverId: string }) => {
        // Filter out messages for the current user based on receiverId
        if (payload.receiverId === args.receiverId) {
          return payload.messageSent;
        }
        return null;
      },
    },
  },
};
