declare interface IManageUserPageProps {
  authenData: IResponseAuthentication;
  updateUserCode: number
  updateUserError: string
  updateUserIsFetching: boolean
}

declare interface IManageUserActionProps {
  updateUser: (body: IRequestEditUser) => void
  openToast: (state: IToastComponentProps) => void
}

declare interface IManageUserForm {
  fname: string;
  lname: string;
  address: string;
  tel: string;
  sex: number;
  position: string;
  password?: string;
}
