import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import React, {useEffect, useState} from "react";
import Divider from '@mui/material/Divider';
import PaymentModal from "./PaymentModal";
import {IInvoice} from "../../../redux/types/invoice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {manageInvoiceActions} from "../../../redux/slices/manageInvoice.slice";

type IInvoiceDetailModal = {
    isShow: boolean;
    onClose: () => void;
}

const InvoiceDetailModal: React.FC<IInvoiceDetailModal> = ({
    isShow,
    onClose,
                            }) => {
    const dispatch = useDispatch();
    const invoiceDetailState = useSelector((state: RootState) => state.manageInvoice.invoiceDetail);

    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [invoiceDetailData, setInvoiceDetailData] = useState<IInvoice>({});

    useEffect(() => {
        setInvoiceDetailData(invoiceDetailState);
    }, [invoiceDetailState])

    const handleOnSuccess = () => {
        dispatch({
            type: `${manageInvoiceActions.getInvoiceDetailPending}_saga`,
            payload: invoiceDetailData.id,
        });
        setShowPaymentModal(false);
    }

    return (
        <>
            <Dialog
                open={isShow}
                onClose={onClose}
                fullWidth={true}
                maxWidth={'md'}
            >
                <DialogTitle>Chi tiết hóa đơn</DialogTitle>
                <DialogContent>
                    <Divider>Invoice Code: {invoiceDetailData.code}</Divider>
                    <div className={'float-end'}>
                        {invoiceDetailData.status === 'pending' ?
                            <Button color={'error'}
                                  variant="contained"
                                  onClick={() => setShowPaymentModal(true)}>
                                Chưa thanh toán
                            </Button>
                            :
                            <Button color={'success'}
                                    variant="contained">
                                Đã thanh toán
                            </Button>
                        }
                    </div>

                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            '& > :not(style)': {
                                m: 1,
                                width: 128,
                                height: 128,
                            },
                        }}
                    >
                        <div>Payment</div>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button variant="text" color={'inherit'} onClick={onClose}>Đóng</Button>
                    <Button variant="contained" color={'primary'} onClick={onClose}>Xác nhận</Button>
                </DialogActions>
            </Dialog>

            <PaymentModal show={showPaymentModal}
                          invoiceId={invoiceDetailData.id}
                          onClose={() => setShowPaymentModal(false)}
                          onSuccess={handleOnSuccess}
            />
        </>
    )
};

export default InvoiceDetailModal;