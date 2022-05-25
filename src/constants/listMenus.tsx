import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import GroupIcon from "@mui/icons-material/Group";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SyncLockIcon from "@mui/icons-material/SyncLock";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
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
    icon: <ManageAccountsIcon />,
    label: "ข้อมูลผู้ใช้",
    nestingList: [
      {
        label: "จัดการข้อมูล",
        icon: <ContactMailIcon />,
        path: "/user",
      },
      {
        label: "เปลี่ยนรหัสผ่าน",
        icon: <SyncLockIcon />,
        path: "/changepassword",
      },
    ],
  },
  management: {
    permission: "admin",
    icon: <ManageAccountsIcon />,
    label: "การจัดการ",
    nestingList: [
      {
        label: "พนักงาน",
        icon: <PeopleAltRoundedIcon />,
        path: "/manage/employees",
      },
      {
        label: "อนุมัติการลางาน",
        icon: <AssignmentTurnedInIcon />,
        path: "/manage/leave-approve",
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
        icon: <AssessmentRoundedIcon />,
        path: "/report/employees",
      },
      // {
      //   label: "รายงานการลางาน",
      //   icon: <AssessmentRoundedIcon />,
      //   path: "/report/leaves",
      // },
    ],
  },
};
