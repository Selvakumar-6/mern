import React, { useState, useEffect } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import MetalDropdown from "./MetalDropdown";
import api from "../api/axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  boxShadow: 24,
  p: 4,
};

const PurityForm = ({ open, handleClose, onSuccess, editData }) => {
  const [name, setName] = useState("");
  const [metal, setMetal] = useState("");

  useEffect(() => {
    if (editData) {
      setName(editData.name);
      setMetal(editData.metal);
    } else {
      setName("");
      setMetal("");
    }
  }, [editData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editData) {
      await api.put(`/purity/${editData._id}`, { name, metal });
    } else {
      await api.post("/purity", { name, metal });
    }
    onSuccess();
    setName("");    
    setMetal(""); 
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style} component="form" onSubmit={handleSubmit}>
        <Typography variant="h6" gutterBottom>
        {editData ? "Edit Purity" : "Add Purity"}
        </Typography>
        <TextField
          fullWidth
          label="Purity Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mb: 2 }}
          required
        />
        <MetalDropdown value={metal} onChange={setMetal}/>
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          {editData ? "Update" : "Add"}
        </Button>
      </Box>
    </Modal>
  );
};

export default PurityForm;
