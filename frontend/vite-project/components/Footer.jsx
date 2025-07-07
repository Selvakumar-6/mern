import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#1976d2",
        color: "#fff",
        padding: "1rem",
        marginTop: "auto",
        textAlign: "center",
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} ATTS Technologies | MERN Task Demo
      </Typography>
    </Box>
  );
};

export default Footer;
