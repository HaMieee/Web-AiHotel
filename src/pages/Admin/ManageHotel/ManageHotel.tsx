import TableManage from "../../../layouts/components/table/TableManage";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {manageHotelActions} from "../../../redux/slices/manageHotel.slice";
import {RootState} from "../../../redux/store";
import {IHotel} from "../../../redux/types/hotel";
import {map} from "lodash";
import {useNavigate} from "react-router";
import {Button} from "react-bootstrap";
import { BsFillHouseAddFill } from "react-icons/bs";
import CreateHotelModal from "../../../layouts/components/modals/CreateHotelModal";
import {manageRoomTypeActions} from "../../../redux/slices/manageRoomType.slice";
import {IRoomType} from "../../../redux/types/roomType";
import {ICreateHotel} from "../../../redux/types/dtos/createHotel";


const typeActions = ['delete', 'detail'];

const ManageHotel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const hotelsState: IHotel[] = useSelector((state: RootState) => state.manageHotel.hotels);
    const roomTypesState: IRoomType[] = useSelector((state: RootState) => state.manageRoomType.room_types);
    const [hotelsData, setHotelsData] = useState<IHotel[]>([]);
    const [roomTypesData, setRoomTypesData] = useState<IRoomType[]>([]);
    const [showCreate, setShowCreate] = useState(false);

    useEffect(() => {
        dispatch({
            type: `${manageHotelActions.getListHotelPending}_saga`,
        });
        dispatch({
            type: `${manageRoomTypeActions.getListRoomTypePending}_saga`,
        })
    }, [])

    useEffect(() => {
        const hotels = hotelsState.map(hotel => {
            const newHotel = { ...hotel };
            delete newHotel.room_types;
            return newHotel;
        })
        setHotelsData(hotels);
        setRoomTypesData(roomTypesState);
    }, [hotelsState, roomTypesState])

    const handleOnAction = (recordId, action) => {
        if (action === 'detail') {
            return navigate(`/manage-hotel/${recordId}`)
        }
    }

    const handleCreateHotel = (createHotelData: ICreateHotel) => {
        dispatch({
            type: `${manageHotelActions.createHotelPending}_saga`,
            payload: createHotelData,
        })
    }

    return (
        <>
            <div className={'float-end p-2'}>
                <Button variant={'success'}
                        className={'d-flex align-items-center'}
                        onClick={() => setShowCreate(true)}
                >
                    <BsFillHouseAddFill className={'me-2'}/>
                    Thêm
                </Button>
            </div>
            <TableManage
                headers={['STT', 'Name', 'Address', 'Description', 'Actions']}
                data={hotelsData}
                useIdx={true}
                actions={map(typeActions, (action) => ({ type: action }))}
                onAction={handleOnAction}
            />

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