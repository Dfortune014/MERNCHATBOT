//@ts-nocheck
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import { IoMdSend } from "react-icons/io";
import { useAuth } from "../context/AuthContext";
import { red } from "@mui/material/colors";
import ChatItem from "../components/chat/ChatItem";
import { deleteUserChats, getUserChats, sendChatRequest } from "../helpers/api-communicator";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const Chat = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const auth = useAuth();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  const handleSubmit = async () => {
    const content = inputRef.current?.value?.trim();
    if (!content) return; // Ignore empty submissions

    if (inputRef.current) {
      inputRef.current.value = "";
    }

    const newMessage: Message = { role: "user", content };
    setChatMessages((prev) => [...prev, newMessage]);

    try {
      const chatData = await sendChatRequest(content);
      console.log("Chat data after sending message:", chatData);
      setChatMessages(chatData.chats);
    } catch (error) {
      console.error("Error sending chat request:", error);
      toast.error("Error sending message");
    }
  };

  const handleDeleteChats = async () => {
    try {
      toast.loading("Deleting Chats", { id: "deletechats" });
      await deleteUserChats();
      setChatMessages([]);
      toast.success("Chats Deleted", { id: "deletechats" });
    } catch (error) {
      console.error("Error deleting chats:", error);
      toast.error("Error deleting chats", { id: "deletechats" });
    }
  };

  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      console.log("User is logged in, loading chats...");
      toast.loading("Loading Chats", { id: "loadchats" });
      getUserChats()
        .then((data) => {
          console.log("Chats loaded:", data.chats);
          setChatMessages(data.chats);
          toast.success("Successfully loaded chats", { id: "loadchats" });
        })
        .catch((err) => {
          console.error("Error loading chats:", err);
          toast.error("Error loading chats", { id: "loadchats" });
        });
    } else {
      console.log("User is not logged in or user data is missing.");
    }
  }, [auth?.isLoggedIn, auth?.user]);

  useEffect(() => {
    if (!auth?.user) {
      navigate("/login");
    }
  }, [auth, navigate]);

  // Add keydown event listener to detect "Enter" key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        handleSubmit();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        mt: 3,
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: { md: "flex", xs: "none", small: "none" },
          flex: 0.2,
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "60vh",
            bgcolor: "rgb(67, 128, 240)",
            borderRadius: 5,
            flexDirection: "column",
            mx: 3,
          }}
        >
          {auth?.user && (
            <Avatar
              sx={{
                mx: "auto",
                my: 2,
                bgcolor: "white",
                color: "black",
                fontWeight: 700,
              }}
            >
              {auth.user.name[0]}
              {auth.user.name.split(" ")[1][0]}
            </Avatar>
          )}
          <Typography sx={{ mx: "auto", fontFamily: "work sans", mt: "10px" }}>
            You are talking to a ChatBOT
          </Typography>
          <Typography sx={{ mx: "auto", fontFamily: "work sans", my: 4, p: 3 }}>
            You can ask some questions related to knowledge, Business, Advices,
            Education, etc. But avoid sharing personal information
          </Typography>
          <Button
            onClick={handleDeleteChats}
            sx={{
              width: "200px",
              my: "auto",
              color: "white",
              fontWeight: "700",
              borderRadius: 3,
              mx: "auto",
              bgcolor: red[300],
              ":hover": {
                bgcolor: red.A400,
              },
            }}
          >
            Clear conversation
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: "column",
          px: 3,
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "40px",
            color: "white",
            mb: 2,
            mx: "auto",
          }}
        >
          Model - GPT 2.0 Turbo
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "60vh",
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
          }}
        >
          {chatMessages.length > 0 ? (
            chatMessages.map((chat, index) => (
              <ChatItem content={chat.content} role={chat.role} key={index} />
            ))
          ) : (
            <Typography sx={{ textAlign: "center", color: "white" }}>
              No messages to display.
            </Typography>
          )}
        </Box>
        <div
          style={{
            width: "100%",
            padding: "20px",
            borderRadius: 8,
            backgroundColor: "rgb(5, 65, 177)",
            display: "flex",
            margin: "auto",
          }}
        >
          <input
            ref={inputRef}
            type="text"
            style={{
              width: "100%",
              backgroundColor: "transparent",
              padding: "10px",
              border: "none",
              outline: "none",
              fontSize: "20px",
              color: "white",
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          />
          <IconButton
            onClick={handleSubmit}
            sx={{
              ml: "auto",
              color: "white",
            }}
          >
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};

export default Chat;
