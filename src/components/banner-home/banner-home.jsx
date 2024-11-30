import React from 'react';
import Slider from "react-slick";
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BannerHome = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const images = [
    "/assets/background/nutricionista.jpg",
    "/assets/background/nutricionista2.jpg",
    "/assets/background/nutricionista3.jpg",
  ];

  return (
    <Grid container spacing={3}>
      <Grid xs={12}>
        <Slider {...settings}>
          {images.map((image, index) => (
            <Card key={index} sx={{ maxWidth: 1600 }}>
              <CardMedia
                component="img"
                height="345"
                image={image}
                alt={`Slide ${index + 1}`}
              />
            </Card>
          ))}
        </Slider>
      </Grid>
    </Grid>
  );
};

export default BannerHome;
