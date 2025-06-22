import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Person as PersonIcon,
  ExitToApp as ExitToAppIcon,
  AccountBalanceWallet as CreditCardIcon,
  ShoppingCart as ShoppingCartIcon,
} from "@mui/icons-material";

import { useAuth } from "./../authentication/authProvider"; // Adjust path to your AuthProvider

const drawerWidth = 240;

function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const location = useLocation();

  const { logout } = useAuth(); // Use the login function from AuthProvider

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
    { text: "Cards", icon: <CreditCardIcon />, path: "/cards" },
    { text: "Users", icon: <PeopleIcon />, path: "/users" },
    { text: "New Order", icon: <ShoppingCartIcon />, path: "/new-order" },
    // { text: 'Profile', icon: <PersonIcon />, path: '/profile' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const handleSignOut = () => {
    // Clear authentication-related data
    // localStorage.removeItem("currentUser");
    // localStorage.removeItem("authToken");
    logout();

    // You can also reset any context or state managing authentication
    // setIsAuthenticated(false);

    // Navigate to the sign-in page
    navigate("/signin");
  };

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => handleNavigation(item.path)}
            selected={location.pathname === item.path}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        <ListItem button onClick={handleSignOut}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Sign Out" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: "64px",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default Layout;
