import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {manageRoomActions} from "../../redux/slices/manageRoom.slice";
import {useParams} from "react-router";
import {RootState} from "../../redux/store";
import {IRoom} from "../../redux/types/room";
import HotelRooms from "../Room/HotelRooms";
import {Image} from "react-bootstrap";
import {manageHotelActions} from "../../redux/slices/manageHotel.slice";
import {IHotel} from "../../redux/types/hotel";

const HotelDetail = () => {
    const dispatch = useDispatch();
    const hotelDetailState = useSelector((state: RootState) => state.manageHotel.hotelDetail);
    const listRoomState = useSelector((state: RootState) => state.manageRoom.rooms);
    const { hotel_id } = useParams();

    const [hotelDetailData, setHotelDetailData] = useState<IHotel>({});
    const [listRoomData, setListRoomData] = useState<IRoom[]>([]);

    useEffect(() => {
        dispatch({
            type: `${manageHotelActions.getHotelDetailPending}_saga`,
            payload: hotel_id
        });
        dispatch({
            type: `${manageRoomActions.getListRoomPending}_saga`,
            payload: {
                hotel_id: hotel_id,
            }
        });
    }, [hotel_id])

    useEffect(() => {
        setHotelDetailData(hotelDetailState);
        setListRoomData(listRoomState);
    }, [listRoomState, hotelDetailState])

    console.log('rooms data: ', listRoomState)

    return (
        <>
            <div className={'container-fluid'}>
                <div>
                    <h4>{hotelDetailData.name}</h4>
                    <p>{hotelDetailData.address}</p>
                </div>
                <div className={'banner-hotel d-flex'}>
                    <div>
                        <Image src='https://i.pinimg.com/564x/81/ff/8b/81ff8be11f48e4ced51bacb31eab8146.jpg'
                               className={"banner-main"}
                               rounded
                        />
                    </div>
                    <div className={'banner-sub'}>
                        <div className={'d-flex'}
                             style={{justifyContent: "space-evenly"}}
                        >
                            <Image src='https://i.pinimg.com/564x/81/ff/8b/81ff8be11f48e4ced51bacb31eab8146.jpg'
                                   className={"banner-sub1"}
                                   rounded
                            />
                            <Image src='https://i.pinimg.com/564x/81/ff/8b/81ff8be11f48e4ced51bacb31eab8146.jpg'
                                   className={"banner-sub1"}
                                   rounded
                            />
                        </div>
                        <div className={'d-flex'}
                             style={{justifyContent: "space-evenly"}}
                        >
                            <Image src='https://i.pinimg.com/564x/81/ff/8b/81ff8be11f48e4ced51bacb31eab8146.jpg'
                                   className={"banner-sub1"}
                                   rounded
                            />
                            <Image src='https://i.pinimg.com/564x/81/ff/8b/81ff8be11f48e4ced51bacb31eab8146.jpg'
                                   className={"banner-sub1"}
                                   rounded
                            />
                        </div>
                    </div>
                </div>
                <HotelRooms roomsData={listRoomData}/>
            </div>
        </>
    )
}

export default HotelDetail;