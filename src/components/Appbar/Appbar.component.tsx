import * as React from "react";
import {
  Box,
  styled,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Tooltip,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const constants = {
  openSetting: "จัดการผู้ใช้",
};
const settings = ["Profile", "Account", "Dashboard", "Logout"];

export default (({
  children,
  headerName,
  isOpen,
  toggleOpen,
  displayName,
  settingCallback,
}) => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleDrawerToggle = () => {
    toggleOpen(isOpen);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const stringToColor = (string: string) => {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  };

  const stringAvatar = (name: string) => {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: (
        <Typography
          variant="button"
          children={`${name.split(" ")[0][0]}${name.split(" ")[1][0]}`}
        />
      ),
    };
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                {headerName}
              </Typography>
            </Toolbar>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Toolbar disableGutters>
              <Typography variant="body1" noWrap component="div" sx={{ display: { xs: "none", sm: "block" } }}>
                {displayName}
              </Typography>
              <Tooltip title={constants.openSetting}>
                <IconButton onClick={handleOpenUserMenu}>
                  <Avatar {...stringAvatar(displayName)} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settingCallback.map((setting, key) => (
                  <MenuItem
                    key={`menu-${key}`}
                    onClick={() => {
                      handleCloseUserMenu();
                      setting.func();
                    }}
                  >
                    <Typography textAlign="center">{setting.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Toolbar>
          </Box>
        </Toolbar>
      </AppBar>
      {children}
    </Box>
  );
}) as React.FunctionComponent<IAppbarComponentProps>;
