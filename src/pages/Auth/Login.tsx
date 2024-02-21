import {useState} from "react";
import {authActions} from "../../redux/slices/auth.slice";
import {useDispatch} from "react-redux";
import './Login.scss'
import { Link, useNavigate } from "react-router-dom";


const Login = () => {
    const navigate = useNavigate()
    const [inputLogin, setInputLogin] = useState({
        email: '',
        password: '',
    })
    const dispatch = useDispatch();

    const handleLogin = () => {
        dispatch({
            type: `${authActions.loginPending.type}_saga`,
            payload: {
                email: inputLogin.email,
                password: inputLogin.password,
            }
        })
    }
    return (
        <>
            {/* <input placeholder={'email'} onChange={e => setInputLogin({
                ...inputLogin,
                email: e.target.value,
            })}/>
            <input placeholder={'password'} onChange={e => setInputLogin({
                ...inputLogin,
                password: e.target.value,
            })}/>
            <button onClick={handleLogin}>login</button> */}
             <div className="wrapper-top">
            <div className="container_top">
              <h1 className="text-center">Đăng nhập</h1>
              <div className="top">
                <input type="text" placeholder="Email của bạn" onChange={e => setInputLogin({
                ...inputLogin,
                email: e.target.value,
            })} />
                <input type="password" placeholder="Nhập mật khẩu"  onChange={e => setInputLogin({
                ...inputLogin,
                password: e.target.value,
            })}/>
                <p className="forgot_password" onClick={() => navigate('/sendEmail')}>
                Forgot Password ?
                </p>
                <button type="submit" onClick={handleLogin}>Đăng Nhập</button>
                <p className="sing_up">
                  Bạn chưa có tài khoản? Vui lòng đăng ký Tài khoản mới
                  <Link to={"/singUp"}>
                    <span>tại đây</span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
            <div>admin@gmail.com</div>
            <div>Admin@123</div>
        </>
    )
}

export default Login;