import { Dispatch } from "redux";
import { loaderAction } from "reduxs/loader/actionCreators";
import { loginAction, tokenAction } from "./actionCreators";
import { loginState } from "./constants";
import { fetchLogin } from "./services";
import cryptoJs from "crypto-js";

const login = (body: IRequestAuthentication) => async (dispatch: Dispatch) => {
  dispatch(loginAction.request({}));
  dispatch(loaderAction(true));
  await fetchLogin({
    ...body,
    password: cryptoJs.AES.encrypt(
      body.password,
      import.meta.env.VITE_SECRET_KEY
    ).toString(),
  })
    .then((response) => {
      const { data } = response;
      dispatch(loaderAction(false));
      dispatch(loginAction.success(data));
      // Handle Token
      setToken({ token: response.data.data.token })(dispatch);
    })
    .catch((error: IResponse<IResponseAuthentication>) => {
      const errorHandler = {
        ...error,
        data: loginState.data,
      };
      dispatch(loaderAction(false));
      console.log("Response From Action", errorHandler);
      dispatch(loginAction.failure(errorHandler));
    })
    .finally(() => dispatch(loaderAction(false)));
};

const logout = () => async (dispatch: Dispatch) => {
  dispatch(loginAction.cancel({}));
};

const setToken = (TokenData: IToken) => (dispatch: Dispatch) => {
  dispatch(tokenAction(TokenData));
};

export { login, logout };
