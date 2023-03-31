import { Chat } from "../../model/chat";
import { responseHandler } from "../../response/responseHandler";

export const deliveredStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const status = await Chat.findByIdAndUpdate(
      { _id: id },
      {
        status: 1,
      },
      { new: true }
    );
    return responseHandler(
      res,
      200,
      "Status updated successfully",
      true,
      status
    );
  } catch (err) {
    return responseHandler(res, 500, err.message, false);
  }
};
