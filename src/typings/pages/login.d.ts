declare interface ILoginForm {
    username: string
    password: string
    permission: string
}

declare interface ILoginPageProps {
    authenIsFetching: boolean
    authenError: string
    authenCode: number
}

declare interface ILoginPageActionProps {
    login: (body: IRequestAuthentication) => void
    setLoading: (state: boolean) => void
}


