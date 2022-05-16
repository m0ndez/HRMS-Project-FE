import { Dispatch } from "redux";
import { editUserAction } from "./actionCreators";
import { loaderAction } from "reduxs/loader/actionCreators";
import { putUser, putChangPassowrd } from "./services";
import { loginAction } from "reduxs/authentication/actionCreators";
import { toastAction } from "reduxs/toast/actionCreator";
import cryptoJs from "crypto-js";

const updateUser = (body: IRequestEditUser) => async (dispatch: Dispatch) => {
  dispatch(loaderAction(true));
  dispatch(editUserAction.request({}));
  await putUser(body)
    .then((response) => {
      const { data } = response;
      dispatch(loginAction.success(data));
      dispatch(
        editUserAction.success({
          ...data,
          data: null,
        })
      );
      dispatch(loaderAction(false));
      dispatch(
        toastAction({
          open: true,
          toastType: "success",
          toastMessage: data.devMessage,
          toastDuration: 1500,
        })
      );
    })
    .catch((error: IResponse<null>) => {
      dispatch(loaderAction(false));
      dispatch(editUserAction.failure(error));
      dispatch(
        toastAction({
          open: true,
          toastType: "error",
          toastMessage: error.message || error.devMessage,
          toastDuration: 3000,
        })
      );
    })
    .finally(() => dispatch(loaderAction(false)));
};

const changePassword =
  (body: IRequestChangePassword) => async (dispatch: Dispatch) => {
    dispatch(loaderAction(true));
    const prepareData: IRequestChangePassword = {
      ...body,
      newPassword: cryptoJs.AES.encrypt(
        body.newPassword,
        import.meta.env.VITE_SECRET_KEY
      ).toString(),
    };
    await putChangPassowrd(prepareData)
      .then((response) => {
        const { data } = response;
        dispatch(
          editUserAction.success({
            ...data,
            data: null,
          })
        );
        dispatch(
          toastAction({
            open: true,
            toastType: "success",
            toastMessage: data.devMessage,
            toastDuration: 1500,
          })
        );
        dispatch(loaderAction(false));
      })
      .catch((error: IResponse<null>) => {
        dispatch(
          toastAction({
            open: true,
            toastType: "error",
            toastMessage: error.message || error.devMessage,
            toastDuration: 3000,
          })
        );
        dispatch(loaderAction(false));
      })
      .finally(() => dispatch(loaderAction(false)));
  };

export { updateUser, changePassword };
