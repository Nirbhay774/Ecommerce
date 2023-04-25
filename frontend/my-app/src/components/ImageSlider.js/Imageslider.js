import React from 'react'
import SimpleImageSlider from "react-simple-image-slider";



const SlideImage = () => {

    const sliderImages = [
        {
        url:"https://m.media-amazon.com/images/I/61+Om+g+8SL._SX3000_.jpg"
           
        },
    {
        url:"https://m.media-amazon.com/images/I/51ovs76vmtL._SX3000_.jpg"
    }
,
{
    url:"https://images-eu.ssl-images-amazon.com/images/G/31/img23/IN/OHL/GW/Slide1/Unrec/Hero/PC_Hero_3000x1200_3_2x_1._CB592407529_.jpg"
}]
  return (
    <div>
    <h3>
     
    </h3>
    <SimpleImageSlider
       width={1500}
       height={250}
       images={sliderImages}
       showNavs={true}
       autoPlay={true} 
       autoPlayDelay = {3}
    />
 </div>
  )
}

export default SlideImage
