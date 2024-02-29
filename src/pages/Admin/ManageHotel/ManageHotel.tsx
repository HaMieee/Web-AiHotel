import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {manageHotelActions} from "../../../redux/slices/manageHotel.slice";
import {RootState} from "../../../redux/store";
import {IHotel} from "../../../redux/types/hotel";
import {map} from "lodash";
import {useNavigate} from "react-router";
import Button from "@mui/material/Button";
import {BsFillHouseAddFill} from "react-icons/bs";
import CreateHotelModal from "../../../layouts/components/modals/CreateHotelModal";
import {manageRoomTypeActions} from "../../../redux/slices/manageRoomType.slice";
import {IRoomType} from "../../../redux/types/roomType";
import {ICreateHotel} from "../../../redux/types/dtos/createHotel";
import {IPaginateResponse} from "../../../redux/types/page";
import TableThree from "../../../layouts/components/table/TableThree";
import Pagination from '@mui/material/Pagination';
import Stack from "@mui/material/Stack";
import AddHomeIcon from "@mui/icons-material/AddHome";


const typeActions = ['delete', 'detail'];

const ManageHotel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const hotelsState: IHotel[] = useSelector((state: RootState) => state.manageHotel.hotels);
    const metaState = useSelector((state: RootState) => state.manageHotel.paginate);
    const roomTypesState: IRoomType[] = useSelector((state: RootState) => state.manageRoomType.room_types);

    const [hotelsData, setHotelsData] = useState<IHotel[]>([]);
    const [roomTypesData, setRoomTypesData] = useState<IRoomType[]>([]);
    const [showCreate, setShowCreate] = useState(false);
    const [metaData, setMetaData] = useState<IPaginateResponse>({});
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        dispatch({
            type: `${manageRoomTypeActions.getListRoomTypePending}_saga`,
        })
    }, [])

    useEffect(() => {
        dispatch({
            type: `${manageHotelActions.getListHotelPending}_saga`,
            payload: {
                per_page: 4,
                page: currentPage,
            }
        });
    }, [currentPage])

    useEffect(() => {
        setHotelsData(buildUserData(hotelsState));
        setMetaData(metaState);
        setRoomTypesData(roomTypesState);
    }, [hotelsState, roomTypesState])

    const buildUserData = (data: IHotel[]) => {
        return data.map(hotel => {
            return {
                id: hotel.id,
                name: hotel.name,
                address: hotel.address,
                description: hotel.description,
            }
        });
    }

    const handleOnAction = (recordId, action) => {
        if (action === 'detail') {
            return navigate(`/manage-hotel/${recordId}`)
        }
        if (action === 'delete') {
            dispatch({
                type: `${manageHotelActions.deleteHotelPending}_saga`,
                payload: recordId,
            })
        }
    }

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value)
    }

    const handleCreateHotel = (createHotelData: ICreateHotel) => {
        dispatch({
            type: `${manageHotelActions.createHotelPending}_saga`,
            payload: createHotelData,
        })
    }

    return (
        <>
            <div className={'d-flex justify-content-end mb-3'}>
                <Stack spacing={2} direction="row">
                    <Button variant="contained"
                            startIcon={<AddHomeIcon/>}
                            onClick={() => setShowCreate(true)}>
                        Thêm
                    </Button>
                </Stack>
            </div>

            <TableThree
                columns={['STT', 'Name', 'Address', 'Description', 'Actions']}
                rows={hotelsData}
                actions={map(typeActions, (action) => ({ type: action }))}
                onAction={handleOnAction}
            />

            <div className={'d-flex justify-content-center'}>
                <Pagination count={metaData.total_pages}
                            shape="rounded"
                            onChange={handleChangePage}
                />
            </div>

            <CreateHotelModal
                isShow={showCreate}
                onClose={() => setShowCreate(false)}
                roomTypesData={roomTypesData}
                onCreateHotel={handleCreateHotel}
            />
        </>
    )
}

export default ManageHotel;