import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const MyAppBar = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ justifyContent: "center" }}>
        <Typography variant="h6" component="div" align="center">
          Metal Rate Management
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default MyAppBar;
