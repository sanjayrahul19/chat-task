import { Chat } from "../../model/chat";
import { User } from "../../model/user";
import { responseHandler } from "../../response/responseHandler";

export const createMessage = async (req, res) => {
  try {
    const message = await Chat.create({
      sender: req.body.sender,
      receiver: req.body.receiver,
      message: req.body.message,
      message_type: req.body.message_type,
    });

    const user = await User.findById({ _id: req.body.sender });
    if (user) {
      const contact = user.contact;

      const check = contact.includes(req.body.receiver);

      if (!check) {
        const sender = await User.findByIdAndUpdate(
          { _id: req.body.receiver },
          { $push: { contact: req.body.receiver } },
          { new: true }
        );
      }
    } else {
      responseHandler(res, 500, "No user found", false);
    }

    const users = await User.findById({ _id: req.body.receiver });
    if (users) {
      const contact = users.contact;

      const check = contact.includes(req.body.sender);

      if (!check) {
        const sender = await User.findByIdAndUpdate(
          { _id: req.body.receiver },
          { $push: { contact: req.body.sender } },
          { new: true }
        );
      }
    } else {
      responseHandler(res, 500, "No user found", false);
    }
    return responseHandler(
      res,
      200,
      "Message sent successfully",
      true,
      message
    );
  } catch (err) {
    return responseHandler(res, 500, err.message, false);
  }
};
