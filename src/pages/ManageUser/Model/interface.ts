import { THAI_PHONE_NUMER } from "constants/regex";

export const initManageUserFormCategory: IDynamicCategory = {
  user: {
    name: "user",
    label: "แก้ไขข้อมูลผู้ใช้",
  },
};
export const initManageAdminForm: IDynamicFormModel[] = [
  {
    formCategory: "user",
    label: "ชื่อ",
    name: "fname",
    type: "text",
    value: "",
    readOnly: false,
    required: true,
    grid: 12,
  },
  {
    formCategory: "user",
    label: "สกุล",
    name: "lname",
    type: "text",
    value: "",
    readOnly: false,
    required: true,
    grid: 12,
  },
  {
    formCategory: "user",
    label: "เบอร์โทรศัพท์",
    name: "tel",
    minLength: 9,
    maxLength: 10,
    type: "text",
    pattern: THAI_PHONE_NUMER,
    value: "",
    readOnly: false,
    required: true,
    grid: 12,
  },
  {
    formCategory: "user",
    label: "ที่อยู่",
    name: "address",
    type: "textarea",
    value: "",
    readOnly: false,
    required: true,
    grid: 12,
  },
];

export const initManageUserForm: IDynamicFormModel[] = [
  {
    formCategory: "user",
    label: "ชื่อ",
    name: "fname",
    type: "text",
    value: "",
    readOnly: false,
    required: true,
    grid: 12,
  },
  {
    formCategory: "user",
    label: "สกุล",
    name: "lname",
    type: "text",
    value: "",
    readOnly: false,
    required: true,
    grid: 12,
  },
  {
    formCategory: "user",
    label: "เบอร์โทรศัพท์",
    name: "tel",
    type: "text",
    value: "",
    readOnly: false,
    required: true,
    grid: 12,
  },
  {
    formCategory: "user",
    label: "ที่อยู่",
    name: "address",
    type: "textarea",
    value: "",
    readOnly: false,
    required: true,
    grid: 12,
  },
  {
    formCategory: "user",
    label: "เพศ",
    name: "sex",
    type: "radio",
    value: "",
    readOnly: false,
    required: true,
    options: [
      {
        label: "ชาย",
        value: "1",
      },
      {
        label: "หญิง",
        value: "2",
      },
    ],
    grid: 12,
  },
  {
    formCategory: "user",
    label: "ตำแหน่ง",
    name: "position",
    type: "select",
    value: "",
    readOnly: false,
    required: true,
    options: [
      {
        label: "บัญชี",
        value: "Account",
      },
      {
        label: "ฝ่ายบุคคล",
        value: "HR",
      },
      {
        label: "โปรแกรมเมอร์ Front-End",
        value: "Dev Frond-End",
      },
      {
        label: "โปรแกรมเมอร์ Back-End",
        value: "Dev Back-End",
      },
      {
        label: "ซอร์ฟแวร์เทสเตอร์",
        value: "Software Tester",
      },
      {
        label: "หัวหน้า โปรแกรมเมอร์ Front-End",
        value: "Senior Dev Frond-End",
      },
      {
        label: "หัวหน้า โปรแกรมเมอร์ Back-End",
        value: "Senior Dev Back-End",
      },
      {
        label: "หัวหน้า ซอร์ฟแวร์เทสเตอร์",
        value: "Senior Software Tester",
      },
      {
        label: "โปรแกรมเมอร์",
        value: "Programmer",
      },
    ],
    grid: 12,
  },
];
