import React from "react";
import CartRow from "../components/CartRow.js"
import { Link } from "react-router-dom";

export default function Cart(props){
    function addToCart(slug, size){
        props.setCart((prev) => prev.map(x => x.slug === slug && x.size === size ? {...x, amount: x.amount + 1} : x))
    }

    function deleteFromCart(slug, size){
        props.setCart((prev) => prev.map(x => x.slug === slug && x.size === size ? {...x, amount: x.amount - 1} : x).filter(x => x.amount > 0))
    }

    function deleteAllFromCart(slug, size){
        props.setCart((prev) => prev.filter(x => !(x.slug === slug && x.size === size)))
    }

    const cartTotal = props.cart.reduce((akum, curr) => akum + (curr.price * curr.amount), 0.00)
    const cartItems = props.cart.reduce((akum, curr) => akum + +curr.amount, 0)
    
    const cartElements = props.cart.map((x) => (
        <CartRow 
            key={x.slug}
            slug={x.slug}
            name={x.name}
            price={x.price}
            category={x.category}
            collection={x.collection}
            size={x.size}
            amount={x.amount}
            photo={x.photo}
            sex={x.sex}
            addToCart={() => addToCart(x.slug, x.size)}
            deleteFromCart={() => deleteFromCart(x.slug, x.size)}
            deleteAllFromCart={() => deleteAllFromCart(x.slug, x.size)}
            isCart={true}
        />
    ));

    return (
        <>
            <h1 className="my-3 px-5 pt-5">KOSZYK</h1>
            <div className="row mb-5">
                <div className="col-12 col-lg-7 p-5">
                    {cartElements}
                    {props.cart.length === 0 && <h3 className="text-center">Twój koszyk jest pusty</h3>}
                </div>
                <div className="col-12 col-lg-5 p-5 d-flex f1">
                    <div className="rounded-5 bg-white w-100 p-4">
                        <h2>Ilość: {cartItems}</h2>
                        <h2>Suma: {cartTotal.toFixed(2)}zł</h2>
                        <Link className={props.cart.length === 0 ? "btn btn-secondary w-100 my-4 disabled" : "btn btn-secondary w-100 my-4"}
                        to="/podsumowanie">Podsumowanie</Link>
                    </div>
                </div>
            </div>
        </>
    )
}