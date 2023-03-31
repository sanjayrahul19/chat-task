import { Chat } from "../../model/chat";
import { User } from "../../model/user";
import { responseHandler } from "../../response/responseHandler";
const ObjectId = require("mongoose").Types.ObjectId;

export const chatHome = async (req, res) => {
  try {
    const result = await Chat.aggregate([
      {
        $match: {
          $or: [
            { sender: new ObjectId(req.body.id) },
            { receiver: new ObjectId(req.body.id) },
          ],
        },
      },
      {
        $sort: { created_at: -1 },
      },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ["$sender", new ObjectId(req.body.id)] },
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
    ]);

    const chat = await Chat.find({
      $and: [{ receiver: req.body.id }, { sender: "6426825a653e9fc3d1200d25" }],
      status: 0,
    });
    console.log(chat.length);
    console.log(result);
    return responseHandler(res, 500, "Data sent successfully", true, {
      UnreadMessages: chat.length,
      result,
    });
  } catch (err) {
    return responseHandler(res, 500, err.message, false);
  }
};
