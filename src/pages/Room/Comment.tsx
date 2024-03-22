import { Button } from "@mui/material"
import {Image} from "react-bootstrap";
import SendIcon from '@mui/icons-material/Send';

const Comment = () => {
    return(
        <div>
            <div className="d-flex">
                <Image src={'https://i.pinimg.com/236x/db/8d/48/db8d4877d92d07b4028d19f4c367ab50.jpg'}
                    roundedCircle
                    fluid
                    className={'image-main'}
                    style={{ width: '50px', height: '50px' }}
                />
                <div style={{marginLeft:'10px'}} >
                    <div>ha mi</div>
                    <div>tttttttttttttttttttttt</div>
                </div>
            </div>
            <div className="d-flex justify-content-between " style={{marginTop:'12px'}}>
                <input placeholder="bình luận..." style={{border:'1px solid blue', borderRadius:'5px', outline:'none', width:'100%', paddingLeft:'6px'}}/>
                <Button><SendIcon /></Button>
            </div>
        </div>
    )
}
 export default Comment