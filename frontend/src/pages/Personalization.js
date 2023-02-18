import React from "react";
import personalization from "../images/personalizacja.png"
import icons from "../images/jak.svg"

export default function Personalization(){
    return (
    <div className="container-fluid p-0">
        <div className="row">
            <img src={personalization} className="w-100" />
            <div className="w-100 p-3 my-4"><img src={icons} className="w-100"/></div>
        </div>
    </div>
)}