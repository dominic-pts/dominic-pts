import React from "react";
import styled from "styled-components";
import Logo from "../assets/img/Logo.png";
import iconytb from "../assets/icon/ytb.svg";
import iconfb from "../assets/icon/fb.svg";
import iconinsta from "../assets/icon/insta.svg";
import icontwitter from "../assets/icon/twitter.svg";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <Container>
      <div className="containers">
        <div className="footer">
          <div className="about">
            <ul>
              <li>Công ty Cổ Phần Âm nhạc chữa lành </li>
              <li>Địa chỉ: 1 Nguyễn Văn Trỗi, P2, Đà Lạt, Lâm Đồng </li>
              <li>
                Số điện thoại: <Link to="/">0987654321</Link>{" "}
              </li>
              <li>
                Email: <Link to="/"> amnhacchualanh@gmail.com </Link>
              </li>
              <li>Tác giả: Phạm Sơn</li>
            </ul>
          </div>
          <div className="logoMedia">
            <Link>
              <img src={Logo} alt="Logo" />
            </Link>
            <div className="media">
              <Link>
                <img src={iconfb} alt="" />
              </Link>
              <Link>
                <img src={iconytb} alt="" />
              </Link>
              <Link>
                <img src={iconinsta} alt="" />
              </Link>
              <Link>
                <img src={icontwitter} alt="" />
              </Link>
            </div>
          </div>
          <div className="rules">
            <h5>Điều khoản và chính sách</h5>
            <ul>
              <li>
                <Link to="/terms-policies?type=dat-cho-thanh-toan">
                  Chính sách đặt chỗ và thanh toán
                </Link>
              </li>
              <li>
                <Link to="/terms-policies?type=kieu-nai">Chính sách sử lý kiếu nại</Link>
              </li>
              <li>
                <Link to="/terms-policies?type=huy">Chính sách hủy</Link>
              </li>
              <li>
                <Link to="/terms-policies?type=bao-luu">Chính sách bảo lưu</Link>
              </li>
              <li>
                <Link to="/terms-policies?type=tam-ngung">Chính sách tạm ngừng biểu diễn</Link>
              </li>
              <li>
                <Link to="/terms-policies?type=bao-mat">Chính sách bảo mật</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  background-color: #f0f0f0 !important;
  width: 100%;
  height: max-content;
  bottom: 0;
  right: 0;
  left: 0;
  margin: 0;
  .footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 50px 0;
    font-size: 18px;
    color: var(--primary-color);
    ul {
      padding: 0;
      li {
        list-style: none;
        a {
          text-decoration: none;
        }
      }
    }
    .logoMedia {
      display: flex;
      flex-direction: column;
      text-align: center;
      justify-content: center;
      gap: 10px;
      img {
        width: 360px;
      }
      .media {
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 30px;
        a {
          &:hover {
            img {
              transform: scale(1.5);
            }
          }
          img {
            transition: 0.3s linear;
            width: 30px;
          }
        }
      }
    }
  }
  //reponsive
  @media (max-width: 430px) {
    .footer {
      flex-direction: column;
      gap: 50px;
      .logoMedia img {
        width: 223px;
      }
    }
    
  }
`;
