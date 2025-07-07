import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Button, MenuItem, TextField } from "@mui/material";
import MetalDropdown from "./MetalDropdown";

const RateForm = () => {
  const [metal, setMetal] = useState("");
  const [purityList, setPurityList] = useState([]);
  const [purity, setPurity] = useState("");
  const [rate, setRate] = useState("");
  const [rateDate, setRateDate] = useState("");
  const [latest, setLatest] = useState(null);

  useEffect(() => {
    api.get("/purity").then((res) => setPurityList(res.data));
  }, []);

  useEffect(() => {
    if (metal && purity) {
      api.get(`/rates/latest?metal=${metal}&purity=${purity}`)
        .then((res) => setLatest(res.data?.rate ?? null));
    }
  }, [metal, purity]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/rates", { metal, purity, rate, rateDate });
    setMetal("");
    setPurity("");
    setRate("");
    setRateDate("");
    setLatest(null);
  };

  const filteredPurity = purityList.filter((p) => p.metal === metal);

  return (
    <form onSubmit={handleSubmit}>
      <MetalDropdown value={metal} onChange={setMetal} />
      <TextField
        select
        fullWidth
        label="Purity"
        value={purity}
        onChange={(e) => setPurity(e.target.value)}
        sx={{ mt: 2 }}
        required
      >
        {filteredPurity.map((p) => (
          <MenuItem key={p._id} value={p.name}>
            {p.name}
          </MenuItem>
        ))}
      </TextField>
      {latest !== null && <p>Latest Rate: ₹{latest}</p>}
      <TextField
        fullWidth
        label="New Rate"
        value={rate}
        onChange={(e) => setRate(e.target.value)}
        sx={{ mt: 2 }}
        required
      />
      <TextField
        fullWidth
        type="date"
        value={rateDate}
        onChange={(e) => setRateDate(e.target.value)}
        sx={{ mt: 2 }}
        required
      />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Submit Rate
      </Button>
    </form>
  );
};

export default RateForm;
