declare interface IDrawerComponentProps {
    width: number
}


declare interface IDrawerListItemProps {
    menuConstants: TMenuConstants;
    collapseCB: (listCate: string) => void;
    navigateCB: (path?: string) => void;
    currentPath: string;
    collapState: { [key in string]: boolean };
  }