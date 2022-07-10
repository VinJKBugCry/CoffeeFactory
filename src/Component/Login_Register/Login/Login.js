import React, { useState, useEffect } from 'react'
import './Login.css'
import logo from '../../../Image/logo.jpg'
import axios from 'axios'
import Cookie from 'universal-cookie'

const cookie = new Cookie()

function Login(props) {
    const [enteredAccount, setEnteredAccount] = useState('')
    const [enteredPassword, setEnteredPassword] = useState('')

    const [accountWrong, setAccountWrong] = useState(false)
    const [passwordWrong, setPasswordWrong] = useState(false)

    const accountChangeHandler = event => {
        setEnteredAccount(event.target.value);
    }
    const passwordChangeHander = event => {
        setEnteredPassword(event.target.value)
    }

    const handleLogin = (event) => {
        event.preventDefault()
        const object = {
            email: enteredAccount,
            password: enteredPassword
        };
        setAccountWrong(false)
        setPasswordWrong(false)
        axios.post('http://192.168.1.55:3000/tcf/v1/users/login', object).then((res) => {
            cookie.set('JWT', res.data.token, { path: '/' })
            props.callBack(-1, 1)
        }).catch(error => {
            console.log(error)
            setAccountWrong(true)
            setPasswordWrong(true)
        })
    }

    const [logined, setLogined] = useState(0)

    const setClick = (data) => {
        if (data === 4) {
            props.callBack(-1, 1)
        }
        else props.callBack(data, 0)
    }

    useEffect(() => {
        if (cookie.get('JWT')) {
            setLogined(1)
            props.callBack(-1, 1)
        }
    }, [])

    return (
        <form onSubmit={handleLogin} className='Login'>
            <div className='logo'>
                <img src={logo} alt='' />
            </div>
            {logined === 0 && <div className={`input ${accountWrong && 'inputWrong'}`} onChange={accountChangeHandler}>
                <input placeholder='Nhập gmail của bạn' spellCheck='false' />
                {accountWrong && <svg className='wrongIcon' width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_915_635)">
                        <path d="M7.7786 20.8596C11.3909 24.472 17.2477 24.472 20.8601 20.8596C24.4724 17.2473 24.4724 11.3905 20.8601 7.77816C17.2477 4.16581 11.3909 4.16581 7.7786 7.77816C4.16625 11.3905 4.16625 17.2473 7.7786 20.8596Z" fill="#FF0000" />
                        <path d="M7.07151 21.2132C3.17182 17.3135 3.17182 10.9708 7.07151 7.07107C10.9712 3.17137 17.314 3.17137 21.2136 7.07107C25.1133 10.9708 25.1133 17.3135 21.2136 21.2132C17.314 25.1129 10.9712 25.1129 7.07151 21.2132ZM19.7994 8.48528C16.6793 5.36517 11.6041 5.36694 8.48572 8.48528C5.36738 11.6036 5.36562 16.6789 8.48572 19.799C11.6058 22.9191 16.6811 22.9173 19.7994 19.799C22.9178 16.6806 22.9195 11.6054 19.7994 8.48528Z" fill="#FF0000" />
                        <path d="M18.3855 16.9705L11.3145 9.89948L9.90024 11.3137L16.9713 18.3848L18.3855 16.9705Z" fill="white" />
                        <path d="M18.3849 11.3137L16.9707 9.89948L9.89964 16.9705L11.3138 18.3848L18.3849 11.3137Z" fill="white" />
                    </g>
                    <defs>
                        <clipPath id="clip0_915_635">
                            <rect width="20" height="20" fill="white" transform="translate(14.1426) rotate(45)" />
                        </clipPath>
                    </defs>
                </svg>}
            </div>}

            {logined === 0 && <div className={`input ${passwordWrong && 'inputWrong'}`}>
                <input type="password" placeholder='Nhập mật khẩu của bạn' spellCheck='false' onChange={passwordChangeHander} />
                {passwordWrong && <svg className='wrongIcon' width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_915_635)">
                        <path d="M7.7786 20.8596C11.3909 24.472 17.2477 24.472 20.8601 20.8596C24.4724 17.2473 24.4724 11.3905 20.8601 7.77816C17.2477 4.16581 11.3909 4.16581 7.7786 7.77816C4.16625 11.3905 4.16625 17.2473 7.7786 20.8596Z" fill="#FF0000" />
                        <path d="M7.07151 21.2132C3.17182 17.3135 3.17182 10.9708 7.07151 7.07107C10.9712 3.17137 17.314 3.17137 21.2136 7.07107C25.1133 10.9708 25.1133 17.3135 21.2136 21.2132C17.314 25.1129 10.9712 25.1129 7.07151 21.2132ZM19.7994 8.48528C16.6793 5.36517 11.6041 5.36694 8.48572 8.48528C5.36738 11.6036 5.36562 16.6789 8.48572 19.799C11.6058 22.9191 16.6811 22.9173 19.7994 19.799C22.9178 16.6806 22.9195 11.6054 19.7994 8.48528Z" fill="#FF0000" />
                        <path d="M18.3855 16.9705L11.3145 9.89948L9.90024 11.3137L16.9713 18.3848L18.3855 16.9705Z" fill="white" />
                        <path d="M18.3849 11.3137L16.9707 9.89948L9.89964 16.9705L11.3138 18.3848L18.3849 11.3137Z" fill="white" />
                    </g>
                    <defs>
                        <clipPath id="clip0_915_635">
                            <rect width="20" height="20" fill="white" transform="translate(14.1426) rotate(45)" />
                        </clipPath>
                    </defs>
                </svg>}
            </div>}
            {logined === 0 && <div>
                <button className='loginButton'>Đăng nhập</button>
            </div>}
            {logined === 0 && <div className='createAccount'>
                <p>Bạn chưa có tài khoản? </p>
                <p style={{ color: 'red', fontWeight: '700' }} onClick={() => setClick(2)}>Tạo tài khoản</p>
            </div>}
            {logined === 0 && <div className='forgetPassword' onClick={() => setClick(3)}>Quên mật khẩu?</div>}
            {logined === 0 && <div className='icon'>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_915_610)">
                        <path d="M9.11602 1.03746e-06L10.8848 1.83588L3.01914 10L10.8848 18.1641L9.11601 20L0.366014 10.9179C-0.121486 10.4119 -0.121486 9.59131 0.366014 9.08206L9.11602 1.03746e-06Z" fill="black" />
                        <path d="M1.25 11.2974L20 11.2974L20 8.70256L1.25 8.70256L1.25 11.2974Z" fill="black" />
                    </g>
                    <defs>
                        <clipPath id="clip0_915_610">
                            <rect width="20" height="20" fill="white" transform="translate(20 20) rotate(-180)" />
                        </clipPath>
                    </defs>
                </svg>
            </div>}
            {(accountWrong || passwordWrong) && <div className='wrongInputLogin'>Tài khoản hay mật khẩu của bạn không đúng.</div>}

            {logined === 1 && <div className='logined'>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h1>Bạn đã đăng nhập thành công </h1>
            </div>}
            {logined === 1 && <div onClick={() => setClick(4)} className='returnButton'>
                <p>Trở lại</p>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
            </div>}
        </form>
    )
}

export default Login