// import { useState } from "react";
// import { Outlet, useNavigate, useLocation } from "react-router-dom";
// import {
//   AppBar,
//   Box,
//   Drawer,
//   IconButton,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Toolbar,
//   Typography,
//   useMediaQuery,
//   useTheme,
// } from "@mui/material";
// import {
//   Menu as MenuIcon,
//   Dashboard as DashboardIcon,
//   People as PeopleIcon,
//   Person as PersonIcon,
//   ExitToApp as ExitToAppIcon,
//   AccountBalanceWallet as CreditCardIcon,
//   ShoppingCart as ShoppingCartIcon,
// } from "@mui/icons-material";

// import { useAuth } from "./../authentication/authProvider"; // Adjust path to your AuthProvider

// const drawerWidth = 240;

// function Layout() {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const navigate = useNavigate();
//   const location = useLocation();

//   const { logout } = useAuth(); // Use the login function from AuthProvider

//   const menuItems = [
//     { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
//     { text: "Cards", icon: <CreditCardIcon />, path: "/cards" },
//     { text: "Users", icon: <PeopleIcon />, path: "/users" },
//     { text: "New Order", icon: <ShoppingCartIcon />, path: "/new-order" },
//     // { text: 'Profile', icon: <PersonIcon />, path: '/profile' },
//   ];

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const handleNavigation = (path) => {
//     navigate(path);
//     if (isMobile) {
//       setMobileOpen(false);
//     }
//   };

//   const handleSignOut = () => {
//     // Clear authentication-related data
//     // localStorage.removeItem("currentUser");
//     // localStorage.removeItem("authToken");
//     logout();

//     // You can also reset any context or state managing authentication
//     // setIsAuthenticated(false);

//     // Navigate to the sign-in page
//     navigate("/signin");
//   };

//   const drawer = (
//     <div>
//       <Toolbar />
//       <List>
//         {menuItems.map((item) => (
//           <ListItem
//             button
//             key={item.text}
//             onClick={() => handleNavigation(item.path)}
//             selected={location.pathname === item.path}
//           >
//             <ListItemIcon>{item.icon}</ListItemIcon>
//             <ListItemText primary={item.text} />
//           </ListItem>
//         ))}
//         <ListItem button onClick={handleSignOut}>
//           <ListItemIcon>
//             <ExitToAppIcon />
//           </ListItemIcon>
//           <ListItemText primary="Sign Out" />
//         </ListItem>
//       </List>
//     </div>
//   );

//   return (
//     <Box sx={{ display: "flex" }}>
//       <AppBar
//         position="fixed"
//         sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
//       >
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             edge="start"
//             onClick={handleDrawerToggle}
//             sx={{ mr: 2, display: { sm: "none" } }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" noWrap component="div">
//             Admin Dashboard
//           </Typography>
//         </Toolbar>
//       </AppBar>
//       <Box
//         component="nav"
//         sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
//       >
//         <Drawer
//           variant={isMobile ? "temporary" : "permanent"}
//           open={mobileOpen}
//           onClose={handleDrawerToggle}
//           ModalProps={{
//             keepMounted: true,
//           }}
//           sx={{
//             "& .MuiDrawer-paper": {
//               boxSizing: "border-box",
//               width: drawerWidth,
//             },
//           }}
//         >
//           {drawer}
//         </Drawer>
//       </Box>
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           p: 3,
//           width: { sm: `calc(100% - ${drawerWidth}px)` },
//           mt: "64px",
//         }}
//       >
//         <Outlet />
//       </Box>
//     </Box>
//   );
// }

// export default Layout;

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
  Badge,
  Avatar,
  Divider,
  alpha,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Person as PersonIcon,
  ExitToApp as ExitToAppIcon,
  AccountBalanceWallet as CreditCardIcon,
  ShoppingCart as ShoppingCartIcon,
  Notifications as NotificationsIcon,
  AdminPanelSettings as AdminIcon,
} from "@mui/icons-material";

import { useAuth } from "./../authentication/authProvider";

const drawerWidth = 260;

function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notificationCount] = useState(); // Mock notification count
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const location = useLocation();

  const { logout } = useAuth();

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
    { text: "Cards", icon: <CreditCardIcon />, path: "/cards" },
    { text: "Users", icon: <PeopleIcon />, path: "/users" },
    { text: "New Order", icon: <ShoppingCartIcon />, path: "/new-order" },
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

  const handleNotificationClick = () => {
    console.log("Notification clicked!");
    // Add your notification logic here
    navigate("/new-order");
  };

  const handleSignOut = () => {
    logout();
    navigate("/signin");
  };

  const drawer = (
    <Box sx={{ height: "100%", bgcolor: "background.paper" }}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 2,
          bgcolor: alpha(theme.palette.primary.main, 0.05),
        }}
      >
        <Avatar
          sx={{
            bgcolor: theme.palette.primary.main,
            width: 40,
            height: 40,
            mr: 2,
          }}
        >
          <AdminIcon />
        </Avatar>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: theme.palette.primary.main,
          }}
        >
          Admin Panel
        </Typography>
      </Toolbar>
      <Divider />
      <List sx={{ px: 2, py: 1 }}>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => handleNavigation(item.path)}
            selected={location.pathname === item.path}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              "&.Mui-selected": {
                bgcolor: alpha(theme.palette.primary.main, 0.12),
                color: theme.palette.primary.main,
                "& .MuiListItemIcon-root": {
                  color: theme.palette.primary.main,
                },
                "&:hover": {
                  bgcolor: alpha(theme.palette.primary.main, 0.18),
                },
              },
              "&:hover": {
                bgcolor: alpha(theme.palette.primary.main, 0.08),
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 40,
                color:
                  location.pathname === item.path
                    ? theme.palette.primary.main
                    : "inherit",
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{
                fontSize: "0.95rem",
                fontWeight: location.pathname === item.path ? 600 : 400,
              }}
            />
          </ListItem>
        ))}
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <List sx={{ px: 2, py: 1 }}>
        <ListItem
          button
          onClick={handleSignOut}
          sx={{
            borderRadius: 2,
            color: theme.palette.error.main,
            "&:hover": {
              bgcolor: alpha(theme.palette.error.main, 0.08),
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 40, color: theme.palette.error.main }}>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText
            primary="Sign Out"
            primaryTypographyProps={{
              fontSize: "0.95rem",
              fontWeight: 500,
            }}
          />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: "linear-gradient(45deg, #050939,rgba(19, 103, 128, 0.4))",
          color: "text.primary",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                mr: 2,
                display: { sm: "none" },
                color: theme.palette.primary.main,
              }}
            >
              <MenuIcon />
            </IconButton>
            <Avatar
              sx={{
                bgcolor: theme.palette.primary.main,
                width: 36,
                height: 36,
                mr: 2,
                display: { xs: "none", sm: "flex" },
              }}
            >
              <AdminIcon sx={{ fontSize: 20 }} />
            </Avatar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                fontWeight: 700,
                color: theme.palette.primary.main,
                fontSize: { xs: "1.1rem", sm: "1.25rem" },
              }}
            >
              Admin Dashboard
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              onClick={handleNotificationClick}
              sx={{
                color: theme.palette.primary.main,
                "&:hover": {
                  bgcolor: alpha(theme.palette.primary.main, 0.08),
                },
              }}
            >
              <Badge
                badgeContent={notificationCount}
                color="error"
                sx={{
                  "& .MuiBadge-badge": {
                    fontSize: "0.75rem",
                    height: 18,
                    minWidth: 18,
                  },
                }}
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Box>
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
              borderRight: `1px solid ${alpha(theme.palette.divider, 0.12)}`,
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
          bgcolor: alpha(theme.palette.grey[50], 0.3),
          minHeight: "calc(100vh - 64px)",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default Layout;
