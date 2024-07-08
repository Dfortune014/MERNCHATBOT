import { Request, Response } from "express";
import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_SECRET,
  organization: process.env.OPEN_AI_ORGANIZATION,
});

const openai = new OpenAIApi(configuration);

export const testOpenAiConnection = async (req: Request, res: Response) => {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'Hello, how are you?' },
      ],
    });

    res.status(200).json(response.data);
  } catch (error: any) {
    console.error('Error connecting to OpenAI API:', error);
    if (error.response) {
      res.status(500).json({ message: "OpenAI API Error", details: error.response.data });
    } else if (error.request) {
      res.status(500).json({ message: "No response from OpenAI API", details: error.request });
    } else {
      res.status(500).json({ message: "Error setting up OpenAI API request", details: error.message });
    }
  }
};
