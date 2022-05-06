declare interface IRequestAuthentication {
    username: string
    password: string
    permission: string
}

declare interface IResponseAuthentication {
    id: string
    firstname: string
    lastname: string
    address: string
    tel: string
    token: string
    sex?: string
    postion?: string
    state?: boolean
}

declare interface IToken {
    accessToken: string
    refreshToken?: string
}