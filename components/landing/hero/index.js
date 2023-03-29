import Slider from "react-slick"
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import sliderApi from "../../../api/slider";
import { constant } from "../../../constant";

const Hero = ({HeroContent, SliderContent}) => {
    const [content, setContent] = useState([
        {
            landing_id: 1,
            key: "Hero Main",
            position: "hero",
            content: "Ekonomi Sirkular",
        },
        {
            landing_id: 2,
            key: "Hero Sub",
            position: "hero",
            content: '“Circular economy not only is good for us, but is also financially very strong to generate competitive advantage.”',
        }
    ])
    const [sliderContent, setSliderContent] = useState([
        {
            "slider_id": 1,
            "image": "slider.png"
        }
    ])
    const settings = {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 3500,
        autoplaySpeed: 2000,
        cssEase: "linear"
      };
    useEffect(() => {
        if (HeroContent != null) {
            setContent(HeroContent)
        }
    }, [HeroContent])
    useEffect(() => {
        if (SliderContent != null) {
            setSliderContent(SliderContent)
        }
    }, [Slider])
    return (
        <>
        <div className="hero h-100 z-10">
            {
                Slider == null ? (
                    <Slider {...settings}>
                        <div className="bg-header h-100">
                            <h1>Header 1</h1>
                        </div>
                        <div className="bg-header h-100">
                            <h1>Header 2</h1>
                        </div>
                        <div className="bg-header h-100">
                            <h1>Header 3</h1>
                        </div>
                    </Slider>
                ): (
                    <Slider {...settings}>
                        {sliderContent.map((item, index) => (
                            <div className="h-100 w-full" key={index.toString()}>
                                <div className="h-100 w-full bg-cover bg-center" style={{
                                    backgroundImage: `url(${constant.backendURL}/${item.image})`,
                                }}>
                                </div>
                            </div>
                        ))}
                    </Slider>
                )
            }
            <div className='flex flex-col h-100 w-full justify-center content-center absolute top-20 left-0'>
                <div className='mb-36'>
                    <h1 className='text-3xl md:text-5xl font-rubik text-white font-semibold text-center'>{content[0].content}</h1>
                    <p className='text-white text-center text-lg md:text-2xl w-2/3 m-auto mt-4 font-rubik'>{content[1].content}</p>
                </div>
            </div>
        </div>
        </>
    )
}

export default Hero