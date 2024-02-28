import {Badge, Col, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import Form from 'react-bootstrap/Form';
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {IReservation} from "../../../redux/types/reservation";
import {manageReservationActions} from "../../../redux/slices/manageReservation.slice";

const ManageReservationDetail = () => {
    const dispatch = useDispatch();
    const {reservation_id} = useParams();
    const reservationState = useSelector((state: RootState) => state.manageReservation.reservation);
    const [formValueReservation, setFormValueReservation] = useState<IReservation>({
        code : '',
        user : {},
        hotel : {},
        room_type : {},
        room : {},
        start_date : '',
        end_date : '',
        check_in : '',
        check_out : '',
        amount_person : 0,
        status : '',
        reject_reason : ''
    });
    useEffect(() => {
        dispatch({
            type: `${manageReservationActions.getReservationPending}_saga`,
            payload: reservation_id,
        });
    }, [reservation_id])
    useEffect(() => {
        setFormValueReservation({
            code : reservationState.code,
            user : reservationState.user,
            hotel : reservationState.hotel,
            room_type : reservationState.room_type,
            room : reservationState.room,
            start_date : reservationState.start_date,
            end_date : reservationState.end_date,
            check_in : reservationState.check_in,
            check_out : reservationState.check_out,
            amount_person : reservationState.amount_person,
            status : reservationState.status,
            reject_reason : reservationState.reject_reason,
        });
    }, [reservationState]);
    console.log(reservationState);
    return (
        <>
            <div className={'container-fluid'}>
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col} md={4}>
                            <Form.Label>Code:</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                value={formValueReservation.code}
                                onChange={e => setFormValueReservation({
                                    ...formValueReservation,
                                    code: e.target.value,
                                })}
                                readOnly={true}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    {/*<Button onClick={(e) => handleSubmit()}>*/}
                    {/*    Xác nhận*/}
                    {/*</Button>*/}
                </Form>
            </div>
        </>
    )
};

export default ManageReservationDetail;