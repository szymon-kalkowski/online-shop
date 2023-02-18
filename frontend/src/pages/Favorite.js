import React from "react";
import ProductCard from "../components/ProductCard";

export default function Favorite(props){

    const productElements = props.favorite.map((x, index) => (
        <ProductCard
          key={index}
          name={x.name}
          category={x.category}
          photo={x.photo}
          price={x.price}
          sex={x.sex}
          slug={x.slug}
        />
    ));

    return (
        <div className="row">
            <h1 className="my-3 px-5 pt-5">ULUBIONE</h1>
            {props.favorite.length === 0 && <h3 className="text-center">Brak ulubionych produktów</h3>}
            {productElements}
        </div>
    )
}