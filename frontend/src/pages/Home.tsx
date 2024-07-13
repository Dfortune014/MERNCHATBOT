//@ts-nocheck
import { Box, useMediaQuery, useTheme } from "@mui/material";
//@ts-nocheck
// import React from "react";
import TypingAnim from "../components/typer/TypingAnim";
import  Footer  from "../components/footer/Footer"


const Home = () => {
    //@ts-ignore
    const theme = useTheme();
   // const isBelowMd = useMediaQuery(theme.breakpoints.down('md'));
    return ( <Box width={"100%"} height={"100%"} >
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                alignItems: "center",
                mx: "auto"
            }}>
                <Box>
                    <TypingAnim />
                </Box>
                <Box sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: {md: "row", xs: "column", sm: "column" },
                    gap: 5,
                    my: 10,
                }}>
                    <img
                        src= "robot.png"
                        alt="robot"
                        style={{width: "200px", margin: "auto"}}
                    />
                    <img
                        className="image-inverted rotate"
                        src= "Logo2.png"
                        alt="openai"
                        style={{width: "200px", margin: "auto"}}
                    />
                    </Box>
                    <Box sx={{ display:"flex", width:"100%", mx:"auto"}}>
                        <img
                            src = "chat.png"
                            alt="chat"
                            style={{
                                display: "flex",
                                width: "60%", 
                                margin: "auto",
                                borderRadius: 20,
                                boxShadow: "-5px -5px 105px #14E7F8",
                                marginTop: 20,
                                marginBottom: 30,
                            }}
                        />
                    </Box>
        </Box>
        <Footer/>
    </Box>
    );
};

export default Home;