import React, { useState, useEffect } from 'react';
import Auth from '../../utils/auth';

import ReviewReservation from '../../components/ReviewReservation/ReviewReservation';
import { Spinner } from 'react-bootstrap';

const RoomList = ({rooms, nights, numRooms, hotelInfo, reservationDate, hotelid}) => {

    const [ user, setUser ] = useState('');
    const [ allReviewState, setAllReviewState ] = useState({})
    const [ isReviewReservation, setIsReviewReservation ] = useState(false);

    useEffect(() => {
        (async () => {
            if(!Auth.loggedIn()){
                // window.location.assign('/'); 
            }else{
                const userData = await Auth.getProfile();
                console.log(userData.data);
                setUser(userData.data);
            }
        })();
    }, [])

    const reserve = async(event) => {
        event.preventDefault();
        if(!Auth.loggedIn()){
            alert('Please log in to make a reservation');
        }
        else{
            try{
                setIsReviewReservation(true)
                //post reservation
                const roomInfo = JSON.parse(event.target.dataset.roomInfo);
                let reservationData = {
                    "roomId": roomInfo._id,
                    "hotel": hotelid,
                    "dateStart": reservationDate.dateStart,
                    "dateEnd": reservationDate.dateEnd
                }

                let totalPrice = roomInfo.price * nights * numRooms;

                const allReviewData = {
                    hotelInfo,
                    roomInfo,
                    reservationData,
                    userId: user._id,
                    numRooms,
                    totalPrice
                }
                console.log("allReviewData", allReviewData)
                setAllReviewState({...allReviewData});

                }catch(err){
                    alert(err);
                }
        }
    }
    return (
        user != null ?
        rooms.length === 0 
        ? <h5>No Results</h5> 
        : <div className="container my-3">
            <h4 className="m-4">Available Rooms: </h4>
            {rooms.map((room) => {
                return(
                    <div key={room._id} className="d-md-flex border my-2 p-2 light">
                        <p className="fw-bold mx-2 w-75">{room.name} - {room.beds} beds, {nights} nights</p> 
                        <div className="d-flex mx-2">
                            <p className="mx-2">$ {room.price*nights*numRooms} total</p>
                            <button onClick={reserve} 
                                data-room-info={JSON.stringify(room)}
                                className="btn btn-dark btn-sm rounded-pill mx-2">
                                Reserve {numRooms} Rooms
                            </button>
                        </div>
                    </div>
                )
            })}
            {isReviewReservation ? <ReviewReservation allReviewState={allReviewState} setIsReviewReservation={setIsReviewReservation} /> : <></>}
        </div>
        : <Spinner animation="border" variant="success" />
    )
}

export default RoomList
