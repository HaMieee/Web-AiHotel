import React, {useEffect, useState} from "react";
import {Button, Col, Image, Offcanvas, Row} from "react-bootstrap";
import './HotelRooms.css'
import RoomDetail from "./RoomDetail";
import { IoPeopleSharp } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import {IRoom} from "../../redux/types/room";
import {isEmpty} from "lodash";

type IHotelRooms = {
    roomsData: IRoom[];
}

const HotelRooms: React.FC<IHotelRooms> = ({
    roomsData = [],
                                           }) => {
    const [show, setShow] = useState(false);
    const [groupedRooms, setGroupedRooms] = useState({});
    const [roomDetail, setRoomDetail] = useState({});

    useEffect(() => {
        setGroupedRooms(groupRoomsByFloor(roomsData))
    }, [roomsData])

    const handleClose = () => setShow(false);

    const groupRoomsByFloor = (rooms) => {
        const groupedRooms = {};
        rooms.forEach(room => {
            if (!groupedRooms[room.floor]) {
                groupedRooms[room.floor] = [];
            }
            groupedRooms[room.floor].push(room);
        });
        return groupedRooms;
    };

    const handleShowDetail = (room) => {
        setShow(true)
        setRoomDetail(room)
    }

    console.log(groupedRooms)

    return (
        <>
            <div className={'container-fluid'}>
                {!isEmpty(groupedRooms) && Object.keys(groupedRooms).map(floor => (
                    <div className={"container-floors"}>
                        <div className={"floor"}>
                            <h5>Tầng {floor}</h5>
                        </div>
                        <div className={"rooms container-fluid"}>
                            <Row>
                                {groupedRooms[floor].map(room => (
                                    <Col sm={4}>
                                        <div className={"room"}>
                                            <Row>
                                                <Col>
                                                    <Image
                                                        src={'https://i.pinimg.com/564x/81/ff/8b/81ff8be11f48e4ced51bacb31eab8146.jpg'}
                                                        rounded
                                                        fluid
                                                    />
                                                </Col>
                                                <Col>
                                                    <div className={"room-code"}>
                                                        <h4>P.{room.code}</h4>
                                                    </div>
                                                    <div className={"room-title"}>
                                                        <div>{room.room_type.name}</div>
                                                        {/*<div className={'d-flex align-items-center'}>*/}
                                                        {/*    <div className={'me-1'}>4</div>*/}
                                                        {/*    <IoPeopleSharp />*/}
                                                        {/*</div>*/}
                                                    </div>
                                                    <div className={"room-description"}>
                                                        <p>{room.room_type.description}</p>
                                                    </div>
                                                    <div className={"room-price"}>${room.room_type.price}</div>
                                                    <div className={"d-flex"}
                                                         style={{justifyContent: "space-between", alignItems: "center"}}
                                                    >
                                                        <div className={'d-flex align-items-center'}>
                                                            <IoEyeOutline />
                                                            <div className={'ms-2'}>23</div>
                                                        </div>
                                                        <div>
                                                            <Button onClick={() => handleShowDetail(room)}>Detail</Button>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    </div>
                ))}
            </div>

            <RoomDetail show={show}
                        handleClose={handleClose}
                        roomData={roomDetail}
            />
        </>
    )
}

export default HotelRooms;