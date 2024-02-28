import TableManage from "../../../layouts/components/table/TableManage";
import {map} from "lodash";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import React, {useEffect, useState} from "react";
import {manageReservationActions} from "../../../redux/slices/manageReservation.slice";
import {IPaginateResponse} from "../../../redux/types/page";
import {IReservation} from "../../../redux/types/reservation";
import PaginationComponent from "../../../layouts/components/pagination/PaginationComponent";
import {useNavigate} from "react-router";

const typeActions = ['delete', 'detail'];

const ManageReservation = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const listReservationState = useSelector((state: RootState) => state.manageReservation.reservations);
    const metaState = useSelector((state: RootState) => state.manageHotel.paginate);

    const [listReservationData, setReservationData] = useState<{}[]>([]);
    const [metaData, setMetaData] = useState<IPaginateResponse>({});
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        dispatch({
            type: `${manageReservationActions.getListReservationPending}_saga`,
            payload: {
                per_page: 2,
                page: currentPage,
            }
        });
    }, [currentPage])

    useEffect(() => {
        setMetaData(metaState);
        setReservationData(buildUserData(listReservationState))
    }, [listReservationState, metaState])

    const buildUserData = (data: IReservation[]) => {
        return data.map(r => {
            return {
                id: r.id,
                user: r.user?.name,
                hotel: r.hotel?.name,
                room: r.room?.code,
                start_date: r.start_date,
                end_date: r.end_date,
                status: r.status,
            }
        });
    }

    const handleChangePage = (page: number) => {
        setCurrentPage(page)
    }

    const handleOnAction = (recordId: number, actionType: string) => {
        if (actionType === 'detail') {
            navigate(`/`)
        }
    }

    return (
        <>
            <TableManage headers={['STT', 'Người đặt', 'Khách sạn', 'Phòng', 'Start', 'End', 'Trạng thái', 'Actions']}
                         actions={map(typeActions, (action) => ({ type: action }))}
                         data={listReservationData}

            />

            <div className={'d-flex justify-content-center'}>
                <PaginationComponent totalPages={metaData.total_pages} currentPage={currentPage} onChangePage={handleChangePage} />
            </div>
        </>
    )
}

export default ManageReservation;