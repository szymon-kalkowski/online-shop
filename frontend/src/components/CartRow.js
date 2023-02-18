import React from "react";
import kosz from "../images/kosz.svg"

export default function CartRow(props){
    return (
        <div className="row my-4 d-flex align-items-center">
            <div className="col-4">
                <img src={props.photo} className="w-100 rounded-5" />
            </div>
            <div className="col-8 d-flex flex-column justify-content-between">
                <div>
                    <div className="d-flex justify-content-between">
                        <p>{props.sex}</p>
                        {props.isCart && <button className="bg-transparent border border-0"><img onClick={props.deleteAllFromCart} className="bin" src={kosz} /></button>}
                    </div>
                    <h3>{props.name}</h3>
                    <h3>{props.category}</h3>
                    <p className="text-uppercase">{props.size}</p>
                </div>
                <div className="d-flex justify-content-between">
                    <div className="d-flex align-items-center">
                        <h3 className="m-0">Ilość: </h3>
                        {props.isCart && <button onClick={props.deleteFromCart} className="cart-amount mx-2">-</button>}
                        <h3 className="m-0 mx-1">{props.amount}</h3>
                        {props.isCart && <button onClick={props.addToCart} className="cart-amount mx-2">+</button>}
                    </div>
                    <div>
                        <h3 className="fw-bold">{props.price}zł</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}