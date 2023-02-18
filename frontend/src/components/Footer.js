import React from "react";
import logo from '../images/logo.svg';

export default function Footer(){
    return (
        <div className="bg-dark footer mt-5 p-5 d-flex flex-column justify-content-center align-items-center">
            <img className="logo" src={logo} />
            <h6 className="text-center text-white m-3">Foxtry.pl</h6>
        </div>
    )
}