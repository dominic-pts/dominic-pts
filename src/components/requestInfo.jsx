import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import RequestInfoAPI from "../services/requestInfo/requestInfoAPI";
const RequestInfo = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    description: "",
  });

  // Import re-captcha html
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js";
    script.async = true;
    document.body.appendChild(script);

    // Xử lý successMessage
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // Clear the error message when the user starts filling in again
    setErrors((prevState) => ({
      ...prevState,
      [name]: "",
    }));
    // Delete success notification when user changes data
    setSuccessMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const captchaResponse = window.grecaptcha.getResponse();
    // if (!captchaResponse.length > 0) {
    //   alert("Please complete the reCAPTCHA");
    //   return;
    // }

    const validationErrors = {};
    for (const key in formData) {
      if (!formData[key]) {
        validationErrors[key] = "This field is required";
      }
    }

    // Check email format
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (formData.email && !emailPattern.test(formData.email)) {
      validationErrors.email = "Invalid email format";
    }

    // Check that the phone number contains only digits
    const phonePattern = /^(0\d{9}|\+84\d{9})$/;
    if (formData.phone && !phonePattern.test(formData.phone)) {
      validationErrors.phone = "Please enter number";
    }

    // If there is an error, display a message and do not submit the form
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    fetch("https://strapirender-production.up.railway.app/api/form-request-infos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: formData }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setTimeout(() => {
      setSuccessMessage("Form submitted successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        description: "",
      });
    }, 1000);
  };
  return (
    <Container className="containers">
      <h1>Hãy gửi câu hỏi cho chúng tôi</h1>
      <form className="request-info-input" onSubmit={handleSubmit}>
        <div className="form">
          <div className="form-col">
            <div className="form-control-wrap name">
              <input
                type="text"
                name="name"
                placeholder="Nhập Họ Và Tên"
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
                placeholder="Nhập Email"
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
                placeholder="Nhập số điện thoại"
                maxLength="20"
                className="form-control"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && <span className="error">{errors.phone}</span>}
            </div>
          </div>
          <div className="form-col">
            <div className="form-control-wrap subject">
              <input
                type="text"
                name="subject"
                placeholder="Nhập Tiêu Đề"
                maxLength="50"
                className="form-control"
                value={formData.subject}
                onChange={handleChange}
              />
              {errors.subject && (
                <span className="error">{errors.subject}</span>
              )}
            </div>
            <div className="form-message-2">
              <textarea
                type="description"
                name="description"
                placeholder="Nhập Câu Hỏi"
                maxLength="500"
                className="form-control form-message"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
              {errors.description && (
                <span className="error">{errors.description}</span>
              )}
            </div>
          </div>
          <div className="form-col">
            <button type="submit" className="btn__primary">
              Gửi
            </button>
            {successMessage && <div className="success">{successMessage}</div>}
          </div>
        </div>
      </form>
    </Container>
  );
};

export default RequestInfo;

const Container = styled.div`
  padding: 100px 0;
  h1 {
    padding: 50px 0;
    text-align: center;
  }
  .request-info-input {
    .form {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
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
        justify-content: center;
        gap: 40px;

        .form-control-wrap {
          position: relative;
          display: block;

          textarea[type="description"],
          input[type="text"],
          input[type="email"],
          input[type="tel"],
          input[type="text"] {
            border-radius: 10px;
            padding: 12px 15px 12px 12px;
            font-size: 18px;
            height: auto;
            text-align: left;
            font-weight: var(--font-weight-heading);
            display: block;
            line-height: 1.5;
            color: #495057;
            background-color: var(--white-color);
            background-clip: padding-box;
            border: 1px solid var(--border-color);
            width: 100%;
            outline: none;
            transition: border-color 0.15s ease-in-out,
              box-shadow 0.15s ease-in-out;

            &:focus {
              border: 1px solid var(--primary-color);
            }
            
          }
        }
      }
    }
  }
  .form-message-2 {
    height: 100%;
  }
  .form-message {
    display: block;
    height: 100% !important;
    padding: 12px 15px !important;
    resize: none;
    font-size: 18px;
  }
    //reponsive
    @media (max-width: 430px){
      h1{
        font-size: 25px;
      }
      .request-info-input .form{
        grid-template-columns: 1fr;
        gap: 15px;
        .form-col{
          gap: 15px;
          .btn__primary{
            margin: 0 auto;
          }
        }
      }
    }
`;
