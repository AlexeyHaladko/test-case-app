import { PAGE_PATHS } from "@/routes.ts";
import { NavLink as RouterNavLink } from "react-router";
import UserInfo from "@/features/navigation/user-info";
import { AppBar, Toolbar, Box, styled } from "@mui/material";
import { ThemeToggle } from "@/common/components/theme-toggle";

const NavLink = styled(RouterNavLink)(({ theme }) => ({
  color: 'inherit',
  textDecoration: 'none',
  padding: theme.spacing(1, 2),
  borderRadius: theme.shape.borderRadius,
  '&.active': {
    backgroundColor: theme.palette.action.selected,
    fontWeight: 'bold',
  },
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

function NavigationBar() {
  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
          <NavLink to={PAGE_PATHS.DASHBOARD}>
            DASHBOARD
          </NavLink>
          <NavLink to={PAGE_PATHS.FORM}>
            FORM
          </NavLink>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <UserInfo />
          <ThemeToggle />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavigationBar;