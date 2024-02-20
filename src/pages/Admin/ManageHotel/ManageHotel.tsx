import TableManage from "../../../layouts/components/table/TableManage";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {manageHotelActions} from "../../../redux/slices/manageHotel.slice";
import {RootState} from "../../../redux/store";
import {IHotel} from "../../../redux/types/hotel";
import {map} from "lodash";
import {useNavigate} from "react-router";

const typeActions = ['delete', 'detail'];

const ManageHotel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const hotelsState: IHotel[] = useSelector((state: RootState) => state.manageHotels.hotels);
    const [hotelsData, setHotelsData] = useState<IHotel[]>([]);

    useEffect(() => {
        dispatch({
            type: `${manageHotelActions.getListHotelPending}_saga`,
        })
    }, [])

    useEffect(() => {
        const hotels = hotelsState.map(hotel => {
            const newHotel = { ...hotel };
            delete newHotel.room_types;
            return newHotel;
        })
        setHotelsData(hotels)
    }, [hotelsState])

    const handleOnAction = (recordId, action) => {
        if (action === 'detail') {
            return navigate(`/manage-hotel/${recordId}`)
        }
    }

    console.log('hotels: ', hotelsState)

    return (
        <>
            <TableManage
                headers={['STT', 'Name', 'Address', 'Description', 'Actions']}
                data={hotelsData}
                useIdx={true}
                actions={map(typeActions, (action) => ({ type: action }))}
                onAction={handleOnAction}
            />
        </>
    )
}

export default ManageHotel;