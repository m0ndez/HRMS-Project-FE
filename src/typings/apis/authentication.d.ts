declare interface IRequestAuthentication {
    username: string
    password: string
    permission: string
}

declare interface IResponseAuthentication {
    id: string
    fname: string
    lname: string
    address: string
    tel: string
    sex?: number
    position?: string
    state?: boolean
    permission: TPermission
}

declare interface IToken {
    token: string
    refreshToken?: string
}