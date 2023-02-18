import React from 'react';
import { useParams } from 'react-router-dom';
import pelna from '../images/pelna.svg';
import pusta from '../images/pusta.svg';
// Import Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Keyboard, Pagination, Navigation } from "swiper";

export default function Product(props) {
  const { slug } = useParams();
  const [product, setProduct] = React.useState({});

  const [photos, setPhotos] = React.useState([]);

  const [formData, setFormData] = React.useState({
    size: '',
    amount: 1,
  });

  function handleChange(e) {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const cartReduce = (akum, curr) => {
    const elem = akum.filter((x) => x.slug === curr.slug && x.size === curr.size);
    if (elem.length === 1) {
      return [
        ...akum.filter((x) => !(x.slug === curr.slug && x.size === curr.size)),
        {
          ...elem[0],
          amount: +elem[0]['amount'] + +curr['amount'],
        },
      ];
    } else {
      return [...akum, curr];
    }
  };

  function addToCart(e) {
    e.preventDefault();
    props.setCart((prev)=> [...prev, {
      slug: slug, 
      size: formData.size, 
      amount: +formData.amount,
      name: product.name,
      photo: product.photo,
      price: product.price,
      category: product.category,
      collection: product.collection,
      sex: product.sex
    }].reduce(cartReduce, []))
  }

  function addToFavorite(){
    props.setFavorite((prev) => [...prev, {
      slug: slug,
      sex: product.sex,
      name: product.name,
      photo: product.photo,
      price: product.price,
      category: product.category,
    }])
  }

  function removeFromFavorite(){
    props.setFavorite((prev) => prev.filter(x => x.slug !== slug));
  }

  const isFavorite = props.favorite.filter(x => x.slug === slug).length === 1;

  const getProduct = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/get_products/" + slug);
    const data = await response.json();
    setProduct(data);
  };

  const getPhotos = async () => {
    const response = await fetch(`http://127.0.0.1:8000/api/get_photos/` + slug);
    const data = await response.json();
    setPhotos(data);
  }

  React.useEffect(() => {
    getProduct();
    getPhotos();
  }, []);

  const photoElements = photos.map((x, index) => <SwiperSlide key={index}><img src={x.photo} className="w-100" /></SwiperSlide>)

  return (
    <div className="row mt-1 p-4">
      <div className="col-12 col-lg-6 mt-2 position-relative">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          keyboard={{
            enabled: true,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Keyboard, Pagination, Navigation]}
          className="mySwiper w-100"
        >
          <SwiperSlide><img src={product.photo} className="w-100" /></SwiperSlide>
          {photoElements}
        </Swiper>
        <img src={isFavorite ? pelna : pusta} onClick={isFavorite ? removeFromFavorite : addToFavorite} className="position-absolute star" />
      </div>
      <div className="col-12 col-lg-6 mt-2">
        <h1>
          {product.name} {product.category}
        </h1>
        <p>
          Kolekcja: {product.collection} | {product.sex}
        </p>
        <h1 className="fw-bold">{product.price}zł</h1>
        {product.xs ||
        product.s ||
        product.m ||
        product.l ||
        product.xl ||
        product.xxl ||
        product.xxxl ||
        product.xxxxl ||
        product.xxxxxl ? (
          <form className="form" onSubmit={addToCart}>
            <select
              className="form-select my-3"
              value={formData.size}
              onChange={handleChange}
              required
              name="size"
            >
              <option value="">Wybierz rozmiar</option>
              {product.xs && <option value="xs">XS</option>}
              {product.s && <option value="s">S</option>}
              {product.m && <option value="m">M</option>}
              {product.l && <option value="l">L</option>}
              {product.xl && <option value="xl">XL</option>}
              {product.xxl && <option value="xxl">XXL</option>}
              {product.xxxl && <option value="xxxl">XXXL</option>}
              {product.xxxxl && <option value="xxxxl">XXXXL</option>}
              {product.xxxxxl && <option value="xxxxxl">XXXXXL</option>}
            </select>
            <div className="d-flex justify-content-between">
              <input
                required
                type="number"
                min="1"
                step="1"
                name="amount"
                className="w-25 form-control"
                value={formData.amount}
                onChange={handleChange}
              />
              <button className="btn btn-secondary w-50">
                Dodaj do koszyka
              </button>
            </div>
          </form>
        ) : (
          <h3 className="text-center text-danger">Produkt niedostępny</h3>
        )}
        <h5 className="my-3">{product.data}</h5>
        <h5 className="my-3">{product.description}</h5>
      </div>
    </div>
  );
}
