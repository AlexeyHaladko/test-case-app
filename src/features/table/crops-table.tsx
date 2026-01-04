import { type ChangeEvent, useState } from "react";

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination, TableRow,
  Toolbar, Typography, Paper
} from "@mui/material";

import type { TableDataRetrieveParams } from "@/api/generated.schemas";
import { TableDataRetrievePageSize, TableDataRetrieveOrdering } from "@/api/generated.schemas";

import { useGetTableData } from "@/api/queries";
import SearchByFilter from "./search-by-filter";
import Header from "./table-header";

export function CropsTable() {
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
    setTableParams(prev => ({
      ...prev,
      page_size: parseInt(event.target.value, 10) as TableDataRetrievePageSize,
      page: 1
    }));
  };

  const handleSortingChange = (id: string) => {
    if (tableParams.ordering === id) {
      setTableParams(prev => ({ ...prev, ordering: `_${id}` as TableDataRetrieveOrdering }));
    } else {
      setTableParams(prev => ({ ...prev, ordering: id as TableDataRetrieveOrdering }));
    }
  }

  const handleFilterChange = (field: keyof TableDataRetrieveParams) => (event: ChangeEvent<HTMLInputElement | {
    name?: string;
    value: unknown
  }>) => {
    setTableParams(prev => ({
      ...prev,
      [field]: event.target.value,
      page: 1
    }));
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2, p: 2 }}>
        <SearchByFilter tableParams={tableParams} handleFilterChange={handleFilterChange} />
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
            <Header tableParams={tableParams} handleSortingChange={handleSortingChange} />
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