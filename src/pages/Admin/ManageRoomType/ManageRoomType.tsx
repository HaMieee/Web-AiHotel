import {Button} from "react-bootstrap";
import {BsFillHouseAddFill} from "react-icons/bs";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {IRoomType} from "../../../redux/types/roomType";
import {manageRoomTypeActions} from "../../../redux/slices/manageRoomType.slice";
import TableManage from "../../../layouts/components/table/TableManage";
import {map} from "lodash";

const typeActions = ['delete', 'detail'];

const ManageRoomType = () => {
    const dispatch = useDispatch();
    const roomTypesState = useSelector((state: RootState) => state.manageRoomType.room_types)
    const [showCreate, setShowCreate] = useState(false);
    const [roomTypesData, setRoomTypesData] = useState<IRoomType[]>([]);

    useEffect(() => {
        dispatch({
            type: `${manageRoomTypeActions.getListRoomTypePending}_saga`,
        });
    }, [])

    useEffect(() => {
        setRoomTypesData(buildRoomTypeData(roomTypesState))
    }, [roomTypesState])

    const buildRoomTypeData = (data: IRoomType[]) => {
        return data.map(item => {
            return {
                id: item.id,
                name: item.name,
                code: item.code,
                price: item.price,
            }
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
                headers={['STT', 'Name', 'Code', 'Price', 'Actions']}
                data={roomTypesData}
                actions={map(typeActions, (action) => ({ type: action }))}
            />
        </>
    )
}

export default ManageRoomType;