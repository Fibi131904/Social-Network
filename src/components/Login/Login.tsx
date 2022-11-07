import React from 'react'
import { Button, Checkbox, Input, Space } from 'antd'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from '../../redux/auth-reducer'
import { AppStateType } from '../../redux/redux-store'
import charcter from '../../assets/img/charcter.png'
import styles from './Login.module.css';




type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
    captcha?: string
}

export const LoginForm = () => {
    const captchaUrl = useSelector<AppStateType, string | null>((state) => state.auth.captchaUrl)
    const isAuth = useSelector<AppStateType, boolean>((state) => state.auth.isAuth)
    const dispath = useDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
            captchaUrl: ''
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {// проверка email
                errors.email = 'Invalid email address';
            } if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 3) {
                errors.password = 'Invalid password';
            }
            return errors;
        },

        onSubmit: ({ email, password, rememberMe, captchaUrl }) => {
            dispath(login(email, password, rememberMe, captchaUrl))

        },
    })

    if (isAuth) {
        return <Redirect to={'/profile'} />
    }
    return (
        <div className={styles.loginContainer} >
            <div className={styles.loginWelcom} >

                <div>
                    <img src={charcter} className={styles.img} alt='' />
                    <h1>Welcome back!</h1>
                </div>
            </div>

                <div className={styles.loginForm}>
                    
                        <div className={styles.loginDiscription}>
                           <div className={styles.loginTitle} >
                            <h2 >Login</h2>
                            </div> 
                            <p>To log in get registered
                                <a href={'https://social-network.samuraijs.com/'}
                                    target={'_blank'} rel="noopener noreferrer"> here
                                </a>
                            </p>
                            <p>or use common test account credentials:</p>
                            <p>Email: free@samuraijs.com</p>
                            <p>Password: free</p>
                        </div>


                        <form onSubmit={formik.handleSubmit} className={styles.loginFormik}>
                            <Space direction="vertical">
                           
                                <Input placeholder='Login'
                                    {...formik.getFieldProps('email')}
                                />
                                 
                                {formik.touched.email && formik.errors.email ? <div style={{ color: 'red' }}>{formik.errors.email}</div> : null}
                                <Input.Password placeholder="password"
                                    {...formik.getFieldProps('password')}
                                />
                                {formik.touched.password && formik.errors.password && <div style={{ color: 'red' }}>{formik.errors.password}</div>}
                              <div>
                                    <Checkbox
                                        checked={formik.values.rememberMe}
                                        {...formik.getFieldProps('rememberMe')}
                                    />Remember me
                               </div>

                                {captchaUrl && <img src={captchaUrl} alt={'captcha'} />}
                                {captchaUrl && <input  {...formik.getFieldProps('captchaUrl')}
                                />}
                                <div className={styles.loginButton}>
                                    <Button type={'primary'} htmlType='submit' shape={'default'}>
                                        Login
                                    </Button>
                                </div>
                            </Space>
                        </form>



                   
                </div>
            
        </div>
    )

}