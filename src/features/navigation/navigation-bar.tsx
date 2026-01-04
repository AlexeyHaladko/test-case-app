import { PAGE_PATHS } from "@/routes.ts";
import { NavLink as RouterNavLink } from "react-router";
import UserInfo from "@/features/navigation/user-info";
import { AppBar, Toolbar, Box, styled, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, useTheme, useMediaQuery } from "@mui/material";
import { ThemeToggle } from "@/common/components/theme-toggle";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

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
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const navItems = [
    { label: 'DASHBOARD', path: PAGE_PATHS.DASHBOARD },
    { label: 'FORM', path: PAGE_PATHS.FORM },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', width: 250 }}>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton component={RouterNavLink} to={item.path} sx={{ textAlign: 'center' }}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 2 }}>
          {navItems.map((item) => (
            <NavLink key={item.label} to={item.path}>
              {item.label}
            </NavLink>
          ))}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
          <UserInfo />
          <ThemeToggle />
        </Box>
      </Toolbar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
}

export default NavigationBar;