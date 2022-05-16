declare interface IRequestEditUser {
    fname: string;
    lname: string;
    address: string;
    tel: string;
    sex: number;
    position: string;
    password?: string;
    id: string
    permission?: TPermission
}


declare interface IRequestChangePassword {
    currentPassword: string
    newPassword: string
    id: string
}