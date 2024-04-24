import React, { useEffect, useState } from "react";
import BootstrapCarousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import SliderHeaderAPI from "../services/sliderHeader/sliderHeaderAPI";

export default function CustomCarousel() {
  const [sliderHeader, setSliderHeader] = useState([]);

  useEffect(() => {
    const fetchSliderHeader = async () => {
      try {
        const api = new SliderHeaderAPI();
        const response = await api.getSliderHeader();
        setSliderHeader(response.data); // Lưu trữ dữ liệu từ API vào state
      } catch (error) {
        console.error("Error fetching slider header:", error);
      }
    };

    fetchSliderHeader(); // Gọi hàm để lấy dữ liệu khi component được render
  }, []);

  return (
    <Container>
      <BootstrapCarousel keyboard={true} touch={true}>
        {sliderHeader.map((item, index) => (
          <BootstrapCarousel.Item key={index} interval={7000}>
            <img
              className="img_carousel"
              src={item.attributes.image.data[0].attributes.url}
              alt={item.attributes.Title}
            />
            <BootstrapCarousel.Caption>
              <h3>{item.attributes.title}</h3>
              <p>{item.attributes.description}</p>
            </BootstrapCarousel.Caption>
          </BootstrapCarousel.Item>
        ))}
      </BootstrapCarousel>
    </Container>
  );
}

const Container = styled.div`
  img {
    object-fit: cover;
  }
  .img_carousel {
    width: 100%;
    height: 100vh;
  }
  h3 {
    font-size: var(--font-size-big);
    /* display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden; */
  }
  p {
    font-size: var(--font-size-medium);
    margin-bottom: 50px;
    /* display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden; */
  }
  //reponsive
  @media (max-width: 430px){
    h3 {
    font-size: var(--font-size-medium);
  }
  p{
    font-size: var(--font-size-normal);
  }
  }
`;
