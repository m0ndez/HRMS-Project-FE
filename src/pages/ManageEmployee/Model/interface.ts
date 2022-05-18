export const initCategory: IDynamicCategory = {
  createEmployee: {
    name: "createEmployee",
    label: "สร้างพนักงาน",
    pageMode: "create",
  },
  // editLeaveSheet: {
  //   name: "createEmployee",
  //   label: "แก้ไขข้อมูล",
  //   pageMode: "edit",
  // },
};

export const initForm: IDynamicFormModel[] = [
  {
    formCategory: "createEmployee",
    name: "fname",
    type: "text",
    label: "ชื่อ",
    value: "",
    readOnly: false,
    required: true,
    grid: 6,
    autoFocus: true,
  },
  {
    formCategory: "createEmployee",
    name: "lname",
    type: "text",
    label: "นามสกุล",
    value: "",
    readOnly: false,
    required: true,
    grid: 6,
  },
  {
    formCategory: "createEmployee",
    name: "username",
    type: "text",
    label: "รหัสเข้าระบบ",
    value: "",
    readOnly: false,
    required: true,
    grid: 6,
  },
  {
    formCategory: "createEmployee",
    name: "password",
    type: "password",
    label: "รหัสผ่าน",
    value: "",
    readOnly: false,
    required: true,
    grid: 6,
  },
  {
    formCategory: "createEmployee",
    label: "ตำแหน่ง",
    name: "position",
    type: "select",
    value: "",
    readOnly: false,
    required: true,
    grid: 12,
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
  },
  {
    formCategory: "createEmployee",
    name: "tel",
    type: "text",
    label: "เบอร์โทร",
    value: "",
    readOnly: false,
    required: true,
    grid: 8,
  },
  {
    formCategory: "createEmployee",
    name: "tel",
    type: "radio",
    label: "เพศ",
    value: "",
    readOnly: false,
    required: true,
    grid: 4,
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
  },
  {
    formCategory: "createEmployee",
    name: "address",
    type: "textarea",
    label: "ที่อยู่",
    value: "",
    readOnly: false,
    required: true,
    grid: 12,
  },
];
