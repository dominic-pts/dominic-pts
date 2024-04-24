import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Carousel from "../components/CustomCarousel";
import ConceptMusic from "../components/ConceptMusic";
import Benefit from "../components/Benefit";
import HealMusic from "../components/HealMusic";
import EmotionSurvey from "../components/EmotionSurvey";
import RequestInfo from "../components/requestInfo";
import Floating from "../components/Floating";
export default function Home() {
  return (
    <Container>
      <Header />
      <Carousel />
      <ConceptMusic />
      <Benefit />
      <HealMusic />
      <EmotionSurvey />
      <RequestInfo/>
      <Floating/>
      <Footer />
    </Container>
  );
}

const Container = styled.div``;
