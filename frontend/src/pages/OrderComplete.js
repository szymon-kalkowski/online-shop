import React from "react";
import { Link } from "react-router-dom"

export default function OrderComplete(){
    return (
    <div className="container">
        <div className="row d-flex flex-column justify-content-center align-items-center">
            <h1 className="text-center my-5">Dziękujemy za złożenie zamówienia!</h1>
            <Link to="/" className="btn btn-secondary my-3 p-2 w-50">Powrót do strony głownej</Link>
        </div>
    </div>
)}