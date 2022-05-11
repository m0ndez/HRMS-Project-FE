import * as React from "react";
import { Fragment, FunctionComponent, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Collapse, ListItemButton } from "@mui/material";
import { Appbar, DrawerListItem } from "components";
import { debounce, get, isEmpty } from "lodash";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { LIST_MENUS } from "constants/listMenus";
const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const Layout: FunctionComponent<
  Props & ILayoutPageProps & ILayoutActionProps
> = ({ authenData, window, logout }) => {
  const currentLocation = useLocation();
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [isCollapse, setCollapse] = useState<{ [key in string]: boolean }>({});

  useEffect(() => {
    initMenuCollapse();
    return () => {
      setCollapse({});
    };
  }, []);

  const initMenuCollapse = () => {
    try {
      const tempVal: { [key in string]: boolean } = {};
      Object.keys(LIST_MENUS).forEach((dl) => {
        tempVal[dl] = true;
      });
      setCollapse(tempVal);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleMenuCollapse = (cateMenu: string) => {
    const createCollapse = {
      ...isCollapse,
      [cateMenu]: !isCollapse![cateMenu],
    };
    setCollapse(createCollapse);
  };

  const handleDrawerToggle = (manual?: boolean) => {
    setMobileOpen(!manual ? !mobileOpen : false);
  };

  const handleNavigate = (path?: string, manual?: boolean) => {
    if (path) {
      debounce(() => {
        handleDrawerToggle(manual);
      }, 128)();
      navigate(path);
    } else {
      return;
    }
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleInitMenuByPermission = (): TMenuConstants => {
    let converted: TMenuConstants = {};
    Object.keys(LIST_MENUS).forEach((headerItem) => {
      if (
        ["", authenData.permission].includes(LIST_MENUS[headerItem].permission)
      ) {
        converted[headerItem] = { ...LIST_MENUS[headerItem] };
      }
    });
    return converted;
  };

  const handleLogout = () => {
    logout()
    handleNavigate('/login', true)
  };

  return (
    <Appbar
      displayName={[authenData.fname, authenData.lname].join(" ")}
      headerName="Example Company"
      isOpen={mobileOpen}
      toggleOpen={handleDrawerToggle}
      settingCallback={[
        {
          name: "จัดการผู้ใช้",
          func: () => {
            handleNavigate("/report/employee", true);
          },
        },
        {
          name: "ออกจากระบบ",
          func: () => {
            handleLogout();
          },
        },
      ]}
    >
      {/* Role Handle */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="menu folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        {/* Mobile */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={() => handleDrawerToggle()}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <DrawerListItem
            collapState={isCollapse}
            collapseCB={handleMenuCollapse}
            currentPath={currentLocation.pathname}
            menuConstants={handleInitMenuByPermission()}
            navigateCB={handleNavigate}
          />
        </Drawer>
        {/* Desktop */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          <DrawerListItem
            collapState={isCollapse}
            collapseCB={handleMenuCollapse}
            currentPath={currentLocation.pathname}
            menuConstants={handleInitMenuByPermission()}
            navigateCB={handleNavigate}
          />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Appbar>
  );
};

export default Layout;
