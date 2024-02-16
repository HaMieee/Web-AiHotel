import Banner from "../../layouts/components/banner/Banner";
import Blog from "../../layouts/components/blog/Blog";
import Header from "../../layouts/components/header/Header";
import Slide from "../../layouts/components/slide/Silde";
import Footer from "../../layouts/footer/Footer";
import Dashboard from "../Dashboard/Dashboard";
import ManageHotel from "../ManageHotel/ManageHotel";
import React from "react";
import {Col, Row} from "react-bootstrap";

const Home = () => {
    return (
        <>
        <Dashboard/>
        <Header/>
        <Slide/>
        <Banner/>
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
        <Blog/>
        <Footer/>

        </>
    )
}

export default Home;