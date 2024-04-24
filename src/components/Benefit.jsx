import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BenefitAPI from "../services/benefit/benefitAPI";

export default function Benefit() {
  const [benefit, setBenefit] = useState([]);

  useEffect(() => {
    const fetchBenefit = async () => {
      try {
        const api = new BenefitAPI();
        const response = await api.getBenefit();
        setBenefit(response.data); // Lưu trữ dữ liệu từ API vào state
      } catch (error) {
        console.error("Error fetching slider header:", error);
      }
    };
    fetchBenefit(); // Gọi hàm để lấy dữ liệu khi component được render
  }, []);
  return (
    <Container className=" containers">
      <div className="benefit">
        <div>
          <h1>{benefit[0]?.attributes?.title}</h1>
          <p>{benefit[0]?.attributes?.benefit1}</p>
          <p>{benefit[0]?.attributes?.benefit2}</p>
          <p>{benefit[0]?.attributes?.benefit3}</p>
          <p>{benefit[0]?.attributes?.benefit4}</p>
          <p>{benefit[0]?.attributes?.benefit5}</p>
        </div>
        <img
          src={benefit[0]?.attributes.img_benefit.data[0]?.attributes.url}
          alt="dataimg"
        />
      </div>
    </Container>
  );
}

const Container = styled.div`
  padding-top: 100px;
  padding-bottom: 100px;
  .benefit {
    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
      h1 {
        margin-bottom: 3rem;
      }
      p {
        font-size: var(--font-size-normal);
        padding-left: 30px;
        position: relative;
        margin-top: 30px;
        &::before {
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          content: "•";
          z-index: 1;
        }
      }
    }
  }
  img {
    width: 600px;
    height: 400px;
    border-radius: 20px;
    margin-top: 100px;
  }

  //reponsive
  @media (max-width: 430px) {
    img {
      width: 350px;
      height: auto;
      object-fit: cover;
      border-radius: 20px;
      margin-top: 50px;
    }
  }
  @media (max-width: 1024px) {
    .benefit {
      display: flex;
      flex-direction: column !important;
    }
  }
`;
