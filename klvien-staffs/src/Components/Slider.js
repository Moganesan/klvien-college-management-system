import Styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = Styled(Slider)`
   width: 95%;
   margin-top: 30px;
   .slick-dots li button:before{
     font-size: 10px;
   }
   .slick-dots li button{
     margin: 50px;
   }
   .slick-dots li.slick-active button:before{
     color: #B2B1B9;
   }
`;

const Wrap = Styled.div`
 overflow: hidden;
 
   img{
     width: 100%;
     height: 100%;
     border-radius: 30px;
     transition-duration: 300ms;
   }
`;

const ImageSlider = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    fade: true,
    arrows: false,
  };
  return (
    <Carousel {...settings}>
      <Wrap>
        <img
          src={
            "https://wowslider.com/sliders/demo-18/data1/images/hongkong1081704.jpg"
          }
        />
      </Wrap>
      <Wrap>
        <img
          src={
            "https://wowslider.com/sliders/demo-18/data1/images/hongkong1081704.jpg"
          }
        />
      </Wrap>
      <Wrap>
        <img
          src={
            "https://wowslider.com/sliders/demo-18/data1/images/hongkong1081704.jpg"
          }
        />
      </Wrap>
      <Wrap>
        <img
          src={
            "https://wowslider.com/sliders/demo-18/data1/images/hongkong1081704.jpg"
          }
        />
      </Wrap>
    </Carousel>
  );
};

export default ImageSlider;
