import { Container } from "@mui/material";
import CropsTable from "@/features/table";
import { Suspense } from "react";

export function TablePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <CropsTable />
      </Container>
    </Suspense>
  )
}

/*
* Test Account
Username: testuser
Password: Test1234!
* */