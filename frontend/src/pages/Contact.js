import React from "react";
import { useForm } from 'react-hook-form';
import CSRFToken from "../components/Csrftoken";

export default function Contact(){
    const [sent, setSent] = React.useState("");
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

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

    async function onSubmit(data){
        await fetch("http://127.0.0.1:8000/api/post_message", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({
                name: data.name,
                email: data.email,
                topic: data.topic,
                content: data.content,
            })
        })
        reset();
        setSent("Wiadomość wysłana pomyślnie!");
    };

    return (
        <div className="row">
            <div className="col-12 col-lg-6 offset-lg-3">
                <h1 className="text-center my-3">KONTAKT</h1>
                <h3 className="text-center my-2">{sent}</h3>
                <form className="form w-100 p-2" onSubmit={handleSubmit(onSubmit)}>
                    <CSRFToken />
                    <label className="d-block mt-2">Imię i nazwisko</label>
                    <input className="form-control mt-2" type="text" {...register("name", {required: true})} />
                    {errors.name && <span className="text-danger">To pole jest wymagane</span>}
                    <label className="d-block mt-2">Email</label>
                    <input className="form-control mt-2" type="email" {...register("email", {required: "To pole jest wymagane", pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Entered value does not match email format"
                    }})} />
                    {errors.email && <span className="text-danger">{errors.email.message}</span>}
                    <label className="d-block mt-2">Temat</label>
                    <input className="form-control mt-2" type="text" {...register("topic", {required: true})} />
                    {errors.topic && <span className="text-danger">To pole jest wymagane</span>}
                    <label className="d-block mt-2">Treść</label>
                    <textarea className="form-control mt-2" type="textarea" {...register("content", {required: true})} />
                    {errors.content && <span className="text-danger">To pole jest wymagane</span>}
                    <button className="btn btn-secondary my-3 d-block mx-auto">WYŚLIJ</button>
                </form>
            </div>
        </div>
    )
}