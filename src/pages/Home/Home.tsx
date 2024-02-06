import Banner from "../../layouts/components/banner/Banner";
import Blog from "../../layouts/components/blog/Blog";
import Header from "../../layouts/components/header/Header";
import Slide from "../../layouts/components/slide/Silde";
import Footer from "../../layouts/footer/Footer";
import Dashboard from "../Dashboard/Dashboard";


const Home = () => {
    return (
        <>
        <Dashboard/>
        <Header/>
        <Slide/>
        <Banner/>
        <Blog/>
        <Footer/>

        </>
    )
}

export default Home;