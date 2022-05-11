declare interface IAppbarComponentProps {
  toggleOpen: (state: boolean) => void;
  headerName: string;
  isOpen: boolean;
  displayName: string;
  settingCallback: {
    name: string;
    func: () => void;
  }[];
}
