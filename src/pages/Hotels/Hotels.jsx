import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios'
import HotelList from '../../components/HotelList';

const Hotels = () => {
    const [hotels, setHotels] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [message, setMessage] = useState("Showing All Hotels");

    useEffect(() => {
        (async () => {
            const {data} = await axios.get('http://localhost:8080/api/hotel');
            console.log(data);
            setHotels(data);
            setFiltered(data);
        })();
      }, []);

    const filterHotels = () => {
        let keyword = document.getElementById('input').value;
        if(keyword === "") setMessage("Showing All Hotels");
        else setMessage(`Hotels With Keyword ${keyword}`);
        let filteredHotels = [];
        keyword = keyword.toLowerCase();

        for(let hotel of hotels){
            //search by name or location
            let name = hotel.name.toLowerCase();
            let city = hotel.location.city.toLowerCase();
            let state = hotel.location.state.toLowerCase();
            if (name.indexOf(keyword) > -1 || city.indexOf(keyword) > -1 || state.indexOf(keyword) > -1) {
                filteredHotels.push(hotel);
              }
        }
        setFiltered(filteredHotels);
    }

    return (
        <div className="m-5">
            <div className ="d-flex px-lg-5 mx-lg-5 mb-5">
                <input id="input" type="text" className="form-control rounded-pill" placeholder="Hotel name, city, or state"/>
                <button className="btn btn-dark rounded-pill" onClick={filterHotels}>Search</button>
            </div>
            <h5 className="mx-5 my-3">{message}:</h5>
            <HotelList hotels={filtered} showAll={true}/>

        </div>
    )
}

export default Hotels
