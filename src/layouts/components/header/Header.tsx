import { FaHeart } from "react-icons/fa6";
import { IoHome, IoPersonSharp } from "react-icons/io5";
import { MdLanguage } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import './Header.scss';
import InputSearch from "../inputSearch/InputSearch";
import logo from '../../../img/logo.jpg';

const Header = () => {
  const navigate = useNavigate()
    return (
        <div className="app">
          <div className="wrapper">
            <div className="site_header">
              <div className="header_logo">
                <Link to={"/"}>
                  <div>
                  <img
                    style={{ width: "100px", borderRadius: "38px" }}
                    src={logo}
                    alt="logo"
                  />
                  </div>
                </Link>
              </div>
              <InputSearch />
              <div className="header_custom">
                <div className="home">
                  <span className="icon_home">
                    <IoHome />
                  </span>
                  <h4 style={{ fontSize: "13px", marginTop: "16px" }}>
                    Hệ thống khách sạn
                  </h4>
                </div>
                <div className="icon_admin">
                    <span onClick={() => navigate('/login')}>
                      <IoPersonSharp />
                    </span>
                    <div className='profile'>
                      <div className='profile_info'>Xem thông tin cá nhân </div>
                      <div className='changePassword'onClick={() => navigate('/change-password')}>Đổi mật khẩu</div>
                      <div className='logout'>Đăng xuất</div>
                    </div>
                  </div>
                <div className="icon_heart">
                  <span>
                    <FaHeart />
                  </span>
                </div>
                <div className="icon_language">
                  <span>
                    <MdLanguage />
                  </span>
                </div>
                <div className="book_btn">
                  <a className="popup-with-form" href="#test-form">
                    Book A Room
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="header_item">
            <div className="header_item1">
              <ul className="header_item1_menu">
                <Link to={"/"} style={{textDecoration:'none'}}>
                  <li>Trang Chủ</li>
                </Link>
                <li>Phòng</li>
                <li>Ưu đãi</li>
                <li>Tin Tức</li>
                <li>Liên Hệ</li>
                <li>Khác</li>
              </ul>
            </div>
            <div className="header_item2">
              <ul className="header_item2_menu">
                <div onClick={() => navigate('.//veAiHotel')}>
                  <li>Về AiHotel</li>
                </div>
                <li>Blog</li>
              </ul>
            </div>
          </div>
        </div>
      );
}

export default Header