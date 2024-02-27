import TableManage from "../../../layouts/components/table/TableManage";
import {map} from "lodash";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import React, {useEffect, useState} from "react";
import {manageReservationActions} from "../../../redux/slices/manageReservation.slice";
import {IPaginateResponse} from "../../../redux/types/page";
import {IReservation} from "../../../redux/types/reservation";
import PaginationComponent from "../../../layouts/components/pagination/PaginationComponent";
import EditReservationModal from "../../../layouts/components/modals/EditReservationModal";
import { IReservationEdit } from "../../../redux/types/dtos/editReservation";

const typeActions = ['delete', 'edit'];

const ManageReservation = () => {
    const dispatch = useDispatch();
    const listReservationState = useSelector((state: RootState) => state.manageReservation.reservations);
    const reservationState = useSelector((state: RootState) => state.manageReservation.reservation);

    const metaState = useSelector((state: RootState) => state.manageHotel.paginate);
    const [listReservationData, setReservationData] = useState<{}[]>([]);
    const [metaData, setMetaData] = useState<IPaginateResponse>({});
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [showEdit, setShowEdit] = useState(false);
    const [reservationDetail, setReservationDetail] = useState<IReservation>({});

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

    const handleOnAction = (recordId, action) => {
        if( action === 'edit') {            
            dispatch({
                type:`${manageReservationActions.getReservationPending}_saga`,
                payload: recordId
            })
            setShowEdit(true)
        }
    }

    const handleEditReservation = (editReservationData: IReservationEdit) => {
        dispatch({
            type: `${manageReservationActions.editReservationPending}_saga`,
            payload: editReservationData
        })
    }

    useEffect(() => {
        setReservationDetail(reservationState);
    }, [reservationState])

    return (
        <>
            <TableManage headers={['STT', 'Người đặt', 'Khách sạn', 'Phòng', 'Start', 'End', 'Trạng thái', 'Actions']}
                         actions={map(typeActions, (action) => ({ type: action }))}
                         data={listReservationData}
                        onAction={handleOnAction}
            />
            <EditReservationModal
              isShow={showEdit}
              onClose={() => setShowEdit(false)}
              onEditReservation={handleEditReservation}
              reservationData={reservationDetail}
              />
            <div className={'d-flex justify-content-center'}>
                <PaginationComponent totalPages={metaData.total_pages} currentPage={currentPage} onChangePage={handleChangePage} />
            </div>
        </>
    )
}

export default ManageReservation;