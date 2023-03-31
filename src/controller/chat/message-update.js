import { Chat } from "../../model/chat";
import { responseHandler } from "../../response/responseHandler";

export const messageUpdate = async (req, res) => {
  try {
    const id = req.params.id;
    const message = await Chat.findByIdAndUpdate(
      { _id: id },
      {
        message: req.body.message,
      },
      { new: true }
    );
    return responseHandler(
      res,
      200,
      "Message updated successfully",
      true,
      message
    );
  } catch (err) {
    return responseHandler(res, 500, err.message, false);
  }
};
