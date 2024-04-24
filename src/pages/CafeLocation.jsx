import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import iconCancel from "../assets/icon/cancel.svg";
import CafeLocationAPI from "../services/cafeLocation/cafeLocationAPI";
import Floating from "../components/Floating";

export default function CafeLocation() {
  const modalRef = useRef();
  const [cafeLocation, setCafeLocation] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedLocationItem, setSelectedLocationItem] = useState(null);
  // Hàm này sẽ mở modal và hiển thị nội dung đầy đủ của mục được chọn
  const openModal = (item) => {
    setShowModal(true);
    setSelectedLocationItem(item);
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
    const fetchCafeLocation = async () => {
      try {
        const api = new CafeLocationAPI();
        const response = await api.getCafeLocation();
        setCafeLocation(response.data);
      } catch (error) {
        console.error("Error fetching slider header:", error);
      }
    };
    fetchCafeLocation();
  }, []);

  return (
    <>
      <Container className="containers">
        <Header />
        <Floating/>
        <h1>Các địa điểm âm nhạc Cafe Chữa Lành tại Đà Lạt</h1>
        <p className="des">
          Tại các quán cafe tại Đà Lạt, trải nghiệm chữa lành bằng âm nhạc
          thường xoay quanh không gian thoải mái và yên bình. Âm nhạc được chọn
          lọc kỹ càng để tạo ra một môi trường thư giãn, giúp khách hàng thoát
          khỏi căng thẳng hàng ngày và tận hưởng thời gian nghỉ ngơi. Không gian
          này thường được trang trí mộc mạc và ấm cúng, tạo điểm đến lý tưởng
          cho những người muốn tận hưởng âm nhạc và thư giãn trong một không
          gian bình dị và đẹp mắt.
        </p>
        <div className="box_heal">
          {cafeLocation.map((item, index) => (
            <div className="card" key={index} onClick={() => openModal(item)}>
              <img src={item.attributes.image.data[0]?.attributes.url} alt="" />
              <div className="card_content">
                <h2>{item.attributes.title} </h2>
                <p>{item.attributes.description}</p>
                <span>
                  Thời gian: Mở {item.attributes.open} - Đóng
                  {item.attributes.close}
                </span>
                <span>
                  Tầm giá khoảng:{" "}
                  {parseFloat(item.attributes.price).toLocaleString()} VNĐ
                </span>
                <span>Địa điểm: {item.attributes.address}</span>
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
                <div className="content_time">
                  <img
                    src={
                      selectedLocationItem?.attributes.image.data[0]?.attributes
                        .url
                    }
                    alt=""
                  />
                  <span>
                    Thời gian: Mở {selectedLocationItem?.attributes.open} - Đóng
                    {selectedLocationItem?.attributes.close}
                  </span>
                  <span>
                    Tầm giá khoảng:{" "}
                    {parseFloat(
                      selectedLocationItem?.attributes.price
                    ).toLocaleString()}
                    VNĐ
                  </span>
                  <span>
                    Địa điểm: {selectedLocationItem?.attributes.address}
                  </span>
                </div>
                <div className="modal__body__content">
                  <h4>{selectedLocationItem?.attributes.title}</h4>
                  <h5>
                    <Link
                      to={`${selectedLocationItem?.attributes.link_cafe}`}
                      target="_blank"
                    >
                      Chi tiết hơn
                    </Link>
                  </h5>
                  <p>{selectedLocationItem?.attributes.description}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
      <Footer />
    </>
  );
}
const Container = styled.div`
  .header__navbar--current {
    color: #494949 !important;
  }
  padding: 150px 0;
  h1 {
    margin-bottom: 80px;
    text-align: center;
  }
  .des {
    text-align: center;
    font-size: 20px;
    padding: 0 100px 50px;
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
        justify-content: space-around;
        height: 350px;
        h2 {
          overflow: hidden;
          text-overflow: ellipsis; /* Để hiển thị dấu ... khi nội dung quá dài */
          display: -webkit-box;
          -webkit-line-clamp: 1; /* Hiển thị chỉ 2 dòng */
          -webkit-box-orient: vertical;
        }
        p {
          margin-top: 20px;
          font-size: var(--font-size-small);
          overflow: hidden;
          text-overflow: ellipsis; /* Để hiển thị dấu ... khi nội dung quá dài */
          display: -webkit-box;
          -webkit-line-clamp: 4; /* Hiển thị chỉ 2 dòng */
          -webkit-box-orient: vertical;
        }
        span {
          overflow: hidden;
          text-overflow: ellipsis; /* Để hiển thị dấu ... khi nội dung quá dài */
          display: -webkit-box;
          -webkit-line-clamp: 1; /* Hiển thị chỉ 2 dòng */
          -webkit-box-orient: vertical;
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
      width: 90vw;
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
          cursor: pointer;
          object-fit: cover;
        }
      }

      .modal__body {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        padding: 40px 0px 30px;
        border-top: 1px solid var(--greyish-color);
        align-items: start;
        .content_time {
          display: flex;
          flex-direction: column;
          gap: 20px;
          font-size: 18px;
          img {
            border-radius: 20px;
            width: 350px;
            margin: 0 20px;
            object-fit: contain;
            object-fit: cover;
          }
          span {
            padding-left: 20px;
          }
        }

        &__content {
          padding: 0 20px 0 0;
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
  .hamburger-react {
    color: var(--text-title-color) !important;
  }
  //reponsive
  @media (max-width: 430px) {
    h1 {
      margin-bottom: 20px;
    }
    .des {
      padding: 50px 10px;
      text-align: justify;
    }
    .box_heal {
      grid-template-columns: 1fr !important;
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
    #modal .modal .modal__body__content {
      padding-top: 30px;
      p {
        padding-left: 20px;
      }
    }
    .content_time {
      align-items: center;
    }
    #modal .modal .modal__body__content h5 {
      margin: 0 0 30px 10px;
    }
  }
`;
