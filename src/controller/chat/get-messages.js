import { Chat } from "../../model/chat";
import { responseHandler } from "../../response/responseHandler";

export const getMessage = async (req, res) => {
  try {
    const page = req.query.page;
    const limit = req.query.limit;
    const id = req.query.id;
    const totalDocs = await Chat.find({
      $or: [{ sender: id }, { receiver: id }],
    });
    const len = totalDocs.length;
    console.log(len);
    const totalPages = Math.ceil(len / limit);
    console.log(totalPages);
    const message = await Chat.find({
      $or: [{ sender: id }, { receiver: id }],
    })
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ created_at: -1 });
    return responseHandler(res, 200, "Message sent successfully", true, {
      current_page: page,
      page_limit: limit,
      totalPages: totalPages,
      data: message,
    });
  } catch (err) {
    return responseHandler(res, 500, err.message, false);
  }
};
