import { PubSub, PubSubEngine } from 'graphql-subscriptions';
import Message from './message.schema';

const pubsub: PubSubEngine = new PubSub();

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
      pubsub.publish(`MESSAGE_SENT_${receiverId}`, { messageSent: newMessage });

      return newMessage;
    },
  },

  Subscription: {
    messageSent: {
      subscribe: (_: any, { receiverId }: { receiverId: string }) => {
        // Listen for the channel specific to the receiverId
        return pubsub.asyncIterableIterator(`MESSAGE_SENT_${receiverId}`);
      },
      resolve: (payload: any) => {
        // Just return the message sent when the payload is available
        return payload.messageSent;
      },
    },
  },
};
