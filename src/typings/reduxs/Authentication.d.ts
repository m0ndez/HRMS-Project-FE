declare interface IAuthenticationStore {
    login: ReducerState<IResponseAuthentication>
    token: IToken
}