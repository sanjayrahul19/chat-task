import { Router } from "express";
import { chatHome } from "../../controller/chat/chat-home";
export const chatRouter = Router();
import { createMessage } from "../../controller/chat/create-message";
import { messageDelete } from "../../controller/chat/delete-message";
import { deliveredStatus } from "../../controller/chat/delivered-status";
import { getMessage } from "../../controller/chat/get-messages";
import { messageUpdate } from "../../controller/chat/message-update";
import { seenStatus } from "../../controller/chat/seen-status";

chatRouter.post("/message", createMessage);
chatRouter.patch("/update/:id", messageUpdate);
chatRouter.delete("/delete/:id", messageDelete);
chatRouter.patch("/delivered/:id", deliveredStatus);
chatRouter.patch("/seen/:id", seenStatus);
chatRouter.get("/get-message", getMessage);
chatRouter.get("/home", chatHome);
