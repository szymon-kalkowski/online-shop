import React from 'react';
import CSRFToken from '../components/Csrftoken';
import ProductCard from '../components/ProductCard';

export default function Home() {

  const [bestsellers, setBestsellers] = React.useState([]);
  const [newCollection, setNewCollection] = React.useState([]);
  const [newsletter, setNewsletter] = React.useState("");
  const [newsletterMsg, setNewsletterMsg] = React.useState("");

  const getBestsellers = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/get_home_bestsellers")
    const data = await response.json();
    setBestsellers(data); 
  };

  const getNewCollection = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/get_new_collection")
    const data = await response.json();
    setNewCollection(data); 
  };

  React.useEffect(() => {
    getBestsellers();
    getNewCollection();
  }, []);

  const bestsellerElements = bestsellers.map((x, index) => (
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

  const newCollectionElements = newCollection.map((x, index) => (
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

  function getToken(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  }

  const csrftoken = getToken('csrftoken');

  async function newsletterSubmit(e){
    e.preventDefault();
    await fetch("http://127.0.0.1:8000/api/post_newsletter", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify({
            email: newsletter,
        })
    })
    setNewsletter("");
    setNewsletterMsg("Dziękujemy za zapisanie się do newslettera!");
  }

  return (
    <div className="row">
      <img
        src="https://cdn.discordapp.com/attachments/1024629181428023296/1053444733868982322/sklepbanercaly_Obszar_roboczy_1.png"
        className="w-100"
      />
      <h1 className='m-3'>Bestsellery</h1>
      {bestsellerElements}
      <div className='bg-dark p-4 my-4 d-flex flex-column justify-content-center align-items-center'>
        <h1 className='text-center my-4 text-white'>NEWSLETTER</h1>
        <h5 className='text-center text-white my-2'>zapisz się do newslettera, aby być na bieżąco z nowościami w naszym sklepie!</h5>
        <form className='form d-flex my-4 input-group w-75' onSubmit={newsletterSubmit}>
          <CSRFToken />
          <input required className='form-control p-3' value={newsletter} onChange={(e) => setNewsletter(e.target.value)} type='email' placeholder='E-mail' />
          <button className='btn btn-dark p-3 fw-bold'>ZAPISZ</button>
        </form>
        <h5 className='text-center text-white my-3'>{newsletterMsg}</h5>
      </div>
      <h1 className='m-3'>Nowa Kolekcja</h1>
      {newCollectionElements}
    </div>
  );
}
