import { TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import { HEAD_CELLS } from "./header-cells";

interface HeaderCellsProps {
  tableParams: {
    ordering?: string;
  };
  handleSortingChange: (field: string) => void;
}

function Header({ tableParams, handleSortingChange }: HeaderCellsProps) {
  return (
    <TableHead>
      <TableRow>
        {HEAD_CELLS.map((headCell) => (
          <TableCell key={headCell.field}>
            <TableSortLabel
              active={tableParams.ordering?.includes(headCell.field)}
              direction={tableParams.ordering === headCell.field ? "asc" : "desc"}
              onClick={() => handleSortingChange(headCell.field)}
            >
              {headCell.headerName}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default Header;