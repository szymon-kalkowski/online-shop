import React from "react";
import CartRow from "../components/CartRow.js"
import { Link , useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import CSRFToken from "../components/Csrftoken.js";

export default function Checkout(props){
    const navigate = useNavigate();

    const [deliveries, setDeliveries] = React.useState([]);

    const getDeliveries = async () => {
        const response = await fetch('http://127.0.0.1:8000/api/get_deliveries');
        const data = await response.json();
        setDeliveries(data);
    };

    React.useEffect(() => {
        getDeliveries();
    }, []);

    const deliveryOptions = deliveries.map(x => <option key={x.id} value={x.id}>{x.name}</option>)

    const cartTotal = props.cart.reduce((akum, curr) => akum + (curr.price * curr.amount), 0.00)
    const cartItems = props.cart.reduce((akum, curr) => akum + +curr.amount, 0)
    const [sum, setSum] = React.useState(cartTotal) 
    
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
            isCart={false}
        />
    ));

    const [delivery, setDelivery] = React.useState("")
    const [showForm, setShowForm] = React.useState(false)

    function handleDeliveryChange(event){
        setDelivery(event.target.value)
    }

    function handleDeliverySubmit(e){
        e.preventDefault();
        setShowForm(prev => !prev);
        setSum(cartTotal + +deliveries.filter(x => x.id === +delivery)[0]['price']);
    }

    function editDelivery(){
        setShowForm(prev => !prev);
    }

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

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async data => {
        await fetch("http://127.0.0.1:8000/api/post_order", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({
                name: data.name,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone,
                city: data.city,
                zipcode: data.zipcode,
                street: data.street,
                local: data.local,
                info: data.info,
                sum: sum.toFixed(2),
                delivery: deliveries.filter(x => x.id === +delivery)[0]['name'],
                cart: props.cart
            })
        })
        props.setCart([]);
        navigate("/dziekujemy");
    };

    return (
        <>
            <h1 className="my-3 px-5 pt-5">PODSUMOWANIE</h1>
            <div className="row">
                <div className="col-12 col-lg-7 p-5">
                    {cartElements}
                    {props.cart.length === 0 && <h3 className="text-center">Twój koszyk jest pusty</h3>}
                </div>
                <div className="col-12 col-lg-5 p-5 d-flex flex-column f1">
                    <div className="rounded-5 bg-white w-100 p-4">
                        <h2>Ilość: {cartItems}</h2>
                        <h2>Cena produktów: {cartTotal.toFixed(2)}zł</h2>
                        {!showForm && <form className="form my-2" onSubmit={handleDeliverySubmit}>
                            <select
                                className="form-select my-3"
                                value={delivery}
                                onChange={handleDeliveryChange}
                                required
                                name="delivery"
                                >
                                <option value="">Wybierz sposób dostawy</option>
                                {deliveryOptions}
                            </select>
                            <button className="btn btn-secondary" disabled={props.cart.length === 0}>Dalej</button>
                        </form>}
                    </div>
                    {showForm && <div className="rounded-5 bg-white w-100 p-4 my-3">
                        <h2>Sposób dostawy: {deliveries.filter(x => x.id === +delivery)[0]['name']}</h2>
                        <button className="btn btn-secondary" onClick={editDelivery}>Edytuj sposób dostawy</button>
                        <h2 className="my-3">Suma: {sum.toFixed(2)}zł</h2>

                        <form className="form" onSubmit={handleSubmit(onSubmit)}>
                            <CSRFToken />
                            <input className="form-control mt-2" type="text" placeholder="Imię" {...register("name", {required: true})} />
                            {errors.name && <span className="text-danger">To pole jest wymagane</span>}
                            <input className="form-control mt-2" type="text" placeholder="Nazwisko" {...register("lastName", {required: true})} />
                            {errors.lastName && <span className="text-danger">To pole jest wymagane</span>}
                            <input className="form-control mt-2" type="email" placeholder="E-mail" {...register("email", {required: "To pole jest wymagane", pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Entered value does not match email format"
                            }})} />
                            {errors.email && <span className="text-danger">{errors.email.message}</span>}
                            <input className="form-control mt-2" type="text" placeholder="Numer Telefonu" {...register("phone")} />
                            <input className="form-control mt-2" type="text" placeholder="Miejscowość" {...register("city", {required: true})} />
                            {errors.city && <span className="text-danger">To pole jest wymagane</span>}
                            <input className="form-control mt-2" type="text" placeholder="Kod pocztowy" {...register("zipcode", {required: true})} />
                            {errors.zipcode && <span className="text-danger">To pole jest wymagane</span>}
                            <input className="form-control mt-2" type="text" placeholder="Ulica i numer domu" {...register("street", {required: true})} />
                            {errors.street && <span className="text-danger">To pole jest wymagane</span>}
                            <input className="form-control mt-2" type="text" placeholder="Numer mieszkania" {...register("local")} />
                            <textarea className="form-control mt-2" type="textarea" placeholder="Dodatkowe informacje" {...register("info")} />

                            <button className="btn btn-secondary my-3 d-block mx-auto">Złóż zamówienie</button>
                        </form>
                    </div>}
                </div>
            </div>
        </>
    )
}