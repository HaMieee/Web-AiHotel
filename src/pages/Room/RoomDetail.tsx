import {Button, Col, Image, Offcanvas, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import './RoomDetail.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { differenceInDays } from 'date-fns';
import { IoEyeOutline } from "react-icons/io5";
import { TbHomeDot } from "react-icons/tb";
import {initEcho} from "../../services/ws.service";
import {IUser} from "../../redux/types/user";

const RoomDetail = ({show, handleClose, roomData}) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [dayNumbers, setDayNumbers] = useState<number>(0);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    const [usersRoom, setUsersRoom] = useState<IUser[]>([]);
    const [roomSelected, setRoomSelected] = useState(null);
    const [roomOldSelected, setRoomOldSelected] = useState(null);

    useEffect(() => {
        if (!(window as any).Echo) {
            (window as any).Echo = initEcho();
        }
    }, []);

    useEffect(() => {
        if (roomSelected) {
            setRoomOldSelected(roomSelected);
        }
        setRoomSelected(roomData.id)
    }, [roomData])

    useEffect(() => {
        if (roomSelected) {
            applyJoin();
        }
    }, [roomSelected])

    useEffect(() => {
        if (startDate && endDate) {
            setDayNumbers(differenceInDays(endDate, startDate) + 1);
        }
    }, [endDate, startDate])

    useEffect(() => {
        setTotalPrice(Number(roomData?.room_type?.price) * dayNumbers)
    }, [dayNumbers, roomData])

    const applyJoin = () => {
        (window as any).Echo?.leave(`presence.room.${roomOldSelected}`);

        (window as any).Echo?.join(`presence.room.${roomSelected}`)
            .here((users) => {
                setUsersRoom(users);
            })
            .joining((user) => {
                setUsersRoom(prevState => [...prevState, user]);
            })
            .leaving((user) => {
                setUsersRoom(prevState => prevState.filter(u => u.id !== user.id));
            });
    }

    const setDateRange = (update) => {
        if (update && update.length === 2) {
            setStartDate(update[0]);
            setEndDate(update[1]);
        }
    };

    console.log('user view: ', usersRoom)

    return (
        <>
            <div className={'container-fluid'}>
                <Offcanvas show={show}
                           onHide={handleClose}
                           style={{width: '30%'}}
                           placement={'end'}>
                    {/*<Offcanvas.Header className={'shadow-sm'}>*/}
                    {/*    <div className={'room-detail-header'}>*/}
                    {/*        <div className={'me-2'}>*/}
                    {/*            <h4>Your brand</h4>*/}
                    {/*        </div>*/}
                    {/*        <div>*/}
                    {/*            <Image src={"https://i.pinimg.com/564x/81/ff/8b/81ff8be11f48e4ced51bacb31eab8146.jpg"}*/}
                    {/*                   rounded*/}
                    {/*                   fluid*/}
                    {/*                   height={100}*/}
                    {/*                   width={100}*/}
                    {/*            />*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</Offcanvas.Header>*/}

                    <Offcanvas.Body>
                        <hr/>
                        <div className={'room-status'}>
                            <div className={'custom-fill'}>Tầng {roomData.floor}</div>
                            <hr style={{color: 'black'}}/>
                            <div className={'custom-stroke'}>P.{roomData.code}</div>
                            <div>
                                <div className={'d-flex align-items-center'}>
                                    <TbHomeDot style={{color: 'green'}}/>
                                    <div className={'ms-1'}>Phòng trống</div>
                                </div>
                                <div className={'d-flex align-items-center'}>
                                    <IoEyeOutline />
                                    <div className={'ms-1'}>{usersRoom.length} views</div>
                                </div>
                            </div>
                        </div>
                        <div className={'room-content'}>
                            <div className={'room-image d-flex mb-2'}>
                                <div className={'p-1'}>
                                    <Image src={'https://i.pinimg.com/564x/81/ff/8b/81ff8be11f48e4ced51bacb31eab8146.jpg'}
                                           rounded
                                           fluid
                                           className={'image-main'}
                                    />
                                </div>
                                <div>
                                    <div className={'p-1'}>
                                        <Image src={'https://i.pinimg.com/564x/81/ff/8b/81ff8be11f48e4ced51bacb31eab8146.jpg'}
                                               rounded
                                               fluid
                                               className={'image-sub'}
                                        />
                                    </div>
                                    <div className={'p-1'}>
                                        <Image src={'https://i.pinimg.com/564x/81/ff/8b/81ff8be11f48e4ced51bacb31eab8146.jpg'}
                                               rounded
                                               fluid
                                               className={'image-sub'}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className={'custom-title'}>{roomData?.room_type?.name}</div>

                            {/*<div className={'container-fluid mb-2'}>*/}
                            {/*    <Row>*/}
                            {/*        <Col md={6}>Bao gom bua sang</Col>*/}
                            {/*        <Col md={6}>Wifi free</Col>*/}
                            {/*        <Col md={6}>View dep</Col>*/}
                            {/*    </Row>*/}
                            {/*</div>*/}

                            <div className={'container-fluid'}>
                                <label className={'title-description'}>Description</label>
                                <div className={'room-detail-description'}>
                                    <p>{roomData?.room_type?.description}</p>
                                </div>
                            </div>

                            <div className={'custom-title d-flex justify-content-between'}>
                                <div>Price</div>
                                <div>${roomData?.room_type?.price}.00/day</div>
                            </div>

                            <div>
                                <label>Start date - End date</label>
                                <DatePicker
                                    selectsRange={true}
                                    startDate={startDate}
                                    endDate={endDate}
                                    onChange={(update) => setDateRange(update)}
                                    withPortal
                                    className="form-control mb-2"
                                />
                            </div>

                            <div className={'container-fluid mb-2'}>
                                <hr />
                                <div className={'d-flex justify-content-between'}>
                                    <div>Room rates</div>
                                    <div>${roomData?.room_type?.price}.00</div>
                                </div>
                                <div className={'d-flex justify-content-between'}>
                                    <div>Days</div>
                                    <div>{dayNumbers} days</div>
                                </div>
                                <div className={'d-flex justify-content-between'}>
                                    <div>Voucher</div>
                                    <div>0</div>
                                </div>
                                <hr />
                                <div className={'d-flex justify-content-between'}>
                                    <div>Total: </div>
                                    <div>${totalPrice}.00</div>
                                </div>
                            </div>

                            <div className={'d-flex justify-content-center'}>
                                <Button>Book room</Button>
                            </div>

                        </div>
                    </Offcanvas.Body>
                </Offcanvas>
            </div>
        </>
    )
}

export default RoomDetail;