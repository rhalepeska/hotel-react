import React from 'react'
import Auth from '../../utils/auth';

const RoomList = ({rooms, nights, numRooms}) => {

    const reserve = async(event) => {
        event.preventDefault();
        if(!Auth.loggedIn()){
            alert('Please log in to make a reservation');
        }
        else{
            try{
            //post reservation
            }catch(err){
                alert(err);
            }
        }
    }
    return (
        rooms.length == 0 ? <h5>No Results</h5> 
        :
        <div className="container my-3">
            <h4 className="m-4">Available Rooms: </h4>
            {rooms.map((room) => {
                return(
                    <div key={room._id} className="d-md-flex border my-2 p-2 light">
                        <p className="fw-bold mx-2 w-75">{room.name} - {room.beds} beds, {nights} nights</p> 
                        <div className="d-flex mx-2">
                            <p className="mx-2">${room.price*nights*numRooms} total</p>
                            <button onClick={reserve} className="btn btn-dark btn-sm rounded-pill mx-2">Reserve {numRooms} Rooms</button>
                        </div>
                    </div>
                )
            })}
            
        </div>
    )
}

export default RoomList
