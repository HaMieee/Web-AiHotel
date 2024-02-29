import TableManage from "../../../layouts/components/table/TableManage";
import {isEmpty, map} from "lodash";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import React, {useEffect, useState} from "react";
import {manageReservationActions} from "../../../redux/slices/manageReservation.slice";
import {IPaginateResponse} from "../../../redux/types/page";
import {IReservation} from "../../../redux/types/reservation";
import PaginationComponent from "../../../layouts/components/pagination/PaginationComponent";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {IHotel} from "../../../redux/types/hotel";
import {manageHotelActions} from "../../../redux/slices/manageHotel.slice";
import {IRoomType} from "../../../redux/types/roomType";
import {useNavigate} from "react-router";

const typeActions = ['delete', 'detail'];

const ManageReservation = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const listReservationState = useSelector((state: RootState) => state.manageReservation.reservations);
    const metaState = useSelector((state: RootState) => state.manageReservation.paginate);
    const listHotelState = useSelector((state: RootState) => state.manageHotel.hotels);

    const [listReservationData, setReservationData] = useState<{}[]>([]);
    const [metaData, setMetaData] = useState<IPaginateResponse>({});
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [inputHotelId, setInputHotelId] = useState<number | undefined>(undefined);
    const [inputRoomTypeId, setInputRoomTypeId] = useState<number | undefined>(undefined);
    const [listHotelData, setListHotelData] = useState<IHotel[]>([]);
    const [listRoomType, setListRoomType] = useState<IRoomType[]>([]);

    useEffect(() => {
        dispatch({
            type: `${manageHotelActions.getListHotelPending}_saga`,
        })
    }, [])

    useEffect(() => {
        console.log(listHotelState)
        setListHotelData(listHotelState)
    }, [listHotelState])

    useEffect(() => {
        if (inputHotelId !== undefined) {
            dispatch({
                type: `${manageReservationActions.getListReservationPending}_filter_saga`,
                payload: {
                    hotel_id: inputHotelId,
                    ...(inputRoomTypeId !== undefined && { room_type_id: inputRoomTypeId }),
                    per_page: 5,
                    page: currentPage,
                }
            })
        } else {
            dispatch({
                type: `${manageReservationActions.getListReservationPending}_saga`,
                payload: {
                    per_page: 5,
                    page: currentPage,
                }
            });
        }
    }, [inputHotelId, inputRoomTypeId, currentPage])

    useEffect(() => {
        setMetaData(metaState);
        setReservationData(buildUserData(listReservationState))
    }, [listReservationState, metaState])

    const buildUserData = (data: IReservation[]) => {
        let newData:{}[] = [];
        if (!isEmpty(data)) {
            newData = data.map(r => {
                return {
                    id: r.id,
                    hotel: r.hotel?.name,
                    room: r.room?.code,
                    room_type: r.room_type?.name,
                    user: r.user?.name,
                    start_date: r.start_date,
                    end_date: r.end_date,
                    status: r.status,
                }
            });
        }
        return newData;
    }

    const handleChangePage = (page: number) => {
        setCurrentPage(page)
    }

    const handleOnAction = (recordId, action) => {
        if (action === 'detail') {
            return navigate(`/manage-reservation/${recordId}`)
        }
    }

    const handleHotelSelection = (event, value) => {
        if (value === '--none--') {
            setListRoomType([]);
            setCurrentPage(1);
            setInputHotelId(undefined);
        } else {
            const selectedHotel = listHotelData.find(hotel => hotel.name === value);
            if (selectedHotel) {
                setInputHotelId(selectedHotel.id);
                setListRoomType(selectedHotel.room_types || []);
            } else {
                setInputHotelId(undefined);
            }
        }
    };

    const handleRoomTypeSelection = (event, value) => {
        if (value === '--none--') {
            setInputRoomTypeId(undefined);
        } else {
            const selectedRoomType = listRoomType.find(type => type.name === value);
            if (selectedRoomType) {
                setInputRoomTypeId(selectedRoomType.id);
            } else {
                setInputRoomTypeId(undefined);
            }
        }
    };

    return (
        <>
            <div className={'d-flex mb-3'}>
                <Autocomplete
                    className={'me-2'}
                    disableClearable
                    sx={{ width: 300 }}
                    options={['--none--', ...listHotelData.map((option) => option.name)]}
                    onChange={handleHotelSelection}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Tên khách sạn"
                            InputProps={{
                                ...params.InputProps,
                                type: 'search',
                            }}
                        />
                    )}
                />

                {!isEmpty(listRoomType) ?
                    <Autocomplete
                        className={'me-2 ms-2'}
                        disableClearable
                        sx={{ width: 200 }}
                        options={['--none--', ...listRoomType.map((option) => option.name)]}
                        onChange={handleRoomTypeSelection}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Loại phòng"
                                InputProps={{
                                    ...params.InputProps,
                                    type: 'search',
                                }}
                            />
                        )}
                    />
                    :
                    ''
                }
            </div>

            <TableManage headers={['STT', 'Khách sạn', 'Phòng', 'Kiểu phòng', 'Người đặt', 'Start', 'End', 'Trạng thái', 'Actions']}
                         actions={map(typeActions, (action) => ({ type: action }))}
                         data={listReservationData}
                         useIdx={true}
                         onAction={handleOnAction}
            />

            <div className={'d-flex justify-content-center'}>
                <PaginationComponent totalPages={metaData.total_pages} currentPage={currentPage} onChangePage={handleChangePage} />
            </div>
        </>
    )
}

export default ManageReservation;