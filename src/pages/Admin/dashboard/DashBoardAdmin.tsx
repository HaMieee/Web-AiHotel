import logo from'../../../../src/img/logo.jpg'
import './DashBoardAdmin.scss'
import { MdDashboard } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { BiHomeHeart } from "react-icons/bi";
import { GoProjectRoadmap } from "react-icons/go";
import { MdPerson3 } from "react-icons/md";
import { RiTeamFill } from "react-icons/ri";
import { RiBillLine } from "react-icons/ri";
import { IoPersonSharp } from "react-icons/io5";
import TableManage from "../../../layouts/components/table/TableManage";

const DashBoardAdmin = () => {
    return (
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
                        <div style={{backgroundColor:'gray' , height:'0.5px'}}></div>
                        <div>
                            <i><MdDashboard/></i>
                            <span>DashBoard</span>
                        </div>
                        <div>
                            <i><RiAdminFill/></i>
                            <span>Quản lý người dùng</span>
                        </div>
                        <div>
                            <i><BiHomeHeart/></i>
                            <span>Quản lý phòng</span>
                        </div>
                        <div>
                            <i><MdPerson3/></i>
                            <span>Quản lý nhân viên </span>
                        </div>
                        <div>
                            <i><RiTeamFill/></i>
                            <span>Quản lý khách hàng</span>
                        </div>
                        <div>
                            <i><RiBillLine/></i>
                            <span>Quản lý hóa đơn</span>
                        </div>
                    </div>
                </div>
                <div className='sidebar_nav'>
                    <div>
                            <div className='d-flex justify-content-between sidebar_nav-top'>
                                <input placeholder='Search...'/>
                                <i style ={{fontSize:'28px'}}><IoPersonSharp/></i>
                            </div>
                            <hr/>
                    </div>
                    <div className='d-flex justify-content-between sidebar_nav-topOne'>
                            <div className=''>
                            <div>Quản lý người dùng</div>
                            <span>Home</span>
                            <span>--</span>
                            <span>Quản lý người dùng</span>
                            </div>
                            <button>add</button>
                        </div>

                    {/*<div style={{border:'1px solid gray', borderRadius:'4px', backgroundColor:'white'}}>*/}
                    {/*    <div className='d-flex' style={{ height:'44px'}}>*/}
                    {/*        <div className='p-3'>Active</div>*/}
                    {/*        <div className='p-3'>Pause</div>*/}
                    {/*        <div className='p-3'>All</div>*/}
                    {/*    </div>*/}
                    {/*    <div>*/}
                    {/*    <table>*/}
                    {/*        <tr>*/}
                    {/*            <th>Họ và tên</th>*/}
                    {/*            <th>Email</th>*/}
                    {/*            <th>Vị trí</th>*/}
                    {/*            <th>Trạng thái</th>*/}
                    {/*            <th>Ngày tạo</th>*/}
                    {/*            <th>Hành động</th>*/}
                    {/*        </tr>*/}
                    {/*        <tr>*/}
                    {/*            <td>ha mi</td>*/}
                    {/*            <td>mi@gmail.com</td>*/}
                    {/*            <td>khong</td>*/}
                    {/*            <td>khong</td>*/}
                    {/*            <td>02/01/2024</td>*/}
                    {/*            <td>Edit/Delete</td>*/}
                    {/*        </tr>*/}
                    {/*        <tr>*/}
                    {/*            <td>ha mi</td>*/}
                    {/*            <td>mi@gmail.com</td>*/}
                    {/*            <td>khong</td>*/}
                    {/*            <td>khong</td>*/}
                    {/*            <td>02/01/2024</td>*/}
                    {/*            <td>Edit/Delete</td>*/}
                    {/*        </tr>*/}
                    {/*        <tr>*/}
                    {/*            <td>ha mi</td>*/}
                    {/*            <td>mi@gmail.com</td>*/}
                    {/*            <td>khong</td>*/}
                    {/*            <td>khong</td>*/}
                    {/*            <td>02/01/2024</td>*/}
                    {/*            <td>Edit/Delete</td>*/}
                    {/*        </tr> <tr>*/}
                    {/*            <td>ha mi</td>*/}
                    {/*            <td>mi@gmail.com</td>*/}
                    {/*            <td>khong</td>*/}
                    {/*            <td>khong</td>*/}
                    {/*            <td>02/01/2024</td>*/}
                    {/*            <td>Edit/Delete</td>*/}
                    {/*        </tr>*/}
                    {/*    </table>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    <br />

                    <div>
                        <TableManage
                            headers={['STT', 'Name', 'Address', 'Description']}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DashBoardAdmin



    
