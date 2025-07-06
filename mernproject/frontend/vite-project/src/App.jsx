import React from "react";
import { Box, Container, Tab, Tabs } from "@mui/material";
import RatePage from "../pages/RatePage";
import PurityPage from "../pages/PurityPage";
import MyAppBar from "../components/AppBar";
import Footer from "../components/Footer";



function App() {
  const [tab, setTab] = React.useState(0);

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <MyAppBar />
      <Container sx={{ flexGrow: 1, py: 3 }}>
        <Tabs value={tab} onChange={(e, val) => setTab(val)} sx={{ mb: 3 }}>
          <Tab label="Purity Management" />
          <Tab label="Metal Rate Management" />
        </Tabs>
        {tab === 0 && <PurityPage />}
        {tab === 1 && <RatePage />}
      </Container>
      <Footer />
    </Box>
  );
}

export default App;
