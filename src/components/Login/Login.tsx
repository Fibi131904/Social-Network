import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { login } from '../../redux/auth-reducer'
import { AppStateType } from '../../redux/redux-store'
import { required } from '../../utils/validators/validators'
import { Input } from '../common/FormsControls/FormsControls'
import style from '../Login/Login.module.css'

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
   
}
type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean) => void
}

type MapStatePropsType = {
    isAuth: boolean
 
}
export const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit} >
            <div>
                <Field placeholder={'Email'} name={'email'} component={Input}
                    validate={[required]} />
            </div>
            <div>
                <Field placeholder={'Password'} name={'password'} component={Input} type={'password'}
                    validate={[required]} />
            </div>
            <div>
                <Field type={'checkbox'} name={'rememberMe'} component={Input}
                    validate={[required]} /> remember me

            </div>


           {props.error && <div className={style.formSummaryEerror}>
                {props.error}
            </div>
}
            <div>
                <button >Login</button>
            </div>
        </form>
    )
}
const LoginReduxForm = reduxForm<FormDataType>({ form: 'login' })(LoginForm)



export const Login = (props: MapDispatchPropsType & MapStatePropsType) => {
    const onSubmit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe);

    }
    if (props.isAuth) {
        return <Redirect to={'/profile'} />
    }
    return (
        <div className={style.loginPage}>
            <h1> LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    )
}
const mapStateToProps = (state: AppStateType) => {
    return {
       
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps, { login })(Login)