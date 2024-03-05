import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {manageInvoiceActions} from "../../../redux/slices/manageInvoice.slice";
import {RootState} from "../../../redux/store";
import {IPaginateResponse} from "../../../redux/types/page";
import Box from "@mui/material/Box";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";
import TableThree from "../../../layouts/components/table/TableThree";
import {IInvoice} from "../../../redux/types/invoice";
import Pagination from "@mui/material/Pagination";
import {isEmpty, map} from "lodash";
import InvoiceDetailModal from "../../../layouts/components/modals/InvoiceDetailModal";

const typeActions = ['detail'];

const ManageInvoice = () => {
    const dispatch = useDispatch();
    const listInvoiceState = useSelector((state: RootState) => state.manageInvoice.invoices);
    const metaState = useSelector((state: RootState) => state.manageInvoice.paginate);

    const [listInvoiceData, setListInvoiceData] = useState<{}[]>([]);
    const [metaData, setMetaData] = useState<IPaginateResponse>({});
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [showDetailModal, setShowDetailModal] = useState(false);

    useEffect(() => {
        dispatch({
            type: `${manageInvoiceActions.getListInvoicePending}_saga`,
            payload: {
                per_page: 5,
                page: currentPage,
            }
        })
    }, [currentPage, dispatch])

    useEffect(() => {
        setListInvoiceData(buildListInvoiceData(listInvoiceState));
        setMetaData(metaState);
    }, [listInvoiceState, metaState])

    const buildListInvoiceData = (data: IInvoice[]) => {
        let newData:{}[] = [];
        if (!isEmpty(data)) {
            newData = data.map(invoice => {
                return {
                    id: invoice.id,
                    check_in: invoice.userCheckIn?.name,
                    check_out: invoice.userCheckOut?.name,
                    total_day: invoice.total_day,
                    total_price: invoice.total_price,
                    status: invoice.status,
                    paid: invoice.userPaid?.name,
                }
            });
        }
        return newData;
    };

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value)
    };

    const handleOnAction = (recordId, action) => {
        if (action === 'detail') {
            dispatch({
                type: `${manageInvoiceActions.getInvoiceDetailPending.type}_saga`,
                payload: recordId,
            })
            setShowDetailModal(true);
        }
    };

    return (
        <>
            <Box component="section"
                 sx={{ p: 2 }}
            >
                <h3 className={'d-flex align-items-center'}>
                    <ArrowRightRoundedIcon/> Quản lý hóa đơn
                </h3>
            </Box>

            <TableThree columns={['STT', 'Check in', 'Check out', 'Tổng ngày', 'Tổng giá', 'Trạng thái', 'Người thanh toán', 'Chi tiết']}
                        rows={listInvoiceData}
                        actions={map(typeActions, (action) => ({ type: action }))}
                        onAction={handleOnAction}
            />

            <div className={'d-flex justify-content-center'}>
                <Pagination count={metaData.total_pages}
                            shape="rounded"
                            onChange={handleChangePage}
                />
            </div>

            <InvoiceDetailModal isShow={showDetailModal} onClose={() => setShowDetailModal(false)}/>
        </>
    )
}

export default ManageInvoice;