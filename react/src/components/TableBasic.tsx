import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 130 },
  { field: "leaveType", headerName: "Leave Type", width: 130 },
  { field: "startDate", headerName: "Start Date", width: 130 },
  { field: "endDate", headerName: "End Date", width: 130 },
  { field: "daysTotal", headerName: "Days Total", width: 130 },
  { field: "reason", headerName: "Reason", width: 130 },
  { field: "dayRequested", headerName: "Day Requested", width: 130 },
  { field: "status", headerName: "Status", width: 130 },
];

function DataTable() {
  const url = "http://127.0.0.1:8000/api/leaveRequests";
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);

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
console.log(data)
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
}

export default DataTable;