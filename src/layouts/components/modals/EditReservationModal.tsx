import React, { useEffect, useState } from "react";
import { IReservationEdit } from "../../../redux/types/dtos/editReservation";
import { IReservation } from "../../../redux/types/reservation";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import {Col, Row} from "react-bootstrap";

type IEditReservationModal = {
    isShow: boolean;
    onClose: () => void;
    onEditReservation: (payload: IReservationEdit) => void;
    reservationData: IReservation;
}

const EditReservationModal: React.FC<IEditReservationModal> = ({
    isShow = false,
    onClose,
    onEditReservation,
    reservationData
})=> {

    const [formEditReservation, setFormEditReservation] = useState<IReservationEdit>({
       reservation_id: 0,
       start_date:'',
       end_date:'',
       status:'',
    });

    useEffect(() => {
        setFormEditReservation({
            reservation_id: reservationData.id,
            start_date: reservationData.start_date,
            end_date: reservationData.end_date,
            status: reservationData.status
        })
    }, [reservationData])

    const handleEditReservation = () => {
        console.log('on edit');
        
        const payload: IReservationEdit = {
            reservation_id: formEditReservation.reservation_id,
            end_date: formEditReservation.end_date,
            start_date: formEditReservation.start_date,
            status: formEditReservation.status,
        }
        onEditReservation(payload)
        onClose()
    }
    return(
        <>  
            <Modal show={isShow} onHide={onClose} size={'lg'} backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={'container-fluid'}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md={6}>
                                <Form.Label>Trạng Thái</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Trạng Thái"
                                    value={formEditReservation.status}
                                    onChange={e => setFormEditReservation({
                                        ...formEditReservation,
                                       status: e.target.value,
                                    })}
                                />
                            </Form.Group>

                            <Form.Group as={Col} md={6}>
                                <Form.Label>Ngày Bắt Đầu</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Ngày Bắt đầu"
                                    value={formEditReservation.start_date}
                                    onChange={e => setFormEditReservation({
                                        ...formEditReservation,
                                       start_date: e.target.value,
                                    })}
                                />
                            </Form.Group>

                            <Form.Group as={Col} md={6}>
                                <Form.Label>Ngày Kết Thúc</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Ngày Kết Thúc"
                                    value={formEditReservation.end_date}
                                    onChange={e => setFormEditReservation({
                                        ...formEditReservation,
                                       end_date: e.target.value,
                                    })}
                                />
                            </Form.Group>
                        </Row>
                      
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>Đóng</Button>    
                    <Button variant="success" onClick={handleEditReservation}>Cập nhật</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default EditReservationModal