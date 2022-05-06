
export interface IOptionsModel {
    label: string
    value: string | boolean | number
}
export interface ILoginModel {
    formCategory: string
    label: string
    name: string
    value: string
    type: string
    required: boolean
    readOnly: boolean
    options?: IOptionsModel[]
}

export type ILoginCategoryModel = {
    [key in string]: {
        name: string
        label: string
    }
}

export const initCategory: ILoginCategoryModel = {
    login: {
        name: 'login',
        label: 'Login'
    }
}


export const initForm: ILoginModel[] = [
    {
        formCategory: 'login',
        label: 'Username',
        name: 'username',
        type: 'text',
        value: '',
        readOnly: false,
        required: true,
    },
    {
        formCategory: 'login',
        label: 'Password',
        name: 'password',
        type: 'password',
        value: '',
        readOnly: false,
        required: true,
    },
    {
        formCategory: 'login',
        label: 'สิทธิการเข้าใช้ระบบ',
        name: 'permission',
        type: 'radio',
        value: '',
        options: [
            {
                label: 'ผู้ดูแลระบบ', value: 'admin'
            },
            {
                label: 'พนักงาน', value: 'employee'
            },
        ],
        readOnly: false,
        required: true,
    },

]