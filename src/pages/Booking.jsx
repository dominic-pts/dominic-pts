import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import FormRequestAPI from "../services/formRequest/formRequestAPI";
import Header from "../components/Header";
import Floating from "../components/Floating";

export default function Booking() {
  const price = 4500;
  const number_row = 5;
  const number_col = 10;
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [formRequests, setFormRequests] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    tickets: Number,
    totalPayment: "",
    seats: "",
    agree: true,
    note: "",
  });

  const handleSeatClick = (rowIndex, seatIndex) => {
    const newSelectedSeats = [...selectedSeats];
    const seatNumber = rowIndex * number_col + seatIndex;

    if (newSelectedSeats.includes(seatNumber)) {
      newSelectedSeats.splice(newSelectedSeats.indexOf(seatNumber), 1);
    } else {
      newSelectedSeats.push(seatNumber);
    }
    setSelectedSeats(newSelectedSeats);
    updateSelectedSeatsText(newSelectedSeats);
  };

  const updateSelectedSeatsText = (seats) => {
    if (formRequests && formRequests.length > 0) {
      const selectedSeatsText = seats.map((seat) => {
        const rowIndex = Math.floor(seat / number_col);
        const seatIndex = seat % number_col;
        const seatLetter = String.fromCharCode(rowIndex + 65);
        const seatNumber = seatIndex + 1;
        return `${seatLetter}${seatNumber}`;
      });

      setFormData({
        ...formData,
        seats: selectedSeatsText.join(", "),
      });

      document.getElementById(
        "description"
      ).value = `Ghế: ${selectedSeatsText.join(", ")}`;
    } else {
      console.error(
        "Form requests data is empty or undefined, or soldSeats is not provided."
      );
    }
  };

  const isSeatSold = (rowIndex, seatIndex) => {
    const seat = `${String.fromCharCode(65 + rowIndex)}${seatIndex + 1}`;
    return formRequests.some((formRequest) =>
      formRequest.attributes.seats.includes(seat)
    );
  };

  const getTotalPrice = () => {
    const totalPrice = selectedSeats.length * price;
    const totalPriceInMillions = totalPrice / 100000;
    const formattedTotalPrice = new Intl.NumberFormat().format(
      totalPriceInMillions * 1000000
    );
    return formattedTotalPrice;
  };

  const deselectAllSeats = () => {
    setSelectedSeats([]);
    updateSelectedSeatsText([]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors((prevState) => ({
      ...prevState,
      [name]: "",
    }));
    setSuccessMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const captchaResponse = window.grecaptcha.getResponse();
    // if (!captchaResponse.length > 0) {
    //   alert("Please complete the reCAPTCHA");
    //   return;
    // }
    const checkbox = document.getElementById("checkbox");
    if (!checkbox.checked) {
      alert("Vui lòng đọc điều khoản và chính sách trước khi gửi");
      return;
    }
    if (!selectedSeats || selectedSeats.length === 0) {
      alert("Vui lòng chọn ít nhất một ghế");
      return;
    }
    const validationErrors = {};
    for (const key in formData) {
      if (!formData[key]) {
        validationErrors[key] = "Trường này không được trống";
      }
    }

    const emailPattern = /^[^\s@]+@gmail\.com$/;
    if (formData.email && !emailPattern.test(formData.email)) {
      validationErrors.email = "Định dạng email không hợp lệ";
    }

    if (formData.phone.length !== 10) {
      validationErrors.phone = "Số điện thoại phải gồm đủ 10 chữ số.";
    }

    const phonePattern = /^\d*$/;
    if (formData.phone && !phonePattern.test(formData.phone)) {
      validationErrors.phone = "Bạn đang nhập sai kí tự";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    fetch("https://strapirender-production.up.railway.app/api/form-requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: formData }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setTimeout(() => {
      setSuccessMessage("Form submitted successfully!");
      deselectAllSeats();
      setFormData({
        name: "",
        email: "",
        phone: "",
        note: "",
      });
    }, 1000);
  };

  useEffect(() => {
    // Thêm script Google reCAPTCHA
    // const script = document.createElement("script");
    // script.src = "https://www.google.com/recaptcha/api.js";
    // script.async = true;
    // document.body.appendChild(script);

    // Xử lý successMessage
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  useEffect(() => {
    // Lấy danh sách ghế từ API
    const fetchFormRequests = async () => {
      try {
        const api = new FormRequestAPI();
        const response = await api.getFormRepuest();
        console.log(response);
        setFormRequests(response.data);
      } catch (error) {
        console.error("Error fetching form requests:", error);
      }
    };

    fetchFormRequests();
  }, []);

  useEffect(() => {
    // Xử lý danh sách ghế đã bán
    if (formRequests && formRequests.length > 0) {
      const seatsList = formRequests.flatMap((formRequest) => {
        console.log(
          formRequest.attributes.seats.split(",").map((seat) => seat.trim())
        );
        if (formRequest?.attributes?.seats) {
          return formRequest.attributes.seats
            .split(",")
            .map((seat) => seat.trim());
        } else {
          return [];
        }
      });

      const soldSeats = seatsList.map((seat) => {
        const [row, col] = seat.split("");
        return {
          row: row.charCodeAt(0) - 65,
          index: parseInt(col) - 1,
        };
      });

      soldSeats.forEach((soldSeat) => {
        const seatElement = document.querySelector(
          `.col:nth-child(${soldSeat.row + 1}) .seat:nth-child(${
            soldSeat.index + 1
          })`
        );
        if (seatElement) {
          seatElement.classList.add("sold");
        }
      });
    }
  }, [formRequests]);

  return (
    <Container className="backlove">
      <Header />
      <Floating/>
      <div className="booking-container">
        <ul className="showcase">
          <li>
            <div className="seat"></div>
            <small>Ghế trống</small>
          </li>
          <li>
            <div className="seat selecteds"></div>
            <small>Đã chọn</small>
          </li>
          <li>
            <div className="seat sold"></div>
            <small>Đã bán</small>
          </li>
        </ul>

        <div className="containers">
          <div className="screen">SÂN KHẤU </div>
          {Array.from({ length: number_row }, (_, rowIndex) => (
            <div className="row" key={rowIndex}>
              {Array.from({ length: number_col }, (_, seatIndex) => (
                <div
                  className={`seat ${
                    selectedSeats.includes(rowIndex * number_col + seatIndex)
                      ? "selected"
                      : ""
                  } ${isSeatSold(rowIndex, seatIndex) ? "sold" : ""}`}
                  key={rowIndex * number_col + seatIndex}
                  onClick={() => handleSeatClick(rowIndex, seatIndex)}
                ></div>
              ))}
            </div>
          ))}
          <div className="payment">
            <button className="btn btn__double" onClick={deselectAllSeats}>
              Chọn lại
            </button>
          </div>
        </div>
      </div>
      <div className="request-info-content">
        <h1>
          <Link>Xác nhận thông tin</Link>
        </h1>
        <form className="request-info-input" onSubmit={handleSubmit}>
          <div className="form">
            <div className="form-col">
              <div className="form-control-wrap name">
                <input
                  type="text"
                  name="name"
                  placeholder="Họ và Tên"
                  maxLength="50"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <span className="error">{errors.name}</span>}
              </div>
              <div className="form-control-wrap email">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  maxLength="50"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>
              <div className="form-control-wrap phone">
                <input
                  type="tel"
                  typeof="tel"
                  name="phone"
                  placeholder="Số điện thoại"
                  maxLength="20"
                  className="form-control"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && <span className="error">{errors.phone}</span>}
              </div>
            </div>
            <div className="form-col">
              <div className="form-control-wrap tickets">
                <input
                  type="text"
                  name="tickets"
                  placeholder="Số lượng vé"
                  maxLength="50"
                  className="form-control"
                  value={`${(formData.tickets = selectedSeats.length)} vé`}
                  onChange={handleChange}
                  readOnly
                />
              </div>
              <div className="form-message-2">
                <textarea
                  id="description"
                  type="description"
                  name="description"
                  placeholder="Các ghế đã đặt"
                  maxLength="500"
                  className="form-control"
                  readOnly
                />
              </div>
            </div>
            <div className="form-col">
              <div className="form-control-wrap name">
                <input
                  type="text"
                  name="name"
                  placeholder="Tổng tiền"
                  maxLength="50"
                  className="form-control"
                  value={`${(formData.totalPayment = getTotalPrice())} VNĐ`}
                  onChange={handleChange}
                  readOnly
                ></input>
              </div>
              <div className="form-control-wrap rules">
                <Link>Điều khoản và chính sách của chúng tôi</Link>
              </div>
              <div className="form-control-wrap Agree">
                <label htmlFor="checkbox">
                  <input
                    type="checkbox"
                    id="checkbox"
                    style={{ transform: "scale(1.7)" }}
                    onChange={(e) =>
                      setFormData({ ...formData, agree: e.target.checked })
                    }
                  />
                  <span> Tôi đã đọc và đồng ý</span>
                </label>
              </div>
            </div>
            <div className="form-col">
              {/* <div
                className="g-recaptcha"
                data-sitekey="6LfzqJ0pAAAAABMMMHMV_ydwe--O926U3SSGQsLk"
              ></div> */}
              <textarea
                id="note"
                type="description"
                name="note"
                placeholder="Ghi chú"
                maxLength="500"
                value={formData.note}
                className="form-control"
                onChange={handleChange}
              />
              <button type="submit" className="btn__primary btn btn__double">
                Gửi
              </button>
              {successMessage && (
                <div className="success">{successMessage}</div>
              )}
            </div>
          </div>
        </form>
      </div>
    </Container>
  );
}

const Container = styled.div`
  --color-primary: #186ab4;
  color: #ffffff;
  .hamburger-react {
    color: #494949 !important;
  }
  .booking-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100%;
    font-family: "Lato", sans-serif;
    margin: 0;
  }
  .movie-container select {
    background-color: #ffffff;
    border: 0;
    border-radius: 5px;
    font-size: 16px;
    margin-left: 10px;
    padding: 5px 15px 5px 15px;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
  }

  .container {
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .seat {
    background-color: #444451;
    height: 55px;
    width: 60px;
    margin: 10px;
    font-size: 50px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  .selecteds,
  .seat.selected {
    background-color: var(--color-primary);
  }

  .seat.sold {
    background-color: #ff0000;
    pointer-events: none;
    cursor: no-drop;
  }

  .seat:nth-of-type(2) {
    margin-right: 50px;
  }

  .seat:nth-last-of-type(2) {
    margin-left: 50px;
  }

  .seat:not(.sold):hover {
    cursor: pointer;
    transform: scale(1.2);
  }

  .showcase .seat:not(.sold):hover {
    cursor: default;
    transform: scale(1);
  }

  .showcase {
    background: rgba(0, 0, 0, 0.1);
    padding: 5px 10px;
    border-radius: 5px;
    color: #777;
    list-style-type: none;
    display: flex;
    justify-content: space-between;
  }

  .showcase li {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 10px;
  }
  .showcase li small {
    margin-left: 2px;
  }

  .row {
    display: flex;
  }

  .screen {
    background-color: #dfdfdf;
    text-align: center;
    padding: 10px 0;
    width: 100%;
    margin: 30px 0;
    font-size: 18px;
    background: var(--color-primary);
    box-shadow: 0 0 5px var(--color-primary), 0 0 25px var(--color-primary);
  }

  .payment {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
    align-items: center;
  }

  div.text {
    margin: 5px 0;
    line-height: 30px;
    width: 100%;
    text-align: center;
    span {
      color: var(--color-primary);
    }
  }

  .btn {
    padding: 5px 20px;
    position: relative;
    border: 0;
    transition: 0.5s;
    z-index: 1;
    min-width: 20rem;
    padding: 1rem 2rem;
    font-size: 0.875rem;
    line-height: 1;
    font-weight: 500;
    cursor: pointer;
    text-decoration: none;
    text-transform: uppercase;
    background: #041a2f;
    color: #ffffff;
    &:before,
    &:after {
      content: "";
      position: absolute;
      z-index: -1;
    }
  }
  .btn__double {
    &:hover {
      box-shadow: 5px 5px 0 var(--color-primary);
    }
  }
  #selectedSeatsText {
    width: 560px;
    white-space: nowrap; /* Ngăn chặn text xuống dòng */
    overflow: hidden; /* Ẩn nội dung vượt quá chiều rộng */
    text-overflow: ellipsis; /* Hiển thị dấu "..." khi nội dung bị ẩn */
    margin-top: 30px;
  }

  .request-info-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 100vh;
    h1 {
      a {
        color: var(--color-primary) !important;
        transition: color 0.3s ease;
        text-decoration: none;
        line-height: 51.2px;
        text-align: center;
        text-transform: uppercase;

        &:hover {
          color: var(--primary-color) !important;
        }
      }
    }

    p {
      font-size: var(--font-size-medium);
      color: var(--grey-color);
      padding-bottom: 120px;
      font-weight: var(--font-weight-heading);
      margin: 0 auto;
    }
    .request-info-input {
      margin: 20px 30px;
      .form {
        display: grid;
        grid-template-columns: 1fr 1fr;
        text-align: center;
        gap: 60px;

        .success {
          text-align: left;
          color: var(--green-color);
        }

        .error {
          color: var(--red-color);
          padding-top: 5px;
        }

        .form-col {
          display: flex;
          flex-direction: column;
          gap: 40px;
          width: 100%;

          .form-control-wrap {
            position: relative;
            display: block;
          }
          .Agree,
          .rules {
            text-align: left;
            span {
              font-size: 16px;
              color: var(--color-primary);
              padding-left: 10px;
              cursor: pointer;
            }
            a {
              text-decoration: none;
              font-size: 16px;
              color: var(--color-primary);
            }
          }
          .Agree {
            label {
              span {
              }
            }
          }
          textarea[type="description"],
          input[type="text"],
          input[type="email"],
          input[type="tel"],
          input[type="text"] {
            border-radius: 10px;
            padding: 12px;
            font-size: 16px;
            height: auto;
            text-align: left;
            font-weight: 200;
            display: block;
            line-height: 1.5;
            color: #495057;
            background-color: var(--white-color);
            background-clip: padding-box;
            border: 1px solid var(--grey-color);
            width: -webkit-fill-available;
            outline: none;
            transition: border-color 0.15s ease-in-out,
              box-shadow 0.15s ease-in-out;

            &:focus {
              border: 1px solid var(--primary-color);
            }
          }

          .form-message-2 {
            height: 100%;
            display: flex;
          }

          .form-message {
            display: block;
            height: 80% !important;
            padding: 12px 15px !important;
            resize: none;
          }
        }

        .btn__primary {
          max-width: 200px !important;
        }
      }
    }

  //reponsive
  @media (max-width: 430px) {
    .form {
      grid-template-columns: 1fr !important;
      gap: 15px !important;
      .form-col {
        gap: 15px;
      }
    }
  }
  @media (max-width: 1024px) {
    .booking-container{
      height: max-content !important;
      padding-top: 100px;
    }
    .seat {
      height: 35px !important;
      width: 40px !important;
    }
    .row {
      flex-wrap: nowrap;
    }
  }
}
`;
