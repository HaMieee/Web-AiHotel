import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slide1 from '../../../img/slide1.png';
import slide2 from '../../../img/slide2.png';

const Slide = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
      };
      return (
          <div className={'container-fluid'}>
              <Slider {...settings}>
                  <div style={{ width: "100%" }}>
                      <img
                          style={{ width: "100%" }}
                          src={slide1}
                          alt=""
                      />
                  </div>
                  <div style={{ width: "100%" }}>
                      <img
                          style={{ width: "100%" }}
                          src={slide2}
                          alt="Slide 1"
                      />
                  </div>
                  <div style={{ width: "100%" }}>
                      <img
                          style={{ width: "100%", height:"673px"}}
                          src="https://khachsan.webmatrix.vn/wp-content/uploads/2017/06/banner2-1400x721.jpg"
                          alt=""
                      />
                  </div>

                  <div style={{ width: "100%" }}>
                      <img
                          style={{ width: "100%", height:"673px"}}
                          src="https://khachsan.webmatrix.vn/wp-content/uploads/2017/06/banner1-1400x721.jpg"
                          alt=""
                      />
                  </div>
              </Slider>
          </div>
      );
}
export default Slide