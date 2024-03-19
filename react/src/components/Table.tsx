import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import axios from "axios";

interface LeaveRequest {
  id: string;
  name: string;
  leaveTypes: string;
  dayRequested: string;
  status: string;
}

function createData(
  id: string,
  name: string,
  leaveTypes: string,
  dayRequested: string,
  status: string
): LeaveRequest {
  return { id, name, leaveTypes, dayRequested, status };
}

export default function DenseTable() {
  const url = "http://127.0.0.1:8000/api/leaveRequests";
  const [data, setData] = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setData(res.data.leaverequest);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const handleOpenModal = (id: string) => {
    setSelectedId(id);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  console.log(data);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Employee Name</TableCell>
              <TableCell align="right">Leave Type</TableCell>
              <TableCell align="right">Pending Date</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.leaveTypes}</TableCell>
                <TableCell align="right">{row.dayRequested}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
                <TableCell align="left">
                  <button onClick={() => handleOpenModal(row.id)}>
                    Open Modal
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Modal Title</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Modal content for ID: {selectedId}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}