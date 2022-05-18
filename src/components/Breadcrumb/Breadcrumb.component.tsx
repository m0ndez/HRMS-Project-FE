import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import { Breadcrumbs, Chip, emphasize, styled } from "@mui/material";

const instantceLabel: { [key in string]: string } = {
  report: "รายงาน",
  employees: "รายการพนักงาน",
  leaves: "รายการลางาน",
  user: "ผู้ใช้",
  create: "สร้าง",
  manage: "การจัดการ",
  edit: "แก้ไข",
  changepassword: "เปลี่ยนรหัสผ่าน",
  timesheet: "บันทึกเวลางาน",
  leavesheet: "บันทึกการลางาน",
  "": "หน้าหลัก",
};

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
}) as typeof Chip; // TypeScript only: need a type cast here because https://github.com/Microsoft/TypeScript/issues/26591

export default (({ currentPath, onNavigateCB }) => {
  const initRouteBreadcrumb = (): Array<string> => {
    const routeName = [];
    if (currentPath.split("/").every((f) => f === "")) {
      routeName.push(
        ...currentPath.split("/").splice(currentPath.split("/").length - 1, 1)
      );
    } else {
      routeName.push(...currentPath.split("/"));
    }
    return routeName;
  };

  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 1 }}>
        {initRouteBreadcrumb().map((item, index) => {
          return (
            <StyledBreadcrumb
              icon={
                [""].includes(item) ? <HomeIcon fontSize="small" /> : undefined
              }
              onClick={() =>
                [""].includes(item) ? onNavigateCB(`/${item}`) : undefined
              }
              disabled={![""].includes(item)}
              key={`breadcrumb-item-${index}`}
              label={instantceLabel[item] || item}
            />
          );
        })}
      </Breadcrumbs>
    </div>
  );
}) as React.FunctionComponent<IBreadcrumbComponentProps>;
