import {Button, Col, Image, Offcanvas, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import './RoomDetail.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {differenceInDays} from 'date-fns';
import { IoEyeOutline } from "react-icons/io5";
import { TbHomeDot } from "react-icons/tb";
import {initEcho} from "../../services/ws.service";
import {IUser} from "../../redux/types/user";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import {IReservationCreate} from "../../redux/types/dtos/createReservation";
import ReservationConfirmModal from "../../layouts/components/modals/ReservationConfirmModal";
import {manageReservationActions} from "../../redux/slices/manageReservation.slice";
import {useDispatch} from "react-redux";
import {toast} from 'react-toastify';


const RoomDetail = ({show, handleClose, roomData}) => {
    const dispatch = useDispatch();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [dayNumbers, setDayNumbers] = useState<number>(0);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [amountPeople, setAmountPeople] = useState<number>(1);
    const [showReservationConfirm, setShowReservationConfirm] = useState(false);
    const [reservationData, setReservationData] = useState({});

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

    const inValidDate = () => {
        let isCheck;
        const currentDate = new Date();
        const startDateObj = new Date(startDate);
        const startDateDateOnly = new Date(startDateObj.getFullYear(), startDateObj.getMonth(), startDateObj.getDate());
        const currentDateDateOnly = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
        isCheck = startDateDateOnly >= currentDateDateOnly;
        return isCheck;
    }

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const handleBookRoom = () => {
        if (startDate && endDate) {
            if (inValidDate()) {
                setReservationData({
                    room_code: roomData.id,
                    start_date: formatDate(startDate),
                    end_date: formatDate(endDate),
                    room_price: roomData.room_type?.price,
                    days: dayNumbers,
                    total: totalPrice,
                    amount_person: amountPeople,
                })
                setShowReservationConfirm(true)
            } else {
                toast.error('Chọn ngày lớn hơn hoặc bằng hiện tại!')
            }
        } else {
            toast.error('Vui lòng chọn ngày đặt!')
        }
    }

    const handleConfirm = () => {
        const payload: IReservationCreate = {
            room_id: roomData.id,
            start_date: formatDate(startDate),
            end_date: formatDate(endDate),
            amount_person: amountPeople,
        };
        dispatch({
            type: `${manageReservationActions.createReservationPending}_saga`,
            payload: payload,
        })
        setShowReservationConfirm(false);
    }

    return (
        <>
            <div className={'container-fluid'}>
                <Offcanvas show={show}
                           onHide={handleClose}
                           style={{width: '30%'}}
                           placement={'end'}>
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

                            <div>
                                <FloatingLabel label="Amount people">
                                    <Form.Select value={amountPeople}
                                                 onChange={(e) => setAmountPeople(parseInt(e.target.value))}>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </Form.Select>
                                </FloatingLabel>
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
                                <Button onClick={handleBookRoom}>Book room</Button>
                            </div>

                        </div>
                    </Offcanvas.Body>
                </Offcanvas>
            </div>

            <ReservationConfirmModal
                isShow={showReservationConfirm}
                onClose={() => setShowReservationConfirm(false)}
                data={reservationData}
                onConfirm={handleConfirm}
            />
        </>
    )
}

export default RoomDetail;