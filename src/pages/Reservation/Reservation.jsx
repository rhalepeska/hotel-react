import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios'
import HotelList from '../../components/HotelList';
import ReserveForm from './ReserveForm';

const Reservation = ({match}) => {
    const id = match.params.id
    console.log(id);
    const [hotel, setHotel] = useState([]);

    useEffect(() => {
        (async () => {
            const {data} = await axios.get(`http://localhost:8080/api/hotel/id/${id}`);
            setHotel([data]);
        })();
      }, []);

    return (
        hotel.length == 0 ? <h5>No Results</h5>
        :
        <div>
            <HotelList hotels={hotel} showAll={true}/>
            <ReserveForm rooms={hotel[0].roomType} hotelid={hotel[0]._id}/>
        </div>
    )
}

export default Reservation
