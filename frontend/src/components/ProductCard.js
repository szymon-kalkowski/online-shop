import React from 'react';
import {Link} from 'react-router-dom'

export default function ProductCard(props) {
  return (
    <div className="col-12 col-md-6 col-lg-4">
        <Link className="w-75 d-block mx-auto my-3 text-decoration-none text-dark" to={`/sklep/${props.slug}`}>
            <img src={props.photo} className="w-100 rounded-5" />
            <h6>{props.sex}</h6>
            <h3 className="lh-1">{props.name}</h3>
            <h3 className="lh-1">{props.category}</h3>
            <h3 className="fw-bold lh-1">{props.price}zł</h3>
        </Link>
    </div>
  );
}
