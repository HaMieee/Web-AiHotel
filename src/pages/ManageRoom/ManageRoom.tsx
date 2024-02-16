import React, {useState} from "react";
import {Button, Col, Image, Offcanvas, Row} from "react-bootstrap";
import './ManageRoom.css'
import RoomDetail from "./RoomDetail";
import { IoPeopleSharp } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";


const ManageRoom = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className={'container-fluid'}>
                <div>
                    <h4>HANZ Artisan Lakeview Hotel Hanoi</h4>
                    <p>Vinh Hung, Hoang Mai, Ha Noi</p>
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
                <div className={"container-floors"}>
                    <div className={"floor"}>
                        <h5>Tang 1</h5>
                    </div>
                    <div className={"rooms container-fluid"}>
                        <Row>
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
                                                <h4>P.301</h4>
                                            </div>
                                            <div className={"room-title"}>
                                                <div>Phong doi</div>
                                                <div className={'d-flex align-items-center'}>
                                                    <div className={'me-1'}>4</div>
                                                    <IoPeopleSharp />
                                                </div>
                                            </div>
                                            <div className={"room-description"}>
                                                <p>2 phong co king, 1 phong tam</p>
                                            </div>
                                            <div className={"room-price"}>$150.00</div>
                                            <div className={"d-flex"}
                                                 style={{justifyContent: "space-between", alignItems: "center"}}
                                            >
                                                <div className={'d-flex align-items-center'}>
                                                    <IoEyeOutline />
                                                    <div className={'ms-2'}>23</div>
                                                </div>
                                                <div>
                                                    <Button onClick={handleShow}>Detail</Button>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
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
                                                <h4>P.301</h4>
                                            </div>
                                            <div className={"room-title"}>
                                                <div>Phong doi</div>
                                                <div className={'d-flex align-items-center'}>
                                                    <div className={'me-1'}>4</div>
                                                    <IoPeopleSharp />
                                                </div>
                                            </div>
                                            <div className={"room-description"}>
                                                <p>2 phong co king, 1 phong tam</p>
                                            </div>
                                            <div className={"room-price"}>$150.00</div>
                                            <div className={"d-flex"}
                                                 style={{justifyContent: "space-between", alignItems: "center"}}
                                            >
                                                <div className={'d-flex align-items-center'}>
                                                    <IoEyeOutline />
                                                    <div className={'ms-2'}>23</div>
                                                </div>
                                                <div>
                                                    <Button onClick={handleShow}>Detail</Button>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
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
                                                <h4>P.301</h4>
                                            </div>
                                            <div className={"room-title"}>
                                                <div>Phong doi</div>
                                                <div className={'d-flex align-items-center'}>
                                                    <div className={'me-1'}>4</div>
                                                    <IoPeopleSharp />
                                                </div>
                                            </div>
                                            <div className={"room-description"}>
                                                <p>2 phong co king, 1 phong tam</p>
                                            </div>
                                            <div className={"room-price"}>$150.00</div>
                                            <div className={"d-flex"}
                                                 style={{justifyContent: "space-between", alignItems: "center"}}
                                            >
                                                <div className={'d-flex align-items-center'}>
                                                    <IoEyeOutline />
                                                    <div className={'ms-2'}>23</div>
                                                </div>
                                                <div>
                                                    <Button onClick={handleShow}>Detail</Button>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
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
                                                <h4>P.301</h4>
                                            </div>
                                            <div className={"room-title"}>
                                                <div>Phong doi</div>
                                                <div className={'d-flex align-items-center'}>
                                                    <div className={'me-1'}>4</div>
                                                    <IoPeopleSharp />
                                                </div>
                                            </div>
                                            <div className={"room-description"}>
                                                <p>2 phong co king, 1 phong tam</p>
                                            </div>
                                            <div className={"room-price"}>$150.00</div>
                                            <div className={"d-flex"}
                                                 style={{justifyContent: "space-between", alignItems: "center"}}
                                            >
                                                <div className={'d-flex align-items-center'}>
                                                    <IoEyeOutline />
                                                    <div className={'ms-2'}>23</div>
                                                </div>
                                                <div>
                                                    <Button onClick={handleShow}>Detail</Button>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
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
                                                <h4>P.301</h4>
                                            </div>
                                            <div className={"room-title"}>
                                                <div>Phong doi</div>
                                                <div className={'d-flex align-items-center'}>
                                                    <div className={'me-1'}>4</div>
                                                    <IoPeopleSharp />
                                                </div>
                                            </div>
                                            <div className={"room-description"}>
                                                <p>2 phong co king, 1 phong tam</p>
                                            </div>
                                            <div className={"room-price"}>$150.00</div>
                                            <div className={"d-flex"}
                                                 style={{justifyContent: "space-between", alignItems: "center"}}
                                            >
                                                <div className={'d-flex align-items-center'}>
                                                    <IoEyeOutline />
                                                    <div className={'ms-2'}>23</div>
                                                </div>
                                                <div>
                                                    <Button onClick={handleShow}>Detail</Button>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
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
                                                <h4>P.301</h4>
                                            </div>
                                            <div className={"room-title"}>
                                                <div>Phong doi</div>
                                                <div className={'d-flex align-items-center'}>
                                                    <div className={'me-1'}>4</div>
                                                    <IoPeopleSharp />
                                                </div>
                                            </div>
                                            <div className={"room-description"}>
                                                <p>2 phong co king, 1 phong tam</p>
                                            </div>
                                            <div className={"room-price"}>$150.00</div>
                                            <div className={"d-flex"}
                                                 style={{justifyContent: "space-between", alignItems: "center"}}
                                            >
                                                <div className={'d-flex align-items-center'}>
                                                    <IoEyeOutline />
                                                    <div className={'ms-2'}>23</div>
                                                </div>
                                                <div>
                                                    <Button onClick={handleShow}>Detail</Button>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>

                <div className={"container-floors"}>
                    <div className={"floor"}>
                        <h5>Tang 2</h5>
                    </div>
                    <div className={"rooms container-fluid"}>
                        <Row>
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
                                                <h4>P.301</h4>
                                            </div>
                                            <div className={"room-title"}>
                                                <div>Phong doi</div>
                                                <div className={'d-flex align-items-center'}>
                                                    <div className={'me-1'}>4</div>
                                                    <IoPeopleSharp />
                                                </div>
                                            </div>
                                            <div className={"room-description"}>
                                                <p>2 phong co king, 1 phong tam</p>
                                            </div>
                                            <div className={"room-price"}>$150.00</div>
                                            <div className={"d-flex"}
                                                 style={{justifyContent: "space-between", alignItems: "center"}}
                                            >
                                                <div className={'d-flex align-items-center'}>
                                                    <IoEyeOutline />
                                                    <div className={'ms-2'}>23</div>
                                                </div>
                                                <div>
                                                    <Button onClick={handleShow}>Detail</Button>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
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
                                                <h4>P.301</h4>
                                            </div>
                                            <div className={"room-title"}>
                                                <div>Phong doi</div>
                                                <div className={'d-flex align-items-center'}>
                                                    <div className={'me-1'}>4</div>
                                                    <IoPeopleSharp />
                                                </div>
                                            </div>
                                            <div className={"room-description"}>
                                                <p>2 phong co king, 1 phong tam</p>
                                            </div>
                                            <div className={"room-price"}>$150.00</div>
                                            <div className={"d-flex"}
                                                 style={{justifyContent: "space-between", alignItems: "center"}}
                                            >
                                                <div className={'d-flex align-items-center'}>
                                                    <IoEyeOutline />
                                                    <div className={'ms-2'}>23</div>
                                                </div>
                                                <div>
                                                    <Button onClick={handleShow}>Detail</Button>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>

            <RoomDetail show={show}
                        handleClose={handleClose}
            />
        </>
    )
}

export default ManageRoom;