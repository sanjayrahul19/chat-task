import { Chat } from "../../model/chat";
import { User } from "../../model/user";
import { responseHandler } from "../../response/responseHandler";
const ObjectId = require("mongoose").Types.ObjectId;

export const chatHome = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Chat.aggregate([
      {
        $match: {
          $or: [{ sender: new ObjectId(id) }, { receiver: new ObjectId(id) }],
        },
      },
      {
        $sort: { created_at: -1 },
      },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ["$sender", new ObjectId(id)] },
              "$receiver",
              "$sender",
            ],
          },
          lastChat: { $first: "$$ROOT" },
        },
      },
      {
        $project: {
          _id: 0,
          user: "$_id",
          message: "$lastChat.message",
          status: "$lastChat.status",
        },
      },
      {
        $match: {
          status: 2,
        },
      },
      {
        $group: {
          _id: "$user",
          lastMessage: { $last: "$message" },
          unreadMessage: { $sum: 1 },
        },
      },
    ]);

    // console.log(chat.length);
    // console.log(result);

    // const user = await User.findById({ _id: req.body.id });
    // const contact = user.contact;
    // // console.log(contact);

    // const array = [];
    // for (let i = 0; i < contact.length; i++) {
    //   const contacts = contact[i].toString();
    //   console.log(contacts, "contactsss");
    //   const chats = await Chat.find({
    //     $and: [{ receiver: req.body.id }, { sender: contacts }],
    //   })
    //     .sort({ created_at: -1 })
    //     .select("_id message status");
    //   // console.log(chats.length, "chatsss");
    //   for (let j = 0; j < chats.length; j++) {
    //     if (chats.length - 1 === j && !array.includes(chats[0])) {
    //       array.push(chats[0]);
    //     }
    //   }
    // }
    // console.log(array, "array");

    const user = await User.findById({ _id: id });
    const contact = user.contact;

    let array = [];
    for (let i = 0; i < contact.length; i++) {
      let object = {};
      const contacts = contact[i].toString();
      console.log(contacts);
      const chats = await Chat.find({
        $and: [{ receiver: id }, { sender: contacts }],
        status: 2,
      });
      console.log(chats, "chats");
      object.id = contacts;
      object.unreadMessages = chats.length;
      // console.log(object);
      array.push(object);
    }
    console.log(array, "array");
    return responseHandler(res, 500, "Data sent successfully", true, result);
  } catch (err) {
    return responseHandler(res, 500, err.message, false);
  }
};
