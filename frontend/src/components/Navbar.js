import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../images/logo.svg';
import koszyk from '../images/koszyk.svg';
import kontakt from '../images/kontakt.svg';
import ulubione from '../images/ulubione.svg';

export default function Navbar(props) {
  const location = useLocation();
  const currentRoute = location.pathname;

  const cartItems = props.cart.reduce((akum, curr) => {
    return akum + +curr.amount 
  }, 0)

  return (
    <nav className="navbar navbar-dark navbar-expand-lg bg-dark sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img className="logo" src={logo} />
        </Link>
        <button
          className="navbar-toggler collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="toggler-icon top-bar"></span>
          <span className="toggler-icon middle-bar"></span>
          <span className="toggler-icon bottom-bar"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav d-flex justify-content-between align-items-lg-center w-100">
            <div className="d-lg-flex align-items-center">
              <Link
                className={
                  /\/sklep.*/.test(currentRoute) ? 'nav-link active' : 'nav-link'
                }
                aria-current="page"
                to="sklep"
              >
                Sklep
              </Link>
              <Link
                className={
                  currentRoute === '/personalizacja'
                    ? 'nav-link active'
                    : 'nav-link'
                }
                to="personalizacja"
              >
                Personalizacja
              </Link>
              <a
                className={
                  currentRoute === '/o-nas' ? 'nav-link active' : 'nav-link'
                }
                href="https://foxtry.pl/onas/"
                target="_blank"
              >
                O nas
              </a>
            </div>
            <div className="d-flex">
              <Link className="nav-link d-flex" to="ulubione">
                <img className="navbar-ico" src={ulubione} />
                <div className='align-self-end cart-amount'>{props.favorite.length}</div>
              </Link>
              <Link className="nav-link" to="kontakt">
                <img className="navbar-ico" src={kontakt} />
              </Link>
              <Link className="nav-link d-flex" to="koszyk">
                <img className="navbar-ico" src={koszyk} />
                <div className='align-self-end cart-amount'>{cartItems}</div>
              </Link>
            </div>
          </div>
          <div className="">x</div>
        </div>
      </div>
    </nav>
  );
}
