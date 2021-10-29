import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import HotelList from '../../components/HotelList';

const Home = () => {
    const [featured, setFeatured] = useState([]);
    useEffect(() => {
        (async () => {
            const {data} = await axios.get('http://localhost:8080/api/hotel/featured');
            console.log(data);
            setFeatured(data);
        })();
      }, []);

    return (
        <>
        <div className="container">
            <h1 className="p-3 m-2"><span className="px-3 py-1 shadow border rounded-pill"> Spinka Hotels</span></h1>
        </div>
        <div className="text-center py-3 my-2 bk-img">
            <div>
                <h3 className="py-3">Get Away</h3>
                <button className="btn btn-dark rounded-pill">Book Now</button>
            </div>
        </div>
        <div className="container">
            <h3 className="mt-5">Featured Hotels:</h3>
            <div className="d-md-flex my-3">
                <HotelList hotels={featured} showAll={false}/>
            </div>
            <div className="text-center py-3">
                <Link to="/hotels" className="btn btn-dark rounded-pill">See More</Link>
            </div>
        </div>
        </>
    )
}

export default Home


                