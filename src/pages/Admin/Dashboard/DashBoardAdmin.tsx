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
import Box from "@mui/material/Box";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";
import React from "react";

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



    
