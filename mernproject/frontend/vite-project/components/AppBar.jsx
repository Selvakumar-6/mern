import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const MyAppBar = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div">
          Metal Rate Management
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default MyAppBar;
