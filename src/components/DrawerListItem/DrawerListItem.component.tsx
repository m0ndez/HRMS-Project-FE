import { ExpandMore, ExpandLess } from "@mui/icons-material";
import {
  Collapse,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { isEmpty, get, noop } from "lodash";
import React, { Fragment } from "react";

export default (({
  menuConstants = {},
  collapState = {},
  collapseCB = () => {
    noop();
  },
  navigateCB = () => {
    noop();
  },
  currentPath = "",
}) => {
  const RenderExpandIcon = ({ expanded }: { expanded: boolean }) =>
    expanded ? <ExpandMore /> : <ExpandLess />;
  return (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {Object.keys(menuConstants).map((listCate, index) => {
          let headerMenu: IMenuConstants = menuConstants[listCate];
          return (
            <Fragment key={`header-${listCate}-${index}`}>
              <ListItemButton
                onClick={() => {
                  collapseCB(listCate);
                  navigateCB(headerMenu.path);
                }}
                selected={[headerMenu.path].includes(currentPath)}
              >
                <ListItemIcon
                  sx={({ palette }) => ({
                    color: [headerMenu.path].includes(currentPath)
                      ? palette.primary.main
                      : palette.action.active,
                  })}
                >
                  {headerMenu.icon}
                </ListItemIcon>
                <ListItemText primary={headerMenu.label} />
                {!isEmpty(menuConstants[listCate].nestingList) && (
                  <RenderExpandIcon
                    expanded={get(collapState, listCate, false)}
                  />
                )}
              </ListItemButton>
              {!isEmpty(menuConstants[listCate].nestingList) ? (
                <Collapse
                  in={get(collapState, listCate, false)}
                  unmountOnExit
                  timeout={"auto"}
                  key={`header-${listCate}-${index}`}
                >
                  <List disablePadding>
                    {headerMenu.nestingList.map((listItem, indexItem) => {
                      listItem.categoryHeader = listCate;
                      return (
                        <ListItemButton
                          sx={{ pl: 4 }}
                          key={`collapse-${listItem.label}-${indexItem}`}
                          selected={[listItem.path].includes(currentPath)}
                          onClick={() => navigateCB(listItem.path)}
                        >
                          <ListItemIcon
                            sx={({ palette }) => ({
                              color: [listItem.path].includes(currentPath)
                                ? palette.primary.main
                                : palette.action.active,
                            })}
                          >
                            {listItem.icon}
                          </ListItemIcon>
                          <ListItemText primary={listItem.label} />
                        </ListItemButton>
                      );
                    })}
                  </List>
                  <Divider />
                </Collapse>
              ) : (
                <Divider />
              )}
            </Fragment>
          );
        })}
      </List>
    </div>
  );
}) as React.FunctionComponent<IDrawerListItemProps>;
