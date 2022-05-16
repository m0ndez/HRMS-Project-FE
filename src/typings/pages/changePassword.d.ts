declare interface IChangePasswordPageProps {
    authenData: IResponseAuthentication
}

declare interface IChangePasswordPageActionProps {
    changePassword: (body: IRequestChangePassword) => void
}

declare interface IChangePasswordForm {
    oldPassword: string
    newPassword: string
    confirmPassword: string
}