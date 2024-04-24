import React, { useEffect, useState } from "react";
import imgLogo from "../assets/img/Logo.png";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Divide as Hamburger } from "hamburger-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const updateScroll = () => {
      setIsScrolled(!!window.scrollY);
    };
    window.addEventListener("scroll", updateScroll);
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <Container>
      <header className={`${isScrolled ? "scrolled" : ""} header`}>
        <div className="containers">
          <Link to="/">
            <img src={imgLogo} alt="logo-white.png" />
          </Link>
          <nav className="header__navbar">
            <Link to="/" rel="item" className="header__navbar--current">
              Trang chủ
            </Link>
            <Link
              to="/cafe-location"
              rel="item"
              className="header__navbar--current"
            >
              Địa điểm cafe chữa lành
            </Link>
            <Link to="/booking" rel="item" className="header__navbar--current">
              Đặt vé & Giá vé
            </Link>
          </nav>
          <nav className="header__menu">
            <Hamburger toggled={isMenuOpen} toggle={toggleMenu} />
          </nav>
        </div>
      </header>
      {isMenuOpen && (
        <nav className="modal__content">
          <Link to="/" rel="item" className="modal__item">
            Trang chủ
          </Link>
          <Link to="/cafe-location" rel="item" className="modal__item">
            Địa điểm cafe chữa lành
          </Link>
          <Link to="/booking" rel="item" className="modal__item booking__item">
            Đặt vé & Giá vé
          </Link>
        </nav>
      )}
    </Container>
  );
};

export default Header;

const Container = styled.div`
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 15px 50px 10px;
    transition: all 0.3s linear;
    background-color: transparent;
    -webkit-box-align: center;
    -webkit-transition: all 0.3s linear;
    z-index: var(--z-index-100);

    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      a {
        color: #fff;
        img {
          width: 150px;
        }
      }

      .header__navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: center;
        font-size: var(--font-size-small);
        margin: 0;
        .header__navbar--current {
          text-decoration: none;
          margin-bottom: 6px;
          font-family: "Oswald", sans-serif;
          font-weight: 300;
          line-height: 31px;
          padding: 0 20px;
        }
      }
    }
  }
  //modal
  .hamburger-react {
    color: #fff;
  }
  .modal__content {
    position: fixed;
    top: 0px;
    left: 0;
    width: 80%;
    height: 100vh;
    z-index: 1000;
    background: #fff;
    box-shadow: 8px 5px 10px rgba(0, 0, 0, 0.24);
    animation: menuInFromLeft 0.3s linear;
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding-top: 70px;
    padding-left: 20px;
    .modal__item {
      text-decoration: none;
      font-size: var(--font-size-small);
      color: #494949;
    }
    @keyframes menuInFromLeft {
      0% {
        width: 0;
        opacity: 0;
      }
      80% {
        width: 80%;
        opacity: 0.8;
      }
      100% {
        opacity: 1;
      }
    }
  }
  // add class
  .scrolled {
    background: #fff;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.24);
    transition: 0.3s ease;
    a {
      color: #494949 !important;
    }
    .hamburger-react {
      color: #494949;
    }
  }

  //reponsive
  @media (max-width: 430px) {
    :root {
      --font-size-medium: 1.3rem;
      --font-size-small: 1.1rem;
    }
    .header {
      padding: 15px 15px 10px !important;
      /* &__navbar {
        display: none !important;
      } */
    }
    .container {
      max-width: 355px;
    }
  }
  @media (max-width: 1024px) {
    .header__navbar {
      display: none !important;
    }
    
  }
  @media (min-width: 1025px) {
    .header__menu {
      display: none !important;
    }
  }
`;
