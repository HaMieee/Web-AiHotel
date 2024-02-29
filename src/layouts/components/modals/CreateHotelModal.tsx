import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Col, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {IRoomType} from "../../../redux/types/roomType";
import {IHotel} from "../../../redux/types/hotel";
import {ICreateHotel} from "../../../redux/types/dtos/createHotel";

type ICreateHotelModal = {
    isShow: boolean;
    onClose: () => void;
    roomTypesData: IRoomType[];
    onCreateHotel: (payload: ICreateHotel) => void;
}
const CreateHotelModal: React.FC<ICreateHotelModal> = ({
    isShow = false,
    onClose,
    roomTypesData = [],
    onCreateHotel,
                                                       }) => {
    const [formCreateHotel, setFormCreateHotel] = useState<IHotel>({
        name: '',
        address: '',
        description: '',
    });
    const [selectRoomTypes, setSelectRoomTypes] = useState<number[]>([]);

    const handleSelectRoomTypes = (roomId: number | undefined) => {
        if (roomId) {
            if (selectRoomTypes.includes(roomId)) {
                setSelectRoomTypes(selectRoomTypes.filter(id => id !== roomId));
            } else {
                setSelectRoomTypes([ ...selectRoomTypes, roomId ])
            }
        }
    };

    const handleCreateHotel = () => {
        const hotelData: ICreateHotel = {
            name: formCreateHotel.name,
            address: formCreateHotel.address,
            description: formCreateHotel.description,
            room_types: selectRoomTypes,
        }
        onCreateHotel(hotelData);
        onClose();
    }

    return (
        <>
            <Modal show={isShow} onHide={onClose} size={'lg'} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Khách sạn mới: </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={'container-fluid'}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md={6}>
                                <Form.Label>Tên khách sạn:</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="hotel name..."
                                    value={formCreateHotel.name}
                                    onChange={e => setFormCreateHotel({
                                        ...formCreateHotel,
                                        name: e.target.value,
                                    })}
                                />
                            </Form.Group>

                            <Form.Group as={Col} md={6}>
                                <Form.Label>Địa chỉ:</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="address..."
                                    value={formCreateHotel.address}
                                    onChange={e => setFormCreateHotel({
                                        ...formCreateHotel,
                                        address: e.target.value,
                                    })}
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group className="mb-3">
                                <Form.Label>Mô tả:</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    placeholder={'description...'}
                                    rows={3}
                                    onChange={e => setFormCreateHotel({
                                        ...formCreateHotel,
                                        description: e.target.value,
                                    })}
                                />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group className="mb-3">
                                <Form.Label>Các kiểu phòng: </Form.Label>
                                <div>
                                    {roomTypesData.map((type) => (
                                        <Form.Check
                                            key={type.id}
                                            inline
                                            label={type?.name}
                                            name="group1"
                                            type={'checkbox'}
                                            onChange={() => handleSelectRoomTypes(type?.id)}
                                        />
                                    ))}
                                </div>
                            </Form.Group>
                        </Row>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>
                        Đóng
                    </Button>
                    <Button variant="success" onClick={handleCreateHotel}>
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default CreateHotelModal;