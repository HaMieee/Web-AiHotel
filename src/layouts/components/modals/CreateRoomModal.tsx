import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Col, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { ICreateRoom } from '../../../redux/types/createRoom';
import { IRoom } from '../../../redux/types/room';
import { useDispatch } from 'react-redux';
import { isEmpty, map } from 'lodash';
import { IRoomType } from '../../../redux/types/roomType';
import { IHotel } from '../../../redux/types/hotel';

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
        id:0,
        code:'',
        floor:0,
        hotel:'',
        room_type:'',
    });
    const [hotelId, setHotelId] = useState<number | undefined>(0);
    const [roomType, setRoomType] = useState<IRoomType[] | undefined>([]);    
    
    useEffect(() => {
        if (!isShow) {
            handleClearValue()
        }
    }, [isShow])

    useEffect(() => {
        if (roomData) {
            setFormCreateRoom({
                id:roomData.id,
                code:roomData.code,
                room_type:roomData.room_type?.name,
                hotel:roomData.hotel?.name,
                floor:roomData.floor,
            })
        }
    }, [roomData])

    useEffect(() => {
        if (hotelId && hotelsData) {
            const hotel = hotelsData.find(hotel => hotel.id === hotelId)
            setRoomType(hotel?.room_types)
        }
        console.log('in hotel id change');
        
    }, [hotelId])

    const handleClearValue = () => {
        setFormCreateRoom({
            code:'',
            floor:0,
            hotel:'',
            room_type:'',
        
        })
    }

    console.log(roomType);
    

    const handleCreateRoom = async () => {
        const roomData: ICreateRoom = {
            code:formCreateRoom.code,
            floor:formCreateRoom.floor,
            hotel:formCreateRoom.hotel,
            room_type:formCreateRoom.room_type,
 
        }
        onCreateRoom(roomData);
        onClose()
    }

    const dispatch = useDispatch()
    const handleUpdateRoom = () => {
        
    }

    
    
    return(
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
                                <Form.Select aria-label="Default select example">
                                            {hotelsData.map((hotel, h_index) => (
                                                <option 
                                                    key={h_index}
                                                    value={hotel.id} 
                                                    onChange={() => setHotelId(hotel.id)}>
                                                        {hotel.name}
                                                </option>
                                                ))}
                                        </Form.Select>
                            </Form.Group>

                            <Form.Group as={Col} md={6}>
                                <Form.Label>Loại Phòng</Form.Label>
                                <Form.Select aria-label="Default select example">
                                </Form.Select>
                            </Form.Group>

                            <Form.Group as={Col} md={6}>
                                <Form.Label>Tầng</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Tầng"
                                    value={formCreateRoom.floor}
                                    onChange={e => setFormCreateRoom({
                                        ...formCreateRoom,
                                        floor:Number( e.target.value),
                                    })}

                                    
                                />
                            </Form.Group>

                            <Form.Group as={Col} md={6}>
                                <Form.Label>Số Phòng</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Số Phòng"
                                    value={formCreateRoom.code}
                                    onChange={e => setFormCreateRoom({
                                        ...formCreateRoom,
                                        code: e.target.value,
                                    })}
                                />
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
                    <Button variant="success" onClick={handleUpdateRoom}>
                        Cập nhật
                    </Button>
                }
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default CreateRoomModal