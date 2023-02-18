import React from 'react';
import ProductCard from '../components/ProductCard';

export default function Shop() {
  const [products, setProducts] = React.useState([]);
  const [checkboxes, setCheckboxes] = React.useState({
    men: true,
    women: true,
    unisex: true,
  });
  const [search, setSearch] = React.useState("");

  const displayedProducts = products.filter(x => (checkboxes.men && x.sex === "men") || (checkboxes.women && x.sex === "women") || (checkboxes.unisex && x.sex === "unisex"))

  function handleCheckboxes(e){
    const {name} = e.target;
    setCheckboxes(prev => ({
      ...prev,
      [name]: !prev[name]
    }))
  };

  const [categories, setCategories] = React.useState([]);
  const [collections, setCollections] = React.useState([]);
  const [sort, setSort] = React.useState("");
  const [currentSubpage, setCurrentSubpage] = React.useState("Wszystkie");

  function handleSort(e){
    setSort(e.target.value);
    if (e.target.value === "pDesc"){
      setProducts(prev => prev.sort((a, b) => b.price - a.price));
    } else if (e.target.value === "pAsc"){
      setProducts(prev => prev.sort((a, b) => a.price - b.price));
    } else if (e.target.value === "dDesc"){
      setProducts(prev => prev.sort((a, b) => new Date(b.date) -  new Date(a.date)));
    } else if (e.target.value === "dAsc"){
      setProducts(prev => prev.sort((a, b) => new Date(a.date) - new Date(b.date)));
    } 
  }

  const getProducts = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/get_products');
    const data = await response.json();
    setProducts(data);
    setSort("");
    setCurrentSubpage("Wszystkie");
  };

  const getCategories = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/get_categories');
    const data = await response.json();
    setCategories(data);
  };

  const getCollections = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/get_collections');
    const data = await response.json();
    setCollections(data);
  };

  const getProductsByCategory = async (category) => {
    const response = await fetch("http://127.0.0.1:8000/api/get_products_by_category/" + category)
    const data = await response.json();
    setProducts(data);
    setSort("");
    setCurrentSubpage("Kategoria: " + category);
  };

  const getProductsByCollection = async (collection) => {
    const response = await fetch("http://127.0.0.1:8000/api/get_products_by_collection/" + collection)
    const data = await response.json();
    setProducts(data);
    setSort("");
    setCurrentSubpage("Kolekcja: " + collection);
  };

  const getBestsellers = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/get_bestsellers")
    const data = await response.json();
    setProducts(data); 
    setSort("");
    setCurrentSubpage("Bestsellery");
  };

  const getProductsBySearch = async (e) => {
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:8000/api/get_search/" + search)
    const data = await response.json();
    setProducts(data);
    setCurrentSubpage('Wyniki wyszukiwania dla: "' + search + '"');
    setSearch("");
  };

  React.useEffect(() => {
    getProducts();
    getCategories();
    getCollections();
  }, []);

  const productElements = displayedProducts.length > 0 ? displayedProducts.map((x, index) => (
    <ProductCard
      key={index}
      name={x.name}
      category={x.category}
      photo={x.photo}
      price={x.price}
      sex={x.sex}
      slug={x.slug}
    />
  )) : <h3 className='m-3'>Brak produktów</h3>;

  const categoryElements = categories.map((x, index) => (
    <dd role='button' key={index} onClick={() => getProductsByCategory(x.name)}>{x.name}</dd>
  ));

  const collectionElements = collections.map((x, index) => (
    <dd role='button' key={index} onClick={() => getProductsByCollection(x.name)}>{x.name}</dd>
  ));

  return (
    <div className="row">
      <div className='col-12 col-lg-3'>
        <dl className='p-3'>
          <dt role='button' onClick={() => getProducts()}>Wszystkie</dt>
          <dt role='button' onClick={() => getBestsellers()}>Bestsellery</dt>
          <dt>Kategorie</dt>
          {categoryElements}
          <dt>Kolekcje</dt>
          {collectionElements}
        </dl>
        <div className='p-3'>
          <div className='form-check d-flex align-items-center'>
            <input className='form-check-input mx-2' id='mencheck' type="checkbox" name="men" onChange={handleCheckboxes} checked={checkboxes.men} />
            <label class="form-check-label" htmlFor='mencheck'>
              Men
            </label>
          </div>
          <div className='form-check d-flex align-items-center'>
            <input className='form-check-input mx-2' id='womencheck' type="checkbox" name="women" onChange={handleCheckboxes} checked={checkboxes.women} />
            <label class="form-check-label" htmlFor='womencheck'>
              Women
            </label>
          </div>
          <div className='form-check d-flex align-items-center'>
            <input className='form-check-input mx-2' id='unisexcheck' type="checkbox" name="unisex" onChange={handleCheckboxes} checked={checkboxes.unisex} />
            <label class="form-check-label" htmlFor='unisexcheck'>
              Unisex
            </label>
          </div>
        </div>
      </div>
      <div className='col-12 col-lg-9'>
        <div className='row'>
          <div className='col-12'>
            <h2 className='m-3'>{currentSubpage}</h2>
            <div className='d-flex my-3 justify-content-between'>
              <select
                  className="form-select mx-2 w-25"
                  value={sort}
                  onChange={handleSort}
                  name="sort"
                  >
                  <option value="">Sortuj</option>
                  <option value="pDesc">Cena malejąco</option>
                  <option value="pAsc">Cena rosnąco</option>
                  <option value="dDesc">Data dodania malejąco</option>
                  <option value="dAsc">Data dodania rosnąco</option>
              </select>
              <form className="d-flex w-50 mx-2" role="search" onSubmit={getProductsBySearch}>
                <input required className="form-control me-2" name='search' onChange={(e) => setSearch(e.target.value)} value={search} type="search" placeholder="Szukaj" aria-label="Search" />
                <button className="btn btn-outline-secondary">Szukaj</button>
              </form>
            </div>
          </div>
          {productElements}
        </div>
      </div>
    </div>
  )
}
