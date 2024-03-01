import { useEffect, useState } from "react";
import { Button } from "react-bootstrap"
import {BsFillHouseAddFill} from "react-icons/bs";
import TableManage from "../../../layouts/components/table/TableManage";
import { map } from "lodash";
import { IRoom } from "../../../redux/types/room";
import { RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { IRoomType } from "../../../redux/types/roomType";
import { IPaginateResponse } from "../../../redux/types/page";
import PaginationComponent from "../../../layouts/components/pagination/PaginationComponent";
import { manageRoomActions } from "../../../redux/slices/manageRoom.slice";
import { manageHotelActions } from "../../../redux/slices/manageHotel.slice";
import CreateRoomModal from "../../../layouts/components/modals/CreateRoomModal";
import { ICreateRoom } from "../../../redux/types/createRoom";
import { IHotel } from "../../../redux/types/hotel";
import DeleteRoomModal from "../../../layouts/components/modals/DeleteRoomModal";
import { IUpdateRoom } from "../../../redux/types/updateRoom";

const typeActions = ['delete', 'edit'];

const ManageRoom = () => {
    const metaState = useSelector((state: RootState) => state.manageHotel.paginate);
    const roomsState: IRoom[] = useSelector((state: RootState) => state.manageRoom.rooms)
    const roomState: IRoom = useSelector((state: RootState) => state.manageRoom.roomDetail)
    const hotelsState:  IHotel[] = useSelector((state:RootState) => state.manageHotel.hotels)

    const [showCreate, setShowCreate] = useState(false);
    const [roomsData, setRoomsData] = useState<{}[]>([]);
    const [metaData, setMetaData] = useState<IPaginateResponse>({});
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [roomDetail, setRoomDetail] = useState<IRoom>({});

    const [showDelete, setShowDelete] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        setRoomsData(buildRoomData(roomsState))
    }, [roomsState])

    useEffect(() => {
        dispatch({
            type:`${manageHotelActions.getListHotelPending}_saga`,
        })
    },[])

    useEffect(() => {
        setRoomDetail(roomState)        
    }, [roomState])

    useEffect(() => {
        dispatch({
            type: `${manageRoomActions.getListRoomPending}_saga`,
            payload: {
                per_page: 2,
                page: currentPage,
            }
        });
    }, [])



    const handleOnAction = (recordId, action) => {
        if( action === 'edit') {            
            dispatch({
                type:`${manageRoomActions.getRoomDetailPending}_saga`,
                payload: recordId
            })
            
            setShowCreate(true)
        }
        if (action === 'delete') {
            dispatch({
                type:`${manageRoomActions.getRoomDetailPending}_saga`,
                payload: recordId
            })
            setShowDelete(true)
        }
    }

    const handleCreateRoom = (createRoomData: ICreateRoom) => {
        dispatch({
            type: `${manageRoomActions.createRoomPending}_saga`,
            payload: createRoomData,
        })
    }

    const handleUpdateRoom = (updateRoomData: IUpdateRoom) => {
        dispatch({
            type: `${manageRoomActions.updateRoomPending}_saga`,
            payload: updateRoomData
        })
        setShowCreate(false)
    }

    const handleChangePage = (page: number) => {
        setCurrentPage(page)
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

    const handleShowCreate = () => {        
        setRoomDetail({});
        setShowCreate(true);
    }

    const confirmDelete = (recordId: number) => {
        dispatch({
            type: `${manageRoomActions.deleteRoomPending}_saga`,
            payload: recordId,
        })
        setShowDelete(false);
    }

    return(
        <>
            <div className={'float-end p-2'}>
                <Button variant={'success'}
                        className={'d-flex align-items-center'}
                        onClick={handleShowCreate}
                >
                    <BsFillHouseAddFill className={'me-2'}/>
                    Thêm
                </Button>
            </div>

            <TableManage
                headers={['STT', 'Khách Sạn', 'Loại Phòng', 'Tầng', 'Số Phòng', 'Actions']}
                data={roomsData}
                useIdx={true}
                actions={map(typeActions, (action) => ({ type: action }))}
                onAction={handleOnAction}
            />

                <CreateRoomModal
                isShow={showCreate}
                onClose={() => setShowCreate(false)}
                onCreateRoom={handleCreateRoom}
                onUpdateRoom={handleUpdateRoom}
                roomData={roomDetail}
                hotelsData={hotelsState}
            />
            <div className={'d-flex justify-content-center'}>
                <PaginationComponent totalPages={metaData.total_pages} currentPage={currentPage} onChangePage={handleChangePage} />
            </div>

            <DeleteRoomModal isShow={showDelete} onClose={() => setShowDelete(false)} roomDelete={roomDetail} onConfirm={confirmDelete}/>
        </>
    )
}

export default ManageRoom