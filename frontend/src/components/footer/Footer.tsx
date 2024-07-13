//@ts-nocheck
import React from "react";

const Footer = () => {
  return (
    <footer>
      <div style={{
        width: "100%",
        padding: 20,
        minHeight: "20vh",
        maxHeight: "30vh",
        marginTop: 60,
      }}>
        <p style={{ fontSize: "16px", textAlign: "center", margin: 0 }}>
          © 2024 Fortune Linus. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
