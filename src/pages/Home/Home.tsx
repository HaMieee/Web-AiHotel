import Banner from "../../layouts/components/banner/Banner";
import Blog from "../../layouts/components/blog/Blog";
import Slide from "../../layouts/components/slide/Silde";
import ManageHotel from "../ManageHotel/ManageHotel";
import React from "react";
import {Col, Row} from "react-bootstrap";

const Home = () => {
    return (
        <>
        <Slide/>
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
        <Banner/>
        <Blog/>
        </>
    )
}

export default Home;