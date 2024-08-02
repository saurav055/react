import React from "react";
import { Header,Footer } from "components";
import { Container } from "@mui/material";

export default function ScreenContainer({children,style}){
    return(
        <>
        <Header />
        <Container maxWidth="sm"  sx={[{paddingY:"30px"},style]}>
            {children}
        </Container>
        <Footer/>
        </>
    )
}