import type { HeadCell } from "./types";

export const HEAD_CELLS: HeadCell[] = [
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