import { Link } from "react-router-dom";
import Header from "../../../layouts/components/header/Header";
import Footer from "../../../layouts/footer/Footer";
import './Login.scss'
const Login = () => {

    return (
        <>
          <Header/>
          <div className="wrapper-top">
            <div className="container_top">
              <h1 className="text-center">Đăng nhập</h1>
              <div className="top">
                <input type="text" placeholder="Email của bạn" />
                <input type="password" placeholder="Nhập mật khẩu" />
                <button type="submit">Đăng Nhập</button>
                <p>
                  Bạn chưa có tài khoản? Vui lòng đăng ký Tài khoản mới
                  <Link to={"/singUp"}>
                    <span>tại đây</span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <Footer/>
        </>
      );
}
export default Login