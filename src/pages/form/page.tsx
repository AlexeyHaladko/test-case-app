import SubmitForm from "@/features/form";
import { Box, Container } from "@mui/material";

export function FormPage() {
  return (
    <Container maxWidth="xl" sx={{ p: 1 }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <SubmitForm />
      </Box>
    </Container>
  )
}