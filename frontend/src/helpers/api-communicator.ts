import axios from "axios";

axios.defaults.baseURL = "http://mern-chatbot.onrender.com"; // Ensure this matches your backend base URL

export const signupUser = async (name: string, email: string, password: string) => {
  const res = await axios.post("/user/signup", { name, email, password });
  if (res.status !== 201) {
    throw new Error("Failed to signup");
  }
  return res.data;
};

export const loginUser = async (email: string, password: string) => {
  const res = await axios.post("/user/login", { email, password });
  if (res.status !== 200) {
    throw new Error("Failed to login");
  }
  return res.data;
};

export const checkAuthStatus = async () => {
  const res = await axios.get("/user/auth-status");
  if (res.status !== 200) {
    throw new Error("Unable to authenticate");
  }
  return res.data;
};

export const sendChatRequest = async (message: string) => {
  const res = await axios.post("/chat/new", { message });
  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }
  return res.data;
};

export const getUserChats = async () => {
  const res = await axios.get("/chat/all-chats");
  if (res.status !== 200) {
    throw new Error("Unable to get previous chat");
  }
  return res.data;
};

export const deleteUserChats = async () => {
  const res = await axios.delete("/chat/delete");
  if (res.status !== 200) {
    throw new Error("Unable to delete");
  }
  return res.data;
};

export const logoutUser = async () => {
  const res = await axios.post("/user/logout");
  if (res.status !== 200) {
    throw new Error("Unable to logout");
  }
  return res.data;
};
