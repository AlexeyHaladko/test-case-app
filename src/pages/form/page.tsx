import SubmitForm from "@/features/form";
import { Box, Container } from "@mui/material";
import { Suspense } from "react";

export function FormPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Container maxWidth="xl" sx={{ p: 1 }}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <SubmitForm />
        </Box>
      </Container>
    </Suspense>
  )
}
