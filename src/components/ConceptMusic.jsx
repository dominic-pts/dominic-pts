import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ConceptMusicsAPI from "../services/conceptMusics/conceptMusicsAPI";
export default function ConceptMusic() {
  const [conceptMusic, setConceptMusic] = useState([]);

  useEffect(() => {
    const fetchConceptMusics = async () => {
      try {
        const api = new ConceptMusicsAPI();
        const response = await api.getConceptMusic();
        setConceptMusic(response.data); // Lưu trữ dữ liệu từ API vào state
      } catch (error) {
        console.error("Error fetching slider header:", error);
      }
    };

    fetchConceptMusics(); // Gọi hàm để lấy dữ liệu khi component được render
  }, []);
  return (
    <Container className="containers">
      <div className="content">
        <div className="content__music">
          <h1>{conceptMusic[0]?.attributes.title}</h1>
          <p>{conceptMusic[0]?.attributes.description}</p>
        </div>
        <div className="content__benefit">
          {conceptMusic[0]?.attributes.concept_music_items.data.map(
            (item, index) => (
              <div key={index}>
                <h3>{item.attributes.title}</h3>
                <p>{item.attributes.description}</p>
              </div>
            )
          )}
        </div>
      </div>

     
    </Container>
  );
}

const Container = styled.div`
  .content {
    display: grid;
    grid-template-columns: 1.3fr 1fr;
    gap: 100px;
    padding: 200px 0 0;
    justify-content: center;
    align-items: center;
    &__music {
      display: flex;
      flex-direction: column;
      justify-content: start;
      p {
        font-size: var(--font-size-normal);
        text-align: justify;
        padding: 20px 0;
      }
    }
    &__benefit {
      div {
        p {
          font-size: var(--font-size-small);
        }
      }
    }
  }

 //reponsive

  @media (max-width: 1024px) {
    .content{
        grid-template-columns: 1fr ;
        gap: 30px;
      }
  }
`;
