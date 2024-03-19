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
import TextField from "@mui/material/TextField";
import axios from "axios";

interface LeaveRequest {
  id: string;
  name: string;
  leaveTypes: string;
  dayRequested: string;
  status: string;
}

export default function DenseTable() {
  const url = "http://127.0.0.1:8000/api/leaveRequests";
  const [data, setData] = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [formData, setFormData] = useState<LeaveRequest>({
    id: "",
    name: "",
    leaveTypes: "",
    dayRequested: "",
    status: "",
  });
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setData(res.data.leaverequest);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleOpenModal = (id: string) => {
    setSelectedId(id);
    const selectedRow = data.find((row) => row.id === id);
    if (selectedRow) {
      setFormData({ ...selectedRow });
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleUpdateData = async () => {
    try {
      setUpdating(true);
      setError(null);
  
      // Make a PUT request to update data on the server
      // const res = await axios.put(`http://127.0.0.1:8000/update-data/${selectedId}`, formData);
      
      const res = await axios.put('http://127.0.0.1:8000/update-data' + formData, {
        key1: 'value1',
        key2: 'value2',
      }, {
        headers: {
          'Authorization': 'Bearer your_token',
        },
      })
      if (res.data.status === 200) {
        console.log(res.data.message);
  
        // Reset the form data
        setFormData({
          id: "",
          name: "",
          leaveTypes: "",
          dayRequested: "",
          status: "",
        });
      }
  
      // Optionally, you can fetch updated data after the update
      // fetchData();
  
      handleCloseModal();
    } catch (error) {
      console.error('Error:', error);
      setError('Error updating data. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

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
                <TableCell component="th" scope="row">{row.id}</TableCell>
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
        <DialogTitle>Update Leave Request</DialogTitle>
        <DialogContent style={{ paddingTop: '10px' }}>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <TextField
              label="Employee Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{ padding: '5px' }}
            />
            <TextField
              label="Leave Type"
              value={formData.leaveTypes}
              onChange={(e) => setFormData({ ...formData, leaveTypes: e.target.value })}
              style={{ padding: '5px' }}
            />
            <TextField
              label="Pending Date"
              value={formData.dayRequested}
              onChange={(e) => setFormData({ ...formData, dayRequested: e.target.value })}
              style={{ padding: '5px' }}
            />
            <TextField
              label="Status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              style={{ padding: '5px' }}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Close</Button>
          <Button onClick={handleUpdateData} color="primary" disabled={updating}>
            {updating ? 'Updating...' : 'Update Data'}
          </Button>
        </DialogActions>

        {error && (
          <DialogContent>
            <DialogContentText color="error">{error}</DialogContentText>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}