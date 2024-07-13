//@ts-nocheck
import React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Function to extract code blocks and text blocks from a message
function extractCodeFromString(message: string) {
  const regex = /```(\w*)\n([\s\S]*?)```/g;
  let match;
  const blocks = [];
  let lastIndex = 0;

  while ((match = regex.exec(message)) !== null) {
    if (match.index > lastIndex) {
      blocks.push({ type: 'text', content: message.slice(lastIndex, match.index) });
    }
    blocks.push({ type: 'code', language: match[1], content: match[2] });
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < message.length) {
    blocks.push({ type: 'text', content: message.slice(lastIndex) });
  }

  return blocks;
}

// // Function to determine if a string is a code block based on its content
// //function isCodeBlock(str: string) {
//   return (
//     str.includes("=") ||
//     str.includes(";") ||
//     str.includes("}") ||
//     str.includes("{") ||
//     str.includes("]") ||
//     str.includes("[") ||
//     str.includes(")") ||
//     str.includes("(") ||
//     str.includes("#") ||
//     str.includes("//")
//   );
// }

const ChatItem = ({
  content,
  role,
}: {
  content: string;
  role: "user" | "assistant";
}) => {
  const messageBlocks = extractCodeFromString(content);
  const auth = useAuth();

  return role === "assistant" ? (
    <Box sx={{ display: "flex", p: 2, bgcolor: "#004d5612", my: 2, gap: 2 }}>
      <Avatar sx={{ ml: "0" }}>
        <img src="Logo2.png" alt="fortune" width={"30px"} />
      </Avatar>
      <Box>
        {messageBlocks && messageBlocks.length > 0 && messageBlocks.map((block, index) =>
          block.type === 'code' ? (
            <SyntaxHighlighter
              key={index}
              language={block.language || 'text'}
              style={coldarkDark}
            >
              {block.content}
            </SyntaxHighlighter>
          ) : (
            <Typography key={index} sx={{ fontSize: "20px" }}>
              {block.content}
            </Typography>
          )
        )}
      </Box>
    </Box>
  ) : (
    <Box sx={{ display: "flex", p: 2, bgcolor: "rgb(5, 65, 177)", gap: 2 }}>
      <Avatar sx={{ ml: "0", bgcolor: "black", color: "white" }}>
        {auth?.user?.name[0]}
        {auth?.user?.name.split(" ")[1][0]}
      </Avatar>
      <Box>
        {messageBlocks && messageBlocks.length > 0 && messageBlocks.map((block, index) =>
          block.type === 'code' ? (
            <SyntaxHighlighter
              key={index}
              language={block.language || 'text'}
              style={coldarkDark}
            >
              {block.content}
            </SyntaxHighlighter>
          ) : (
            <Typography key={index} sx={{ fontSize: "20px" }}>
              {block.content}
            </Typography>
          )
        )}
      </Box>
    </Box>
  );
};

export default ChatItem;
