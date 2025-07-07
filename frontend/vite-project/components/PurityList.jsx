import React, { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, IconButton, TablePagination, Button
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "../api/axios";
import PurityForm from "./PurityForm";

const PurityList = () => {
  const [purities, setPurities] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [page, setPage] = useState(0);

  const rowsPerPage = 5;

  const fetchPurities = async () => {
    const res = await api.get("/purity");
    setPurities(res.data);
  };

  const handleDelete = async (id) => {
    await api.delete(`/purity/${id}`);
    fetchPurities();
  };

  const handleEdit = (row) => {
    setEditData(row);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setEditData(null);
    setModalOpen(true);
  };

  useEffect(() => {
    fetchPurities();
  }, []);

  return (
    <>
      <Button variant="contained" sx={{ mb: 2 }} onClick={handleAdd}>
        Add Purity
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f0f0f0" }}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Metal</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {purities.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row._id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.metal}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEdit(row)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(row._id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={purities.length}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5]}
        />
      </TableContainer>

      <PurityForm
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        onSuccess={fetchPurities}
        editData={editData}
      />
    </>
  );
};

export default PurityList;
