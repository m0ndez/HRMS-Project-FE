
export const TOAST_ACTION = 'TOAST_ACTION'

export const toastState: IToastStore = {
    openToast: {
        anchorOrigin: {
            horizontal: "right",
            vertical: "bottom",
        },
        toastType: "success",
        toastMessage: "Success !",
        toastDuration: 6000,
        open: false,
    }
}