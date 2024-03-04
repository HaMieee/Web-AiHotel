import React, { useState } from 'react';
import { IoHome, IoPersonSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import './Header.scss';
import InputSearch from "../inputSearch/InputSearch";
import logo from '../../../img/logo.jpg';
import {IUser} from "../../../redux/types/user";
import SingUpModal from '../modals/SingUpModal';
import LoginModal from '../modals/LoginModal';
import { isEmpty } from 'lodash';
import { useDispatch } from 'react-redux';
import { authActions } from '../../../redux/slices/auth.slice';

type IHeader = {
  userInfo: IUser;
  isLoginError: boolean;
  isSingUpError: boolean;
}

const Header: React.FC<IHeader> = ({
                                       userInfo = {},
                                       isLoginError = false,
                                       isSingUpError = false
                                   }) => {
  const navigate = useNavigate()
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleChangeModalSignUp = () => {
    setShowLogin(false)
    setShowSignUp(true)
  }

  const handleChangeModalLogin = () => {
    setShowLogin(true)
    setShowSignUp(false)
  }

  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch({
        type: `${authActions.logoutPending}_saga`,
    })
    navigate('/');
};

    return (
      <>
          <div className="app mb-3">
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
                    <span>
                      <IoPersonSharp />
                    </span>
                    <div className='profile'>
                      {
                         !isEmpty(userInfo) ? 
                        <>
                           <div className='profile_info' onClick={() => navigate('/profile')}>Xem thông tin cá nhân </div>
                          <div className='changePassword'onClick={() => navigate('/change-password')}>Đổi mật khẩu</div>
                          <div className='logout' onClick={handleLogout}>Đăng xuất</div>
                        </>
                        :
                        <>
                          <div className='login' onClick={() => setShowLogin(true)}>Đăng nhập</div>
                          <div className='sing_up' onClick={() => setShowSignUp(true)}>Đăng ký</div>
                        </>
                      }
                      
                     
                    </div>
                    <span style={{fontSize:'0.8rem', marginTop:'18px'}}>{userInfo.name}</span>
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
                <li onClick={() => navigate('/dashboard')}>Dashboard</li>
                <li onClick={() => navigate('/admin')}>Admin Manager</li>
                {/*<li>Tin Tức</li>*/}
                {/*<li>Liên Hệ</li>*/}
                <li onClick={() => navigate('/ws-example')}>WS example</li>
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

        <SingUpModal isShow ={showSignUp} onClose={() => setShowSignUp(false)} onChangeModal={handleChangeModalLogin} isSingUpError = {isSingUpError}/>
        <LoginModal isShow ={showLogin} onClose={() => setShowLogin(false)} onChangeModal={handleChangeModalSignUp} isLoginError={isLoginError}/>
      </>
      );
}

export default Header