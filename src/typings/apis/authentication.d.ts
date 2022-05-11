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
    token: string
    sex?: number
    postion?: string
    state?: boolean
    permission: TPermission
}

declare interface IToken {
    accessToken: string
    refreshToken?: string
}