import { object, string } from 'yup'
import { ObjectShape } from 'yup/lib/object'


const constant = {
    usernameStr: 'Username is required',
    passwordStr: 'Password is required',
}

const scheme = object().shape<ObjectShape>({
    username: string().required(constant.usernameStr),
    password: string().required(constant.passwordStr)
})

export default scheme