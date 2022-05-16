import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import GroupIcon from "@mui/icons-material/Group";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import DashboardIcon from "@mui/icons-material/Dashboard";

export const LIST_MENUS: TMenuConstants = {
  dashboard: {
    permission: "",
    icon: <DashboardIcon />,
    label: "หน้าหลัก",
    nestingList: [],
    path: "/",
  },
  timesheet: {
    permission: "",
    icon: <WorkHistoryIcon />,
    label: "ยืนยันการทำงาน",
    nestingList: [
      {
        label: "บันทึกเวลางาน",
        icon: <BorderColorIcon />,
        path: "/timesheet",
      },
      {
        label: "บันทึกการลางาน",
        icon: <AvTimerIcon />,
        path: "/leavesheet",
      },
    ],
  },
  users: {
    permission: "",
    icon: <GroupIcon />,
    label: "ข้อมูลผู้ใช้",
    nestingList: [
      {
        label: "จัดการข้อมูล",
        icon: <ContactPageIcon />,
        path: "/user",
      },
      {
        label: "เปลี่ยนรหัสผ่าน",
        icon: <ContactPageIcon />,
        path: "/changepassword",
      },
    ],
  },
  management: {
    permission: "admin",
    icon: <GroupIcon />,
    label: "การจัดการ",
    nestingList: [
      {
        label: "พนักงาน",
        icon: <ContactPageIcon />,
        path: "/manage/employees",
      },
    ],
  },
  report: {
    permission: "admin",
    icon: <GroupIcon />,
    label: "รายงาน",
    nestingList: [
      {
        label: "รายงานพนักงาน",
        icon: <ContactPageIcon />,
        path: "/report/employees",
      },
      {
        label: "รายงานการลางาน",
        icon: <ContactPageIcon />,
        path: "/report/leaves",
      },
    ],
  },
};
