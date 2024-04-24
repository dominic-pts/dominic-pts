import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import HealAPI from "../services/Heal/healAPI";
import iconCancel from "../assets/icon/cancel.svg";
import { Link } from "react-router-dom";

export default function HealMusic() {
  const modalRef = useRef();
  const [heal, setHeal] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedHealItem, setSelectedHealItem] = useState(null);

  // Hàm này sẽ mở modal và hiển thị nội dung đầy đủ của mục được chọn
  const openModal = (item) => {
    setShowModal(true);
    setSelectedHealItem(item);
    document.body.classList.add("hidden-y");
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.classList.remove("hidden-y");
  };
  const handleCloseModal = (e) => {
    if (!modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    const fetchHeal = async () => {
      try {
        const api = new HealAPI();
        const response = await api.getHealMusic();
        setHeal(response.data);
      } catch (error) {
        console.error("Error fetching slider header:", error);
      }
    };
    fetchHeal();
  }, []);
  return (
    <Container className="containers">
      <h1>Các bài báo về âm nhạc chữa lành</h1>
      <div className="box_heal">
        {heal.map((item, index) => (
          <div className="card" key={index} onClick={() => openModal(item)}>
            <img
              src={item.attributes.img_heal.data[0]?.attributes.url}
              alt=""
            />
            <div className="card_content">
              <h2>{item.attributes.title} </h2>
              <p>{item.attributes.description}</p>
              <span>{item.attributes.link_heal}</span>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <div id="modal" onClick={(e) => handleCloseModal(e)}>
          <div className="modal" ref={modalRef}>
            <div className="modal-header">
              <img
                className="close-btn"
                src={iconCancel}
                alt=""
                onClick={closeModal}
              />
            </div>
            <div className="modal__body">
              <img
                src={
                  selectedHealItem?.attributes.img_heal.data[0]?.attributes.url
                }
                alt=""
              />
              <div className="modal__body__content">
                <h4>{selectedHealItem?.attributes.title}</h4>
                <h5>
                  <Link
                    to={`${selectedHealItem?.attributes.link_heal}`}
                    target="_blank"
                  >
                    Chi tiết hơn
                  </Link>
                </h5>
                <p>{selectedHealItem?.attributes.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}

const Container = styled.div`
  padding: 0 0 200px 0;
  h1 {
    margin-bottom: 50px;
  }
  .box_heal {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: 100%;
    gap: 50px;
    .card {
      background-color: #f0f0f0;
      cursor: pointer;
      border: none;
      border-radius: 20px;
      &:hover {
        img {
          transform: scale(1.05);
          border: var(--primary-color) solid 1px;
        }
      }
      img {
        border-radius: 20px;
        height: 250px;
        transition: 0.2s linear;
        object-fit: cover;
      }
      .card_content {
        padding: 15px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 210px;
        h4 {
          overflow: hidden;
          text-overflow: ellipsis; /* Để hiển thị dấu ... khi nội dung quá dài */
          display: -webkit-box;
          -webkit-line-clamp: 2; /* Hiển thị chỉ 2 dòng */
          -webkit-box-orient: vertical;
        }
        p {
          margin-top: 20px;
          font-size: var(--font-size-small);
          overflow: hidden;
          text-overflow: ellipsis; /* Để hiển thị dấu ... khi nội dung quá dài */
          display: -webkit-box;
          -webkit-line-clamp: 2; /* Hiển thị chỉ 2 dòng */
          -webkit-box-orient: vertical;
        }
        span {
          display: none;
        }
      }
    }
  }

  #modal {
    background-color: #6d6d6d7e;
    top: 0;
    left: 0;
    position: fixed;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    z-index: 101;
    opacity: 1;
    transition: showModal 0.4s linear;

    .modal {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      background-color: #fff;
      width: 85vw;
      z-index: 101;
      animation: showTop 0.2s linear;
      height: 90vh;

      .modal-header {
        display: flex;
        flex-direction: row;
        justify-content: end;
        padding: 0;
        img {
          background-color: var(--text-title-color);
          border-radius: 20%;
          padding: 5px;
          width: 32px;
          height: 32px;
          margin: 10px;
          object-fit: cover;
          cursor: pointer;
        }
      }

      .modal__body {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        padding: 40px 0px 30px;
        border-top: 1px solid var(--greyish-color);
        align-items: start;
        img {
          border-radius: 20px;
          width: 350px;
          margin: 0 20px;
          object-fit: cover;
        }

        &__content {
          padding: 0 15px;
          text-align: center;
          font-size: var(--font-size-small);

          h4 {
            font-weight: 400;
            text-transform: uppercase;
            color: var(--text-title-color);
            margin: 0 0 10px 0;
            list-style: 26.4px;
          }

          h5 {
            margin-top: 0;
            padding-bottom: 10px;
            margin-bottom: 30px;
            border-bottom: 2px solid var(--grey-color);
            margin-left: 180px;
            margin-right: 180px;
            line-height: 31px;
            a {
              text-decoration: none;
              font-size: 18px;
              color: var(--primary-color);
            }
          }

          p {
            color: var(--grey-color);
            font-weight: 300;
            text-align: left;
            padding-left: 20px;
            line-height: 31px;
            text-align: justify;
          }
        }
      }
    }
  }
  @keyframes showTop {
    0% {
      opacity: 0;
      top: 20%;
    }

    100% {
      opacity: 1;
      top: 50%;
    }
  }
  @keyframes showModal {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  //reponsive
  @media (max-width: 430px) {
    .box_heal {
      grid-template-columns: 1fr !important;
    }
    #modal .modal .modal__body img {
      width: 250px;
    }
    #modal .modal .modal__body__content p {
      padding-right: 80px;

      margin-left: 80px;
    }
    #modal .modal .modal__body__content h4 {
      font-size: 12px;
      font-weight: 500;
      padding-top: 30px;
    }
    #modal .modal .modal__body__content h5 {
      text-wrap: nowrap;
      a {
        font-size: 12px;
      }
    }
  }
  @media (max-width: 1024px) {
    .box_heal {
      grid-template-columns: 1fr 1fr;
    }
    .modal {
      &__body {
        flex-direction: column !important;
        justify-content: center !important;
        align-items: center !important;
      }
    }
    #modal .modal .modal__body__content p {
      padding-left: 0;
    }
  }
`;
