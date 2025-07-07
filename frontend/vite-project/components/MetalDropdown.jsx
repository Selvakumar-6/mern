import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { MenuItem, Select } from "@mui/material";

const MetalDropdown = ({ value, onChange }) => {
  const [metals, setMetals] = useState([]);

  useEffect(() => {
    api.get("/metals").then((res) => setMetals(res.data));
  }, []);

  return (
    <Select fullWidth value={value} onChange={(e) => onChange(e.target.value)}>
      {metals.map((metal) => (
        <MenuItem key={metal} value={metal}>
          {metal}
        </MenuItem>
      ))}
    </Select>
  );
};

export default MetalDropdown;
