import { useState } from 'react'
import './UpdateInfo.scss'
const UpdateInfo = () => {
    const [showBtnUpdate, setShowBtnUpdate] = useState(false)
    const handleSubmit = () => {
        
    }
    return(
        <div className="update_info">
        <div className="container">
          <h1>Xin chào, hamiiii</h1>
          <h2>Thông tin tài khoản:</h2>
          <div className="content">
            <div className="from_group">
              <label>Họ tên *</label>
              <input/>
            </div>
            <div className="from_group">
              <label>Email *</label>
              <input/>
            </div>
            <div className="from_group">
              <label>SĐT </label>
              <input/>
            </div>
            <div className="from_group">
              <label>Địa chỉ</label>
              <input/>
            </div>
            <div className="from_group">
              <label>Tuổi</label>
              <input/>
            </div>
            <div className="from_group">
              <label>CCCD</label>
              <input/>
            </div>
          </div>
          <button className="update" onClick={handleSubmit}>cập nhật tài khoản</button>
        </div>
          </div>
    )
}

export default UpdateInfo