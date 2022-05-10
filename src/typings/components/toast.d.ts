declare type TToastTypes = 'success' | 'info' | 'warning' | 'error'
declare type TToastAnchorVertival = 'top' | 'bottom'
declare type TToastAnchorHoeizontal = 'left' | 'center' | 'right'

declare interface IToastComponentProps {
    anchorOrigin?: {
        vertical: TToastAnchorVertival;
        horizontal: TToastAnchorHoeizontal;
    };
    toastType?: TToastTypes;
    toastMessage?: string;
    toastDuration?: number;
    open: boolean
}