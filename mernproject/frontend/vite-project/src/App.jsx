import React from "react";
import { Container, Tabs, Tab, Box } from "@mui/material";
// import Footer from "./components/Footer";
import MetalHistoryPage from "../pages/MetalHistoryPage";
import PurityPage from "../pages/PurityPage";
import RatePage from "../pages/RatePage";
import MyAppBar from "../components/AppBar";
import Footer from "../components/Footer";

const App = () => {
  const [tab, setTab] = React.useState(0);

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <MyAppBar />
      <Container sx={{ flexGrow: 1, py: 3 }}>
        <Tabs value={tab} onChange={(e, val) => setTab(val)} sx={{ mb: 3 }}>
          <Tab label="Purity Management" />
          <Tab label="Metal Rate Management" />
          <Tab label="Rate History" />
        </Tabs>
        {tab === 0 && <PurityPage />}
        {tab === 1 && <RatePage />}
        {tab === 2 && <MetalHistoryPage />}
      </Container>
      <Footer />
    </Box>
  );
};

export default App;
