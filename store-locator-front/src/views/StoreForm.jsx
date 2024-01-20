import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import axiosClient from "../axios-client";
import "../stores.css";
import axios from "axios";



export default function StoreForm(){
    const navigate = useNavigate();
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);
    const {id} = useParams();
    const [store, setStore] = useState({
        id: null,
        address: '',
        city: '',
        state: '',
        zip_code: '',
        hours: '',
        phone: '',
        active: 0
    })
    const [opening, setOpening] = useState(undefined);
    const [closing, setClosing] = useState(undefined);

    // TODO : collegare hours e cambiarlo dal controller in modo che quando lo invio è gia una stringa e non debba farlo server side ma lo faccia sul client quindi usare opening e closing come valori per gli input e valorizzarlo con hours e lo split "store.hours.split(' - ')"
    if(id){

        useEffect(()=>{
            setLoading(true);
            axiosClient.get(`/stores/${id}`)
                    .then(({data}) => {
                        setLoading(false);
                        setStore(data.data);
                        setOpening(store.hours.split(' - ')[0]);
                        setClosing(store.hours.split(' - ')[1]);
                    })
                    .catch(err =>{

                        setLoading(false);
                    })
        }, [id, store.hours])
    }

    const onSubmit = (e) =>{
        e.preventDefault();
        if(opening != undefined && closing != undefined){
            if(new Date(`2023-12-1 ` + opening) > new Date(`2023-12-1 ` + closing)){
                return setErrors({...errors, hours: "Opening must be before closing"})
            }else{
                store.hours = opening + " - " + closing;
            }
        }else{
            store.hours = null;
        }
        if(store.id){
            axiosClient.put(`/stores/${store.id}`, store)
                    .then(() =>{
                        // NOTIFICATION
                        navigate('/stores');
                    })
                    .catch(err =>{
                        const response = err.response;
                        console.log(response);
                        setErrors(response.data.errors);
                        if(response && response.status === 422){
                            console.log(errors);
                        }
                    })
        }else {


            axiosClient.post(`/stores`, store)
            .then(() =>{
                // NOTIFICATION
                navigate('/stores');
            })
            .catch(err =>{
                const response = err.response;

                if(response && response.status === 422){
                    setErrors(response.data.errors);
                }
            })
         }
    }

    return(
        <div>
            { store.id && <h1>Update store {store.id}</h1>}
            { !store.id && <h1>New store</h1>}
            <div className="card animated fadeInDown">
                {loading && (
                    <div className="text-center">Loading...</div>
                )}
                {!loading && (
                    <form onSubmit={onSubmit}>
                        <label htmlFor="address"><strong>Address</strong></label>
                        <input
                          type="text"
                          id="address"
                          value={store.address}
                          onChange={ev =>
                          setStore({...store,
                          address:
                          ev.target.value})} />
                        {errors && (
                            errors.address &&
                            <div className="alert">
                                <p>{errors.address}</p>
                            </div>
                            )
                        }

                        <label htmlFor="city"><strong>City</strong></label>
                        <input
                          type="text"
                          id="city"
                          value={store.city}
                          onChange={ev =>
                          setStore({...store,
                          city:
                          ev.target.value})} />
                        {errors && (
                            errors.city &&
                            <div className="alert">
                                <p>{errors.city[0]}</p>
                            </div>
                            )
                        }

                        <label htmlFor="state"><strong>State</strong></label>
                        <input
                          type="text"
                          id="state"
                          value={store.state}
                          onChange={ev =>
                          setStore({...store,
                          state:
                          ev.target.value})} />
                        {errors && (
                            errors.state &&
                            <div className="alert">
                                <p>{errors.state}</p>
                            </div>
                            )
                        }
                        <div className="d-flex">
                            <div>

                                <label htmlFor="opening"><strong>Opening</strong></label>
                                    <input
                                    type="time"
                                    id="opening"
                                    value={opening}
                                    onChange={ev =>
                                        setOpening(ev.target.value)} />
                            </div>
                            <div>

                                <label htmlFor="closing"><strong>Closing</strong></label>
                                <input
                                type="time"
                                id="closing"
                                value={closing}
                                onChange={ev =>
                                    setClosing(ev.target.value)} />

                            </div>
                        </div>
                            {errors && (
                                    errors.hours &&
                                    <div className="alert">
                                        <p>{errors.hours}</p>
                                    </div>
                                    )
                                }

                        <label htmlFor="zip_code"><strong>Zip code</strong></label>
                        <input
                          type="number"
                          id="zip_code"
                          value={store.zip_code}
                          onChange={ev =>
                          setStore({...store,
                          zip_code:
                          ev.target.value})} />
                        {errors && (
                            errors.zip_code &&
                            <div className="alert">
                                <p>{errors.zip_code}</p>
                            </div>
                            )
                        }

                        <label htmlFor="phone"><strong>Phone</strong></label>
                        <input
                          type="text"
                          id="phone"
                          value={store.phone}
                          onChange={ev =>
                          setStore({...store,
                          phone:
                          ev.target.value})} />
                        {errors && (
                            errors.phone &&
                            <div className="alert">
                                <p>{errors.phone}</p>
                            </div>
                            )
                        }

                        <label htmlFor="active"><strong>Active</strong></label>
                        <div >
                            <label htmlFor="active">Si</label>
                            <input
                              className="radio"
                              type="radio"
                              id="active"
                              name="active"
                              defaultChecked={store.active
                              ==
                              1}
                              value={1}
                              onChange={ev =>
                                setStore({...store,
                                active:
                                ev.target.value})} />
                        </div>
                        <div>
                            <label htmlFor="active">No</label>
                            <input
                              className="radio"
                              type="radio"
                              id="active"
                              name="active"
                              defaultChecked={store.active
                              ==
                              0}
                              value={0}
                              onChange={ev =>
                                setStore({...store,
                                active:
                                ev.target.value})} />
                        </div>
                        {errors && (
                            errors.active &&
                            <div className="alert">
                                <p>{errors.active}</p>
                            </div>
                            )
                        }

                        {!store.id &&

                            <button className="btn ">
                            Save
                        </button>
                        }
                        {store.id &&

                            <button className="btn ">
                            Update
                        </button>
                        }
                    </form>
                )}


            </div>
        </div>
    )
}

