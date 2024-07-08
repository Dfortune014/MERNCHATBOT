import { Router } from "express";
import { testOpenAiConnection } from "../controllers/openaicontrollers.js";

const router = Router();

router.get("/test-openai", testOpenAiConnection);

export default router;
