export const initCategory: IDynamicCategory = {
  changePassword: {
    name: "changePassword",
    label: "แก้ไขรหัสผ่าน",
  },
};

export const initForm: IDynamicFormModel[] = [
  {
    formCategory: "changePassword",
    label: "รหัสผ่านเดิม",
    name: "oldPassword",
    type: "password",
    value: "",
    readOnly: false,
    required: true,
    grid: 12,
  },
  {
    formCategory: "changePassword",
    label: "รหัสผ่านใหม่",
    name: "newPassword",
    type: "password",
    value: "",
    readOnly: false,
    required: true,
    duplicateCheck: "oldPassword",
    minLength: 5,
    grid: 12,
  },
  {
    formCategory: "changePassword",
    label: "ยืนยันรหัสผ่านใหม่",
    name: "confirmPassword",
    type: "password",
    value: "",
    readOnly: false,
    required: true,
    compareValue: "newPassword",
    minLength: 5,
    grid: 12,
  },
];
