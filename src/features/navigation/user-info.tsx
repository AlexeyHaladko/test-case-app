import { useAuth } from "@/common/contexts";
import { Button, Typography, Stack } from "@mui/material";

function UserInfo() {
  const { user, logout } = useAuth();

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      {user && (
        <Typography variant="body1">
          {user.username}
        </Typography>
      )}
      <Button variant="outlined" size="small" onClick={logout}>
        Logout
      </Button>
    </Stack>
  )
}

export default UserInfo;