import { Router } from "express";
import { userRouter } from "./user-router/user-router";
import { chatRouter } from "./chat-router/chat-router";
export const router = Router();

router.use("/api/v1/user", userRouter);
router.use("/api/v1/chat", chatRouter);
