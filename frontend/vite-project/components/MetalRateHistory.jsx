import React, { useEffect, useState } from "react";
import {
  Table, TableHead, TableBody, TableRow, TableCell,
  TableContainer, Paper, TablePagination, Box, Button,
  FormControl, InputLabel, Select, MenuItem
} from "@mui/material";
import api from "../api/axios";

const MetalRateHistory = () => {
  const [rates, setRates] = useState([]);
  const [metals, setMetals] = useState([]);
  const [purities, setPurities] = useState([]);
  const [metal, setMetal] = useState("");
  const [purity, setPurity] = useState("");
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const rowsPerPage = 5;

  // Fetch metal list
  useEffect(() => {
    api.get("/metals").then(res => setMetals(res.data));
    api.get("/purity").then(res => setPurities(res.data));
  }, []);

  const fetchRates = async () => {
    const queryParams = new URLSearchParams({
      metal,
      purity,
      page: page + 1,
      limit: rowsPerPage,
    });

    const res = await api.get(`/rates?${queryParams.toString()}`);
    setRates(res.data.rates || res.data);
    setTotal(res.data.total || res.data.length);
  };

  useEffect(() => {
    fetchRates();
  }, [page]);

  const handleFilter = () => {
    setPage(0);
    fetchRates();
  };

  return (
    <Box>
      <Box display="flex" gap={2} mb={2}>
        <FormControl fullWidth>
          <InputLabel>Metal</InputLabel>
          <Select value={metal} onChange={(e) => setMetal(e.target.value)} label="Metal">
            <MenuItem value="">All</MenuItem>
            {metals.map((m) => (
              <MenuItem key={m} value={m}>{m}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Purity</InputLabel>
          <Select value={purity} onChange={(e) => setPurity(e.target.value)} label="Purity">
            <MenuItem value="">All</MenuItem>
            {purities
              .filter(p => !metal || p.metal === metal)
              .map((p) => (
                <MenuItem key={p._id} value={p.name}>{p.name}</MenuItem>
              ))}
          </Select>
        </FormControl>

        <Button variant="contained" onClick={handleFilter}>
          Filter
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>Metal</TableCell>
              <TableCell>Purity</TableCell>
              <TableCell>Rate</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rates.map((row) => (
              <TableRow key={row._id}>
                <TableCell>{row.metal}</TableCell>
                <TableCell>{row.purity}</TableCell>
                <TableCell>₹{row.rate}</TableCell>
                <TableCell>{new Date(row.rateDate).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
            {rates.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No records found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={total}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[rowsPerPage]}
        />
      </TableContainer>
    </Box>
  );
};

export default MetalRateHistory;
