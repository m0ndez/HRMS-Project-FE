declare interface ReducerState<T> {
    isFetching: boolean
    data: T
    error: string
    code: number
    // status: number
}

declare interface RootReducers {
    authentication: IAuthenticationStore
    loader: ILoaderStore

}