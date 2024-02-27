import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Col, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {ICreateRoom} from '../../../redux/types/createRoom';
import {IRoom} from '../../../redux/types/room';
import {toast} from 'react-toastify';
import {isEmpty, map} from 'lodash';
import {IRoomType} from '../../../redux/types/roomType';
import {IHotel} from '../../../redux/types/hotel';

type ICreateRoomModal = {
    isShow: boolean;
    onClose: () => void;
    onCreateRoom: (payload: ICreateRoom) => void;
    hotelsData: IHotel[];
    roomData: IRoom;
}

const CreateRoomModal: React.FC<ICreateRoomModal> = ({
                                                         isShow = false,
                                                         onClose,
                                                         onCreateRoom,
                                                         hotelsData = [],
                                                         roomData,
                                                     }) => {
    const [formCreateRoom, setFormCreateRoom] = useState<ICreateRoom>({
        id: 0,
        floor: 1,
        hotel_id: 0,
        room_type_id: 0,
    });
    const [roomType, setRoomType] = useState<IRoomType[] | undefined>([]);
    const [floors, setFloors] = useState<number>(10);

    useEffect(() => {
        if (!isShow) {
            handleClearValue()
        }
    }, [isShow])

    const handleClearValue = () => {
        setFormCreateRoom({
            floor: 1,
            hotel_id: 0,
            room_type_id: 0,
        })
    }

    const handleCreateRoom = async () => {
        const roomData: ICreateRoom = {
            floor: formCreateRoom.floor,
            hotel_id: formCreateRoom.hotel_id,
            room_type_id: formCreateRoom.room_type_id,

        }
        if (!(roomData.hotel_id === 0)) {
            if (!(roomData.room_type_id === 0)) {
                onCreateRoom(roomData);
                onClose()
            } else {
                toast.error('Vui lòng chọn loại phòng!')
            }
        } else {
            toast.error('Vui lòng chọn khách sạn!')
        }
    }

    const handleOnChangeHotel = (hotel_id: number | undefined) => {
        if (hotel_id) {
            const hotel = hotelsData.find(hotel => hotel.id === hotel_id);
            setRoomType(hotel?.room_types)
        }
        setFormCreateRoom({
            ...formCreateRoom,
            hotel_id: hotel_id,
        })
    }

    return (
        <>
            <Modal show={isShow} onHide={onClose} size={'lg'} backdrop="static"
            >
                <Modal.Header closeButton>
                    {isEmpty(roomData) ? <Modal.Title>Create</Modal.Title> : <Modal.Title>Update</Modal.Title>}
                </Modal.Header>

                <Modal.Body>
                    <div className={'container-fluid'}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md={6}>
                                <Form.Label>Khách sạn</Form.Label>
                                <Form.Select onChange={(e) => handleOnChangeHotel(parseInt(e.target.value))}>
                                    <option disabled selected>-- Chọn khách sạn --</option>
                                    {hotelsData.map((hotel, h_index) => (
                                        <option
                                            key={h_index}
                                            value={hotel.id}
                                        >
                                            {hotel.name}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group as={Col} md={6}>
                                <Form.Label>Loại Phòng</Form.Label>
                                <Form.Select onChange={(e) => setFormCreateRoom({
                                    ...formCreateRoom,
                                    room_type_id: parseInt(e.target.value)
                                })}>
                                    <option disabled selected>-- Chọn loại phòng --</option>
                                    {roomType?.map((type, t_index) => (
                                        <option
                                            key={t_index}
                                            value={type.id}
                                        >
                                            {type.name}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group as={Col} md={6}>
                                <Form.Label>Tầng</Form.Label>
                                <Form.Select onChange={(e) => setFormCreateRoom({
                                    ...formCreateRoom,
                                    floor: parseInt(e.target.value)
                                })}>
                                    {Array.from({ length: floors }, (_, index) => (
                                        <option key={index + 1} value={index + 1}>Floor {index + 1}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Row>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>
                        Đóng
                    </Button>
                    {isEmpty(roomData)
                        ?
                        <Button variant="success" onClick={handleCreateRoom}>
                            Tạo
                        </Button>
                        :
                        <Button variant="success">
                            Cập nhật
                        </Button>
                    }
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default CreateRoomModal