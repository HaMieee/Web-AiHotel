import './DashBoardAdmin.scss'
import Box from "@mui/material/Box";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";


const DashBoardAdmin = () => {
    return (
        <>
            <Box component="section"
                 sx={{ p: 2 }}
            >
                <h3 className={'d-flex align-items-center'}>
                    <ArrowRightRoundedIcon/> Thống kê
                </h3>
            </Box>
        </>
    )
}
export default DashBoardAdmin



    
