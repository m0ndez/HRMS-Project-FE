
declare type TMenuConstants = {
    [key in string]: IMenuConstants;
  };
  
declare interface IMenuConstants {
    permission: TPermission | "";
    label: string;
    icon: JSX.Element;
    path?: string;
    nestingList: {
      categoryHeader?: string;
      label: string;
      icon: JSX.Element;
      path: string;
    }[];
  }
  