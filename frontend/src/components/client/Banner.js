import React, { useEffect, useState } from "react";
import "./Banner.css";
import axios from "axios";
import { Carousel, Grid } from "rsuite";

const Banner = () => {
  let [banner, setBanner] = useState([]);

  useEffect(() => {
    async function bannerData() {
      let data = await axios.get("http://localhost:8000/banner");
      setBanner(data.data);
    }
    bannerData();
  }, []);

  return (
    <>
      <Carousel className="custom-slider">
        {banner.map((items, index) => (
          <div key={index} className="slider-items">
            <div className="slider-images" style={{ backgroundImage: `url(${items.img})` }}>
              <Grid className="slider-text">
                <h5>{items.subHeading}</h5>
                <h1>{items.heading}</h1>
                <button>{items.button}</button>
              </Grid>
            </div>
          </div>
        ))}
      </Carousel>
    </>
  );
};

export default Banner;
