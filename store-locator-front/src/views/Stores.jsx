import { useEffect, useState } from "react"
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";
import "../stores.css";

export default function Stores(){

    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState();

    useEffect(() => {
        getStores();
    }, [])

    const getStores = () =>{
        setLoading(true);
        axiosClient.get('/stores')
        .then(({data}) =>{
                    setLoading(false);
                    setStores(data.data)
                    console.log(data);
                })
                .catch(err =>{
                    setLoading(false);
                    console.log(err);
                })
    }

    const onDelete = (store) =>{
        if(!window.confirm("Are you sure ?")){
            return
        }

        axiosClient.delete(`/stores/${store.id}`)
                .then(()=>{
                    getStores();
                })
    }

    return(
        <div>
            <div id="stores-wrapper">
                <h1>Stores</h1>
                <Link to="/stores/new" className="btn-add">
                    Add new
                </Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Zip code</th>
                            <th>Phone</th>
                            <th>Active</th>
                        </tr>
                    </thead>
                    {loading &&
                    <tbody>
                        <tr>
                            <td colSpan={5} className="text-center">
                                Loading ...
                            </td>
                        </tr>
                    </tbody>}
                    {!loading &&
                    <tbody>

                        {stores.map(store =>(
                            <tr key={store.id}>

                                <td>{store.id}</td>
                                <td>{store.address}</td>
                                <td>{store.city}</td>
                                <td>{store.state}</td>
                                <td>{store.zip_code}</td>
                                <td>{store.phone}</td>
                                <td>{store.active}</td>
                                <td>
                                    <Link className="btn-edit" to={"/stores/"+store.id} key={'updateStore'}>Modify</Link>
                                    <button onClick={ev => onDelete(store)} className="btn-delete">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>}
                </table>
            </div>
        </div>
    )
}
