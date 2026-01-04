import { FormControl, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import { type TableDataRetrieveParams, TableDataRetrieveStatus } from "@/api/generated.schemas.ts";
import type { ChangeEvent } from "react";

interface SearchByFilterProps {
  tableParams: TableDataRetrieveParams,
  handleFilterChange: (field: keyof TableDataRetrieveParams) => (event: ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => void
}

function SearchByFilter({ tableParams, handleFilterChange}: SearchByFilterProps) {
  return (
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
          onChange={handleFilterChange("status")}
        >
          <MenuItem value=""><em>None</em></MenuItem>
          {Object.values(TableDataRetrieveStatus).map((status) => (
            <MenuItem key={status} value={status}>{status}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  )
}

export default SearchByFilter;