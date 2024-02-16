import ManageHotel from "../ManageHotel/ManageHotel";
import React from "react";
import {Col, Row} from "react-bootstrap";

const Home = () => {
    return (
        <>
            <div className={"container-fluid"}>
                <Row>
                    <Col md={4} style={{border: 'solid 1px #CAB39E', borderRadius: '10px'}}>
                        <div className={'container-fluid'}>Page support</div>
                    </Col>
                    <Col>
                        <ManageHotel />
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Home;