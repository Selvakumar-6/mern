import React, { useState } from "react";
import api from "../api/axios";

import { Button, TextField } from "@mui/material";
import MetalDropdown from "./MetalDropdown";

const PurityForm = ({ onSuccess }) => {
  const [name, setName] = useState("");
  const [metal, setMetal] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/purity", { name, metal });
    setName("");
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField fullWidth label="Purity Name" value={name} onChange={(e) => setName(e.target.value)} />
      <MetalDropdown value={metal} onChange={setMetal} />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Add Purity
      </Button>
    </form>
  );
};

export default PurityForm;
