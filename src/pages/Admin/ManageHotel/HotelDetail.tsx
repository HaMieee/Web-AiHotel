import {Badge, Col, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {manageHotelActions} from "../../../redux/slices/manageHotel.slice";
import {RootState} from "../../../redux/store";
import {IHotel} from "../../../redux/types/hotel";
import {isEmpty, map} from "lodash";
import {IUpdateHotel} from "../../../redux/types/dtos/updateHotel";

const HotelDetail = () => {
    const dispatch = useDispatch();
    const {hotel_id} = useParams();
    const hotelState = useSelector((state: RootState) => state.manageHotels.hotelDetail);

    const [formValueHotel, setFormValueHotel] = useState<IHotel>({
        name: '',
        description: '',
        address: '',
        room_types: [],
    })
    const [idRoomTypes, setIdRoomTypes] = useState<number[] | undefined>([]);

    const [validated, setValidated] = useState(false);
    const [categories, setCategories] = useState(['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5', 'Category 6', 'Category 7']);

    useEffect(() => {
        dispatch({
            type: `${manageHotelActions.getHotelDetailPending}_saga`,
            payload: hotel_id,
        })
    }, [hotel_id])

    useEffect(() => {
        setFormValueHotel({
            name: hotelState.name,
            description: hotelState.description,
            address: hotelState.address,
            room_types: hotelState.room_types,
        })
        if (hotelState.room_types) {
            const roomTypeIds = hotelState.room_types.map(item => item.id);
            setIdRoomTypes(roomTypeIds.filter(id => id != null) as number[]);
        }
    }, [hotelState])

    const handleSubmit = (event) => {
        // const form = event.currentTarget;
        // if (form.checkValidity() === false) {
        //     event.preventDefault();
        //     event.stopPropagation();
        // }
        //
        // setValidated(true);
        const updateHotelData: IUpdateHotel = {
            hotel_id: hotelState.id + '',
            address: formValueHotel.address,
            name: formValueHotel.name,
            description: formValueHotel.description,
            room_types: idRoomTypes,
        }
        console.log(idRoomTypes)
        console.log(updateHotelData)
        dispatch({
            type: `${manageHotelActions.updateHotelPending}_saga`,
            payload: updateHotelData,
        })
    };

    const handleDeleteCategory = (index) => {
        const newCategories = [...categories];
        newCategories.splice(index, 1);
        setCategories(newCategories);
    };

    return (
        <>
            <div className={'container-fluid'}>
                <Form noValidate validated={validated}>
                    <Row className="mb-3">
                        <Form.Group as={Col} md={4}>
                            <Form.Label>Hotel name:</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="First name"
                                value={formValueHotel.name}
                                onChange={e => setFormValueHotel({
                                    ...formValueHotel,
                                    name: e.target.value,
                                })}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md={4}>
                            <Form.Label>Address:</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="First name"
                                value={formValueHotel.address}
                                onChange={e => setFormValueHotel({
                                    ...formValueHotel,
                                    address: e.target.value,
                                })}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="8">
                            <Form.Label>Description:</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Last name"
                                value={formValueHotel.description}
                                onChange={e => setFormValueHotel({
                                    ...formValueHotel,
                                    description: e.target.value,
                                })}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="8">
                            <Form.Label>Room types:</Form.Label>
                            <div className={'d-flex custom-fill'}>
                                <div className={'container-fluid d-flex flex-wrap'}>
                                    {!isEmpty(formValueHotel.room_types) && map(formValueHotel.room_types, (t, i_index) => (
                                        <div key={i_index} className={'p-1'}>
                                            <Button variant="secondary" className="mb-2 me-2">
                                                {t.name}
                                                <Badge bg="dark" className={'ms-2'}>x</Badge>
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Form.Group>
                    </Row>
                    <Button onClick={(e) => handleSubmit(e)}>Submit form</Button>
                </Form>
            </div>
        </>
    )
};

export default HotelDetail;