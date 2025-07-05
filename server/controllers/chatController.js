import Chat from "../models/Chats.js";
import OwnerUser from "../models/OwnerUser.js";
import TenantUser from "../models/TenantUser.js";
import BadRequestError from "../request-errors/BadRequest.js";

/**
 * @description Send message
 * @returns {object} message
 */
const sendMessage = async (req, res) => {
  const { to, message } = req.body;
  const { userId: from } = req.user;
  const newMessage = await Chat.create({
    chatUsers: [from, to],
    message,
    sender: from,
  });
  res.status(201).json({ newMessage, msg: "Message sent successfully" });
};

/**
 * @description Get all messages for a chat
 * @returns {object} message
 */
const getMessages = async (req, res) => {
  const { to } = req.body;
  const { userId: from } = req.user;

  const msgs = await Chat.find({
    chatUsers: { $all: [from, to] },
  }).sort({ createdAt: 1 });

  const messages = msgs.map((msg) => {
    return {
      fromSelf: msg.sender === from,
      message: msg.message,
      isRead: msg.isRead,
      createdAt: msg.createdAt,
    };
  });
  return res.status(200).json({ messages });
};

/**
 * @description Get all chats for a user
 * @returns {object} message
 */

 const getChats = async (req, res) => {
  const { userId } = req.user;

  const lastMessages = await Chat.aggregate([
    {
      $match: {
        chatUsers: { 
          $in: [userId],
          $not: { $elemMatch: { $eq: null } } // Exclude chats with null users
        }
      }
    },
    {
      $sort: { createdAt: -1 }
    },
    {
      $addFields: {
        sortedChatUsers: { $sortArray: { input: "$chatUsers", sortBy: 1 } }
      }
    },
    {
      $group: {
        _id: "$sortedChatUsers",
        lastMessage: { $first: "$$ROOT" }
      }
    },
    {
      $replaceRoot: { newRoot: "$lastMessage" }
    }
  ]);

  // Filter out any remaining null values (just in case)
  const validMessages = lastMessages.filter(msg => 
    msg.chatUsers && 
    msg.chatUsers.every(id => id !== null) && 
    msg.sortedChatUsers && 
    msg.sortedChatUsers.every(id => id !== null)
  );

  const chatContacts = validMessages.map((lastMessage) => {
    const to = lastMessage.chatUsers.find(id => id !== userId && id !== null);
    lastMessage.to = to;
    return to;
  }).filter(Boolean); // Filter out any null values

  let contacts = [];
  if (req.path.includes("tenant")) {
    contacts = await OwnerUser.find({ _id: { $in: chatContacts } }).select(
      "firstName lastName profileImage slug"
    );
  } else if (req.path.includes("owner")) {
    contacts = await TenantUser.find({ _id: { $in: chatContacts } }).select(
      "firstName lastName profileImage slug"
    );
  }

  const chats = validMessages
    .map((lastMessage) => {
      const contact = contacts.find(
        (contact) => contact._id.toString() === lastMessage.to
      );
      return {
        ...lastMessage,
        ...contact?._doc,
      };
    })
    .filter(chat => chat.to !== null) // Final filter to ensure no null to values
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return res.status(200).json({ chats });
};
export { sendMessage, getMessages, getChats };
