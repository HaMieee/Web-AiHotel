import Box from "@mui/material/Box";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";
import { BarChart } from '@mui/x-charts/BarChart';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { IInvoice } from '../../../redux/types/invoice';
import { manageInvoiceActions } from '../../../redux/slices/manageInvoice.slice';

const ManageStatistical = () => {
    const dispatch = useDispatch();
    const invoicesState = useSelector((state: RootState) => state.manageInvoice.invoices);

    const [listInvoices, setListInvoices] = useState<IInvoice[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    useEffect(() => {
        dispatch({
            type: `${manageInvoiceActions.getListInvoicePending}_saga`,
        })
    }, [])

    useEffect(() => {
        setTotalPrice(handleTotalPrice(invoicesState))
        setListInvoices(invoicesState)
    }, [invoicesState])

    const handleTotalPrice = (invoices: IInvoice[]) => {
        const totalPrice = invoices.reduce((accumulator, currentInvoice) => {
            return accumulator + Number(currentInvoice.total_price);
        }, 0);

        return totalPrice;
    }

    const options = ['Ngày','Tháng', 'Năm']
    return(
        <>
            <Box component="section"
                 sx={{ p: 2 }}
            >
                <h3 className={'d-flex align-items-center'}>
                    <ArrowRightRoundedIcon/> Thống kê doanh thu
                </h3>
            </Box>

            <div>Tong bill: {listInvoices.length}</div>
            <div>Tong doanh thu: ${totalPrice}.00</div>

           <div>
           <Autocomplete
                    className={'me-2 float-end'}
                    disableClearable
                    sx={{ width: 300, marginBottom: 5 }}
                    options = {options}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Chọn thống kê doanh thu"
                            InputProps={{
                                ...params.InputProps,
                                type: 'search',
                            }}
                        />
                    )}
                />
                <BarChart
                        series={[
                            { data: [35, 36, 24, 34] },
                            { data: [41, 33, 39, 30] },
                            { data: [35, 25, 30, 40] },
                            { data: [40, 35, 35, 30] },
                            { data: [33, 30, 30, 25] },
                        ]}
                        height={350}
                        xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
                        margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                    />
           </div>
        </>
    )
}

export default ManageStatistical