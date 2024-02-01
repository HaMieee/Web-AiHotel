import Header from "../../../layouts/components/header/Header";
import Footer from "../../../layouts/footer/Footer";
import { Link } from "react-router-dom";
import './SingUp.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

const SingUp = () => {
    return (
        <>
          <Header/>
          <div className="wrapper-top">
            <div className="top-header">
              <h2 className="text">Đăng Ký Tài Khoản</h2>
              <input type="text" placeholder="Họ tên(*)" />
              <input type="text" placeholder="SĐT(*)" />
              <input type="email" placeholder="Email(*)" />
              <input type="password" placeholder="Nhập mật khẩu(*)" />
              <input type="password" placeholder="Nhập lại mật khẩu(*)" />
              <div className="btn_group">
                <Link to={"/login"}>
                  <span>Về trang đăng nhập</span>
                </Link>
                <button type="submit">Đăng ký</button>
              </div>
            </div>
          </div>
          <Footer/>
        </>
      );
}
export default SingUp