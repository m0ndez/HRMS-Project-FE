declare interface IDynamicFormModel {
  formCategory: string;
  label: string;
  name: string;
  value: string | number | boolean | Date;
  type: string;
  required: boolean;
  readOnly: boolean;
  options?: IDynamicOptions<optionType>[];
  preflixIcon?: JSX.Element;
  postflixIcon?: JSX.Element;
  grid?: number;
  hideLabel?: boolean;
  compareValue?: string;
  duplicateCheck?: string;
  minLength?: number;
  maxLength?: number;
  numberMin?: number;
  numberMax?: number;
  minDateKey?: string;
  maxDateKey?: string;
  autoFocus?: boolean;
  pattern?: RegExp;
  patternMsg?: string;
  switchLabel?: string[];
}

declare interface IDynamicOptions {
  label: string;
  value: string | boolean | number;
}

declare type IDynamicCategory = {
  [key in string]: {
    name: string;
    label: string;
    pageMode?: string;
  };
};

declare type IDynamicWorkPosition =
  | "Account"
  | "HR"
  | "Software Tester"
  | "Dev Frond-End"
  | "Dev Back-End"
  | "Senior Dev Frond-End"
  | "Senior Dev Back-End"
  | "Senior Software Tester";
