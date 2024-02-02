import {useState} from "react";
import {authActions} from "../../redux/slices/auth.slice";
import {useDispatch} from "react-redux";

const Login = () => {
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
            <input placeholder={'email'} onChange={e => setInputLogin({
                ...inputLogin,
                email: e.target.value,
            })}/>
            <input placeholder={'password'} onChange={e => setInputLogin({
                ...inputLogin,
                password: e.target.value,
            })}/>
            <button onClick={handleLogin}>login</button>
            <div>admin@gmail.com</div>
            <div>Admin@123</div>
        </>
    )
}

export default Login;