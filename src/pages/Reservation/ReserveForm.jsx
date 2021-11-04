import React from 'react'
import { useState, useEffect } from 'react';
import RoomList from './RoomList';
import { getReservationsByDay } from '../../utils/reservation-API';

const ReserveForm = ({hotelInfo, rooms, hotelid}) => {
    const [formData, setFormData] = useState({ checkin: '', checkout: '' , numRooms: ''}); 
    const [available, setAvailable] = useState([]); //show none by default
    const [show, setShow] = useState(false);
    const [nights, setNights] = useState(0);
    const [reservationDate, setReservationDate] = useState("");

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        setShow(false);
    };

    const findAvailable = async (event) =>{
        event.preventDefault();
        //error handling
        if(formData.numRooms < 1){
            alert('Rooms must be 1 or more');
            return;
        }        
        if(formData.checkin >= formData.checkout){
            alert('Check out date must be after check in date');
            return;
        }
        const today = new Date().toISOString().slice(0, 10); //no time, only date
        if(today > formData.checkin){
            alert("Check in date cannot be before today");
            return;
        }
        //find stay length in days
        const inDate = new Date(formData.checkin);
        const outDate = new Date(formData.checkout);
        setReservationDate({"dateStart": formData.checkin, "dateEnd": formData.checkout})
        const timeDif = outDate.getTime() - inDate.getTime(); //milliseconds
        setNights(timeDif / (1000 * 3600 *24)); //convert to days
        
        try{
            let checked = [];
            for(let room of rooms){
                console.log(formData.checkin, formData.checkout, room._id);
               const response = await getReservationsByDay(formData.checkin, formData.checkout, room._id);
               const reservationsByDay = response.data;
               console.log(reservationsByDay);

               let avail = true;
               console.log(room.quantity); 

               for(let day of reservationsByDay){
                    let filled = 0;     //rooms filled by other reservations
                    if(Number.parseInt(formData.numRooms) > room.quantity){
                        console.log('room not available');
                        avail = false;
                        break;
                    }
                    for(let reservation of day){
                        filled += reservation.roomQuantity;
                        console.log('rooms filled:',filled, 'with max:', room.quantity);
                        if(filled + Number.parseInt(formData.numRooms) > room.quantity){
                            console.log('room not not available; filled+form > max. ', Number.parseInt(formData.numRooms)+filled, room.quantity);
                            avail = false;
                            break;
                        }
                    }
               }
                if(avail){ 
                    checked.push(room);
                }
            }
            setAvailable(checked);
            setShow(true);
        } catch(err){
            alert(err);
        }
    }
    //check avail. = user enters dates and room qt -> check every room type's avail for every day within the period. 
    //display list of room types available with button for reserving
    //if no rooms available, give message
    //reserve button - only works if user is logged in, otherwise message
    return (
      <>
        <div className="border rounded p-3 mx-3">
            <h5>Check Availability: </h5>
            <form className="p-3" onSubmit={findAvailable}>
            <div className="d-md-flex">
                <div className="m-3">
                    <label htmlFor="checkin" className="form-label">Check In:</label>
                    <input type="date" className="form-control" id="checkin" name="checkin" onChange={handleInputChange}/>
                </div>
                <div className="m-3">
                    <label htmlFor="checkout" className="form-label">Check Out:</label>
                    <input type="date" className="form-control" id="checkout" name="checkout" onChange={handleInputChange}/>
                </div>
                <div className="m-3">
                    <label htmlFor="numRooms" className="form-label">Rooms:</label>
                    <input type="number" className="form-control" id="numRooms" name="numRooms" onChange={handleInputChange}/>
                </div>
                <div className="m-3 mt-5">
                    <button className="btn btn-dark rounded-pill">Submit</button>
                </div>
                </div>
            </form>
        </div>
        {show ? <RoomList rooms={available} nights={nights} numRooms={formData.numRooms} hotelInfo={hotelInfo} reservationDate={reservationDate} hotelid={hotelid}/> : <></>}
      </>
    )
}

export default ReserveForm
