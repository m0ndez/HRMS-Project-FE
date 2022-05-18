export const initCategory: IDynamicCategory = {
  createLeaveSheet: {
    name: "createLeaveSheet",
    label: "บันทึกข้อมูล",
    pageMode: "create",
  },
  editLeaveSheet: {
    name: "createLeaveSheet",
    label: "แก้ไขข้อมูล",
    pageMode: "edit",
  },
};

export const initForm: IDynamicFormModel[] = [
  {
    formCategory: "createLeaveSheet",
    name: "leaveStart",
    type: "date",
    label: "วันที่เริ่มต้นลางาน",
    value: "",
    readOnly: false,
    required: true,
    grid: 6,
    autoFocus: true
  },
  {
    formCategory: "createLeaveSheet",
    name: "leaveEnd",
    type: "date",
    label: "ถึงวันที่",
    value: "",
    readOnly: false,
    required: true,
    grid: 6,
    minDateKey: "leaveStart",
  },
  {
    formCategory: "createLeaveSheet",
    name: "leaveRemark",
    type: "select",
    label: "หมายเหตุการลา",
    value: "",
    readOnly: false,
    required: true,
    grid: 12,
    options: [
      {
        label: "ลากิจ",
        value: "1",
      },
      {
        label: "ลาป่วย",
        value: "2",
      },
      {
        label: "ลาครึ่งวัน",
        value: "3",
      },
    ],
  },
];
