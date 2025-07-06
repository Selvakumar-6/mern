import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Button, List, ListItem, ListItemText } from "@mui/material";

const PurityList = () => {
  const [purities, setPurities] = useState([]);

  const fetchPurities = async () => {
    const res = await api.get("/purity");
    setPurities(res.data);
  };

  const handleDelete = async (id) => {
    await api.delete(`/purity/${id}`);
    fetchPurities();
  };

  useEffect(() => {
    fetchPurities();
  }, []);

  return (
    <List>
      {purities.map((p) => (
        <ListItem key={p._id} secondaryAction={
          <Button color="error" onClick={() => handleDelete(p._id)}>
            Delete
          </Button>
        }>
          <ListItemText primary={`${p.name} (${p.metal})`} />
        </ListItem>
      ))}
    </List>
  );
};

export default PurityList;
