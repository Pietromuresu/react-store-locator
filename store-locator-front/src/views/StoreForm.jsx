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
        opening: '',
        closing: '',
        phone: '',
        active: 0
    })

    if(id){

        useEffect(()=>{
            setLoading(true);
            axiosClient.get(`/stores/${id}`)
                    .then(({data}) => {
                        setLoading(false);
                        setStore(data.data);
                    })
                    .catch(err =>{
                        setErrors(err);
                        setLoading(false);
                    })
        }, [id])
    }

    const onSubmit = (e) =>{
        e.preventDefault();

        if(store.id){
            axiosClient.put(`/stores/${store.id}`, store)
                    .then(() =>{
                        // NOTIFICATION
                        navigate('/stores');
                    })
                    .catch(err =>{
                        const response = err.response;
                        console.log(response);
                        if(response && response.status === 422){
                            setErrors(response.data.errors);
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
                console.log(response);
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
                                <p>{errors.city}</p>
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
                                value={store.opening}
                                onChange={ev =>
                                    setStore({...store,
                                        opening:
                                        ev.target.value})} />
                                {errors && (
                                    errors.opening &&
                                    <div className="alert">
                                        <p>{errors.opening}</p>
                                    </div>
                                    )
                                }
                                </div>
                                <div>

                                <label htmlFor="closing"><strong>Closing</strong></label>
                                <input
                                type="time"
                                id="closing"
                                value={store.closing}
                                onChange={ev =>
                                    setStore({...store,
                                        closing:
                                        ev.target.value})} />
                                {errors && (
                                    errors.closing &&
                                    <div className="alert">
                                        <p>{errors.closing}</p>
                                    </div>
                                    )
                                }
                                </div>
                        </div>

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

