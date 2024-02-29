import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { map } from "lodash";
import { IRoom } from "../../../redux/types/room";
import { RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { IPaginateResponse } from "../../../redux/types/page";
import { manageRoomActions } from "../../../redux/slices/manageRoom.slice";
import { manageHotelActions } from "../../../redux/slices/manageHotel.slice";
import CreateRoomModal from "../../../layouts/components/modals/CreateRoomModal";
import { ICreateRoom } from "../../../redux/types/createRoom";
import { IHotel } from "../../../redux/types/hotel";
import TableThree from "../../../layouts/components/table/TableThree";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import AddBoxIcon from '@mui/icons-material/AddBox';

const typeActions = ['delete', 'edit'];

const ManageRoom = () => {
    const metaState = useSelector((state: RootState) => state.manageHotel.paginate);
    const roomsState: IRoom[] = useSelector((state: RootState) => state.manageRoom.rooms)
    const hotelsState:  IHotel[] = useSelector((state:RootState) => state.manageHotel.hotels)

    const [showCreate, setShowCreate] = useState(false);
    const [roomsData, setRoomsData] = useState<{}[]>([]);
    const [metaData, setMetaData] = useState<IPaginateResponse>({});
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [roomDetail, setRoomDetail] = useState<IRoom>({});

    const dispatch = useDispatch()

    useEffect(() => {
        setMetaData(metaState);
        setRoomsData(buildRoomData(roomsState))
    }, [roomsState])

    useEffect(() => {
        dispatch({
            type:`${manageHotelActions.getListHotelPending}_saga`,
        })
    },[])

    useEffect(() => {
        dispatch({
            type: `${manageRoomActions.getListRoomPending}_saga`,
            payload: {
                per_page: 2,
                page: currentPage,
            }
        });
    }, [currentPage])



    const handleOnAction = () => {

    }

    const handleCreateRoom = (createRoomData: ICreateRoom) => {
        dispatch({
            type: `${manageRoomActions.createRoomPending}_saga`,
            payload: createRoomData,
        })
    }
    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value)
    }

    const buildRoomData = (data: IRoom[]) => {
        return data.map(room => {
            return {
                id:room.id,
                hotel:room.hotel?.name,
                room_type:room.room_type?.name,
                floor:room.floor,
                code:room.code,
            }
        });
    }
    return(
        <>
            <div className={'d-flex justify-content-end mb-3'}>
                <Stack spacing={2} direction="row">
                    <Button variant="contained"
                            startIcon={<AddBoxIcon/>}
                            onClick={() => setShowCreate(true)}>
                        Thêm
                    </Button>
                </Stack>
            </div>

            <TableThree columns={['STT', 'Khách Sạn', 'Loại Phòng', 'Tầng', 'Số Phòng', 'Actions']}
                        rows={roomsData}
                        actions={map(typeActions, (action) => ({ type: action }))}
                        onAction={handleOnAction}
            />

            <div className={'d-flex justify-content-center'}>
                <Pagination count={metaData.total_pages}
                            shape="rounded"
                            onChange={handleChangePage}
                />
            </div>

            <CreateRoomModal
                isShow={showCreate}
                onClose={() => setShowCreate(false)}
                onCreateRoom={handleCreateRoom}
                roomData={roomDetail}
                hotelsData={hotelsState}
            />
        </>
    )
}

export default ManageRoom