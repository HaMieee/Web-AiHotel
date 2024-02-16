import Image from 'react-bootstrap/Image';
import React from "react";
import {Button, Col, Row} from "react-bootstrap";
import {IoIosArrowForward} from "react-icons/io";
import './ManageHotel.css';
import {useNavigate} from "react-router";

const ManageHotel = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className={"container-fluid"}>
                <div>
                    <h3>Most famous hotel in Ha Noi</h3>
                </div>

                <div className={"container-hotel"}>
                    <Row>
                        <Col sm={3}>
                            <Image src="https://i.pinimg.com/564x/81/ff/8b/81ff8be11f48e4ced51bacb31eab8146.jpg"
                                   rounded
                                   fluid
                            />
                        </Col>
                        <Col>
                            <Row>
                                <Col>
                                    <Row className={"hotel-title"}>
                                        <h5>HANZ Artisan Lakeview Hotel Hanoi</h5>
                                        <p style={{color: "#CAB39E", fontSize: "13px"}}>Vinh Hung, Hoang Mai, Ha Noi</p>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <div className={"hotel-description"}>
                                                <h6>Phong tieu chuan 4 nguoi</h6>
                                                <ul>
                                                    <li>2 giuong doi</li>
                                                    <li>1 phong tam</li>
                                                </ul>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col sm={4} style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between'
                                }}>
                                    <Row style={{textAlign: "end"}}>
                                        <Col className={"rate"}>
                                            <h6>Great</h6>
                                            <p style={{color: "#CAB39E"}}>231 votes</p>
                                        </Col>
                                        <Col style={{textAlign: "center"}}>
                                            <p className={"rate-star"}>4.8</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col style={{textAlign: "end"}}>
                                            <h5 style={{color: "#FC9A3F"}}>$ 150.00</h5>
                                            <Button style={{fontWeight: "500"}} onClick={() => navigate('/hotel/1')}>
                                                <span>Check room</span>
                                                <i><IoIosArrowForward size={"20px"}/></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>

                <div className={"container-hotel"}>
                    <Row>
                        <Col sm={3}>
                            <Image src="https://i.pinimg.com/564x/81/ff/8b/81ff8be11f48e4ced51bacb31eab8146.jpg"
                                   rounded
                                   fluid
                            />
                        </Col>
                        <Col>
                            <Row>
                                <Col>
                                    <Row className={"hotel-title"}>
                                        <h5>HANZ Artisan Lakeview Hotel Hanoi</h5>
                                        <p style={{color: "#CAB39E", fontSize: "13px"}}>Vinh Hung, Hoang Mai, Ha Noi</p>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <div className={"hotel-description"}>
                                                <h6>Phong tieu chuan 4 nguoi</h6>
                                                <ul>
                                                    <li>2 giuong doi</li>
                                                    <li>1 phong tam</li>
                                                </ul>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col sm={4} style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between'
                                }}>
                                    <Row style={{textAlign: "end"}}>
                                        <Col className={"rate"}>
                                            <h6>Great</h6>
                                            <p style={{color: "#CAB39E"}}>231 votes</p>
                                        </Col>
                                        <Col style={{textAlign: "center"}}>
                                            <p className={"rate-star"}>4.8</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col style={{textAlign: "end"}}>
                                            <h5 style={{color: "#FC9A3F"}}>$ 150.00</h5>
                                            <Button style={{fontWeight: "500"}} onClick={() => navigate('/hotel/1')}>
                                                <span>Check room</span>
                                                <i><IoIosArrowForward size={"20px"}/></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>

                <div className={"container-hotel"}>
                    <Row>
                        <Col sm={3}>
                            <Image src="https://i.pinimg.com/564x/81/ff/8b/81ff8be11f48e4ced51bacb31eab8146.jpg"
                                   rounded
                                   fluid
                            />
                        </Col>
                        <Col>
                            <Row>
                                <Col>
                                    <Row className={"hotel-title"}>
                                        <h5>HANZ Artisan Lakeview Hotel Hanoi</h5>
                                        <p style={{color: "#CAB39E", fontSize: "13px"}}>Vinh Hung, Hoang Mai, Ha Noi</p>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <div className={"hotel-description"}>
                                                <h6>Phong tieu chuan 4 nguoi</h6>
                                                <ul>
                                                    <li>2 giuong doi</li>
                                                    <li>1 phong tam</li>
                                                </ul>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col sm={4} style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between'
                                }}>
                                    <Row style={{textAlign: "end"}}>
                                        <Col className={"rate"}>
                                            <h6>Great</h6>
                                            <p style={{color: "#CAB39E"}}>231 votes</p>
                                        </Col>
                                        <Col style={{textAlign: "center"}}>
                                            <p className={"rate-star"}>4.8</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col style={{textAlign: "end"}}>
                                            <h5 style={{color: "#FC9A3F"}}>$ 150.00</h5>
                                            <Button style={{fontWeight: "500"}} onClick={() => navigate('/hotel/1')}>
                                                <span>Check room</span>
                                                <i><IoIosArrowForward size={"20px"}/></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>

                <div className={"container-hotel"}>
                    <Row>
                        <Col sm={3}>
                            <Image src="https://i.pinimg.com/564x/81/ff/8b/81ff8be11f48e4ced51bacb31eab8146.jpg"
                                   rounded
                                   fluid
                            />
                        </Col>
                        <Col>
                            <Row>
                                <Col>
                                    <Row className={"hotel-title"}>
                                        <h5>HANZ Artisan Lakeview Hotel Hanoi</h5>
                                        <p style={{color: "#CAB39E", fontSize: "13px"}}>Vinh Hung, Hoang Mai, Ha Noi</p>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <div className={"hotel-description"}>
                                                <h6>Phong tieu chuan 4 nguoi</h6>
                                                <ul>
                                                    <li>2 giuong doi</li>
                                                    <li>1 phong tam</li>
                                                </ul>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col sm={4} style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between'
                                }}>
                                    <Row style={{textAlign: "end"}}>
                                        <Col className={"rate"}>
                                            <h6>Great</h6>
                                            <p style={{color: "#CAB39E"}}>231 votes</p>
                                        </Col>
                                        <Col style={{textAlign: "center"}}>
                                            <p className={"rate-star"}>4.8</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col style={{textAlign: "end"}}>
                                            <h5 style={{color: "#FC9A3F"}}>$ 150.00</h5>
                                            <Button style={{fontWeight: "500"}} onClick={() => navigate('/hotel/1')}>
                                                <span>Check room</span>
                                                <i><IoIosArrowForward size={"20px"}/></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}

export default ManageHotel;