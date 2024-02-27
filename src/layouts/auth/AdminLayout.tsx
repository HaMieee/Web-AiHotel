import {Navigate, Outlet, useNavigate} from "react-router";
import React from "react";
import BlankLayout from "../blankLayout/BlankLayout";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import logo from "../../img/logo.jpg";
import {GoProjectRoadmap} from "react-icons/go";
import {MdDashboard, MdPerson3} from "react-icons/md";
import {RiAdminFill, RiBillLine, RiTeamFill} from "react-icons/ri";
import {BiHomeHeart} from "react-icons/bi";
import { RiHotelFill } from "react-icons/ri";
import { RiAccountCircleFill } from "react-icons/ri";
import { RiCalendar2Line } from "react-icons/ri";
import { FaRegBell } from "react-icons/fa";



const AdminLayout = () => {
    const roleState = useSelector((state: RootState) => state.auth.userInfo.role_type);
    const navigate = useNavigate();

    if (roleState !== 'admin') {
        return <Navigate to={'/404'} replace />
    }

    return (
        <BlankLayout>
            <div className="dash_board">
                <div className="warper_board">
                    <div className="sidebar" >
                        <div className='sidebar-top'>

                            <img src ={logo} alt='logo'/>
                            <i style={{fontSize:'24px'}}><GoProjectRoadmap/></i>

                        </div>
                        <div className='sidebar-bottom'>
                            <p style={{fontSize:'24px'}}>Menu</p>
                            {/* <hr></hr> */}
                            <div style={{backgroundColor:'gainsboro' , height:'0.5px'}}></div>
                            <div>
                                <i><MdDashboard/></i>
                                <span>DashBoard</span>
                            </div>
                            <div onClick={() => navigate('/manage-user')}>
                                <i><RiAdminFill/></i>
                                <span>Quản lý người dùng</span>
                            </div>
                            <div onClick={() => navigate('/manage-hotel')}>
                                <i><RiHotelFill /></i>
                                <span>Quản lý khách sạn</span>
                            </div>
                            <div onClick={() => navigate('/manage-room')}>
                                <i><BiHomeHeart/></i>
                                <span>Quản lý phòng</span>
                            </div>
                            <div onClick={() => navigate('/manage-reservation')}>
                                <i><RiTeamFill/></i>
                                <span>Quản lý đơn đặt phòng</span>
                            </div>
                            <div>
                                <i><RiBillLine/></i>
                                <span>Quản lý hóa đơn</span>
                            </div>

                            <div>
                                <i><MdPerson3/></i>
                                <span>Thống kê</span>
                            </div>
                        </div>
                    </div>
                    <div className='sidebar_nav'>
                        <div>
                            <div className='d-flex justify-content-between sidebar_nav-top'>
                                <input placeholder='Search...'/>
                              <div>
                              <i style ={{fontSize:'22px'}}>< RiCalendar2Line/></i>
                              <i style ={{fontSize:'22px'}}>< FaRegBell/></i>
                              <i style ={{fontSize:'22px'}}>< FaRegBell/></i>
                              <i style ={{fontSize:'36px'}}>< RiAccountCircleFill/></i>
                              </div>
                            </div>
                            <hr/>
                        </div>
                        <div className='d-flex justify-content-between sidebar_nav-topOne'>
                           <div className=''>
                               <div>Quản lý khách sạn</div>
                               <span style={{fontSize:'0.8rem'}}>Home </span>
                               <span> - </span>
                               <span style={{fontSize:'0.8rem'}}> Quản lý khách sạn</span>
                           </div>
                        </div>

                        <Outlet />

                    </div>
                </div>
            </div>
        </BlankLayout>
    )
}

export default AdminLayout;