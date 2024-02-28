import TableManage from "../../../layouts/components/table/TableManage";
import {map} from "lodash";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import React, {useEffect, useState} from "react";
import {manageReservationActions} from "../../../redux/slices/manageReservation.slice";
import {IPaginateResponse} from "../../../redux/types/page";
import {IReservation} from "../../../redux/types/reservation";
import PaginationComponent from "../../../layouts/components/pagination/PaginationComponent";
import Form from 'react-bootstrap/Form';

const typeActions = ['delete', 'detail'];

const ManageReservation = () => {
    const dispatch = useDispatch();
    const listReservationState = useSelector((state: RootState) => state.manageReservation.reservations);
    const metaState = useSelector((state: RootState) => state.manageReservation.paginate);

    const [listReservationData, setReservationData] = useState<{}[]>([]);
    const [metaData, setMetaData] = useState<IPaginateResponse>({});
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        dispatch({
            type: `${manageReservationActions.getListReservationPending}_saga`,
            payload: {
                per_page: 5,
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
                hotel: r.hotel?.name,
                room: r.room?.code,
                user: r.user?.name,
                start_date: r.start_date,
                end_date: r.end_date,
                status: r.status,
            }
        });
    }

    const handleChangePage = (page: number) => {
        setCurrentPage(page)
    }

    return (
        <>
            <div className={'d-flex mb-3 '}>
                <div className="me-2">
                    <Form.Label>Khách sạn</Form.Label>
                    <Form.Control
                        type="search"
                        placeholder="Tên khách sạn"
                    />
                </div>
                <div className="me-2 ms-2">
                    <Form.Label>Tầng</Form.Label>
                    <Form.Select>
                        <option>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </Form.Select>
                </div>
                <div className="ms-2">
                    <Form.Label>Phòng</Form.Label>
                    <Form.Select>
                        <option>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </Form.Select>
                </div>
            </div>

            <TableManage headers={['STT', 'Khách sạn', 'Phòng', 'Người đặt', 'Start', 'End', 'Trạng thái', 'Actions']}
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