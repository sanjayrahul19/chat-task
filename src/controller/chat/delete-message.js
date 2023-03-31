import { Chat } from "../../model/chat";
import { responseHandler } from "../../response/responseHandler";

export const messageDelete = async (req, res) => {
  try {
    const id = req.params.id;
    const message = await Chat.findByIdAndDelete({ _id: id });
    return responseHandler(
      res,
      200,
      "Message deleted successfully",
      true,
      message
    );
  } catch (err) {
    return responseHandler(res, 500, err.message, false);
  }
};
