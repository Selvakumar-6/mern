import React from "react";
import { Typography } from "@mui/material";
import MetalRateHistory from "../components/MetalRateHistory";

const MetalHistoryPage = () => (
  <div>
    <Typography variant="h5" gutterBottom>
      Metal Rate History
    </Typography>
    <MetalRateHistory />
  </div>
);

export default MetalHistoryPage;
