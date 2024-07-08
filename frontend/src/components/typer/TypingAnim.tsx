import React from "react";
import { TypeAnimation } from "react-type-animation";

const TypingAnim = () => {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        '💬 Chat with your OWN AI 🤖',
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        '🚀 Built with Open AI',
        2000,
        '💻 Wanna Chat about Technology?',
        1500,
        '📚 I can help with your Homework',
        2500
      ]}
      wrapper="span"
      speed={50}
      style={{ 
        fontSize: '60px', 
        color: "black", 
        display: 'inline-block',
        textShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)"
     }}
      repeat={Infinity}
    />
  );
};

export default TypingAnim;
