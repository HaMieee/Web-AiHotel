import Banner from "../../layouts/components/banner/Banner";
import Blog from "../../layouts/components/blog/Blog";
import Slide from "../../layouts/components/slide/Silde";
import React from "react";
import Hotel from "../Hotel/Hotel";

const Home = () => {
    return (
        <>
        {/* <Slide/> */}
        <Hotel/>
        <Banner/>
        <Blog/>
        </>
    )
}

export default Home;