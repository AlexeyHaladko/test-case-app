import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead, TablePagination, TableRow,
  TableSortLabel,
  Toolbar, Typography, TextField, MenuItem, Select, FormControl, InputLabel, Stack
} from "@mui/material";
import type { CropRecord, TableDataRetrieveParams } from "@/api/generated.schemas.ts";
import { TableDataRetrieveStatus, TableDataRetrievePageSize, TableDataRetrieveOrdering } from "@/api/generated.schemas.ts";
import { type ChangeEvent, useState } from "react";
import useGetTableData from "@/api/crops/useGetTableData.ts";

interface HeadCell {
  field: keyof CropRecord;
  headerName: string;
  sortable: boolean;
}

const HEAD_CELLS: HeadCell[] = [
  {
    field: 'id',
    headerName: 'ID',
    sortable: true
  },
  {
    field: 'crop_name',
    headerName: 'Crop',
    sortable: true
  },
  {
    field: 'variety',
    headerName: 'Variety',
    sortable: true
  },
  {
    field: 'region',
    headerName: 'Region',
    sortable: true
  },
  {
    field: 'country',
    headerName: 'Country',
    sortable: true
  },
  {
    field: 'status',
    headerName: 'Status',
    sortable: true,
  },
  {
    field: 'planting_date',
    headerName: 'Planting Date',
    sortable: true,
  },
  {
    field: 'yield_amount',
    headerName: 'Yield (kg/ha)',
    sortable: true
  },
];

function CropsTable() {
  const initialTableParams: TableDataRetrieveParams = {
    page: 1,
    page_size: 10,
  };

  const [tableParams, setTableParams] = useState<TableDataRetrieveParams>(initialTableParams);
  const { data } = useGetTableData(tableParams);

  const changePage = (_: unknown, page: number) => {
     setTableParams(prev => ({ ...prev, page: page + 1 }));
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setTableParams(prev => ({ ...prev, page_size: parseInt(event.target.value, 10) as TableDataRetrievePageSize, page: 1 }));
  };

  const handleSortingChange = (id: string) => {
    if (tableParams.ordering === id) {
      setTableParams(prev => ({...prev, ordering: `_${id}` as TableDataRetrieveOrdering}));
    } else {
      setTableParams(prev => ({...prev, ordering: id as TableDataRetrieveOrdering}));
    }
  }

  const handleFilterChange = (field: keyof TableDataRetrieveParams) => (event: ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    setTableParams(prev => ({
      ...prev,
      [field]: event.target.value,
      page: 1
    }));
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2, p: 2 }}>
        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
          <TextField
            label="Filter by Crop"
            variant="outlined"
            size="small"
            value={tableParams.crop_name || ''}
            onChange={handleFilterChange('crop_name')}
          />
          <TextField
            label="Filter by Country"
            variant="outlined"
            size="small"
            value={tableParams.country || ''}
            onChange={handleFilterChange('country')}
          />
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={tableParams.status || ''}
              label="Status"
              onChange={(e) => {
                setTableParams(prev => ({ ...prev, status: e.target.value as TableDataRetrieveStatus, page: 1 }));
              }}
            >
              <MenuItem value=""><em>None</em></MenuItem>
              {Object.values(TableDataRetrieveStatus).map((status) => (
                <MenuItem key={status} value={status}>{status}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
        <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Table
          </Typography>
        </Toolbar>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {HEAD_CELLS.map((headCell) => {
                  return (
                    <TableCell
                      key={headCell.field}
                    >
                      <TableSortLabel
                        active={tableParams.ordering?.includes(headCell.field)}
                        direction={tableParams.ordering === headCell.field ? "asc" : "desc"}
                        onClick={() => handleSortingChange(headCell.field)}
                      >
                        {headCell.headerName}
                      </TableSortLabel>
                    </TableCell>
                  )
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.results.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.crop_name}</TableCell>
                  <TableCell>{row.variety}</TableCell>
                  <TableCell>{row.region}</TableCell>
                  <TableCell>{row.country}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.planting_date}</TableCell>
                  <TableCell>{row.yield_amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={data?.count ?? 0}
          rowsPerPage={tableParams.page_size ?? 10}
          page={(tableParams.page ?? 1) - 1}
          onPageChange={changePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  )
}

export default CropsTable;