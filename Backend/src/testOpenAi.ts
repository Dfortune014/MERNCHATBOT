import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_SECRET,
  organization: process.env.OPEN_AI_ORGANIZATION,
});

const openai = new OpenAIApi(configuration);

const testOpenAiConnection = async () => {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'Hello, how are you?' },
      ],
    });

    console.log('OpenAI API response:', response.data);
  } catch (error: any) {
    console.error('Error connecting to OpenAI API:', error);
    if (error.response) {
      console.error('Error response data:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
  }
};

testOpenAiConnection();
