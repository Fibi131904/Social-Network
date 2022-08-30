import React from 'react'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'

type FormDataType={
    login: string
    password: string
    rememberMe: boolean
}
export const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div><Field placeholder={'Login'} name={'login'} component={'input'} />
            </div>
            <div>
                <Field placeholder={'Password'} name={'password'}component={'input'} />
            </div>
            <div>
                <Field type={'checkbox'} name={'rememberMe'} component={'input'} /> remember me
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}
const LoginReduxForm = reduxForm<FormDataType>({form: 'login'}) (LoginForm)

export const Login = () => {
    const onSubmit =(FormData: FormDataType)=>{
console.log(FormData);

    }
    return <div><h1> LOGIN</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}