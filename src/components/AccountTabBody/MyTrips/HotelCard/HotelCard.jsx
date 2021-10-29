import React, { useState, useEffect } from 'react';

import { Carousel, Spinner } from 'react-bootstrap';

import { getReservationById } from '../../../../utils/reservation-API';

const HotelCard = ({reservation, style}) => { 
    console.log(reservation)

    const [ allReservationState, setAllReservationState ] = useState([]);

    useEffect(() => {
        (async () => {
            try{
                let allReservations = [];
                if(reservation != null){
                    for(let i = 0; i < reservation.length; i++){
                        let response = await getReservationById(reservation[i]._id)
                        allReservations.push(response.data[0]);  
                    }
                    console.log(allReservations);
                    setAllReservationState([...allReservations]);
                }else{
                    setAllReservationState(null);
                }
            }catch(err) {
                console.log(err);
            }
        })();
    }, [reservation])

    const selectedHotelRoom =  (roomId, roomTypeArr) => {
        // console.log(roomTypeArr);
        // console.log(roomId)
        const selectedRoom = roomTypeArr.filter(roomType => roomId == roomType._id)
        console.log(selectedRoom)
        return selectedRoom[0];
    }

    return(<>
    { allReservationState != null ?
    allReservationState.length > 0 
    ? allReservationState.map(singleReservation => {
        return(
            <div className="profile-tab-body-flex hotel-card" key={singleReservation._id}>
                <div id="profile-tab-body-myTrips-left">
                    <div className="profile-tab-body-myTrips-left-sec">
                        <div className="profile-tab-body-myTrips-left-sec-label">Location:</div>
                        <div className="profile-tab-body-myTrips-left-sec-value">{singleReservation.hotel.location.state}</div>
                    </div>
                    <div className="profile-tab-body-myTrips-left-sec">
                        <div className="profile-tab-body-myTrips-left-sec-label">Room type:</div>
                        <div className="profile-tab-body-myTrips-left-sec-value">1 {selectedHotelRoom(singleReservation.roomId, singleReservation.hotel.roomType).name}</div>
                    </div>
                    <div className="profile-tab-body-myTrips-left-sec">
                        <div className="profile-tab-body-myTrips-left-sec-label">Price:</div>
                        <div className="profile-tab-body-myTrips-left-sec-value">$ {selectedHotelRoom(singleReservation.roomId, singleReservation.hotel.roomType).price}</div>
                    </div>
                    <div className="profile-tab-body-myTrips-left-sec">
                        <div className="profile-tab-body-myTrips-left-sec-label">Start:</div>
                        <div className="profile-tab-body-myTrips-left-sec-value" style={style}>{singleReservation.dateStart.substring(0, 10)}</div>
                    </div>
                    <div className="profile-tab-body-myTrips-left-sec">
                        <div className="profile-tab-body-myTrips-left-sec-label">End:</div>
                        <div className="profile-tab-body-myTrips-left-sec-value" style={style}>{singleReservation.dateEnd.substring(0, 10)}</div>
                    </div>
                </div>
        <div id="profile-tab-body-myTrips-right">
            <div className="profile-tab-body-myTrips-right-carousel">
                <div className="profile-tab-body-myTrips-right-carousel-hotelName">{singleReservation.hotel.name}</div>
                <Carousel>
                    <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={singleReservation.hotel.image}
                        alt="hotel"
                    />
                    </Carousel.Item>
                    <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://media.cntraveler.com/photos/613aabab7084bd911b309b44/master/pass/Nobu%20Hotel%20Chicago_006-NC-Zen%20Deluxe.jpg"
                        alt="hotel"
                    />
                    </Carousel.Item>
                </Carousel>
            </div>
        </div>
    </div>
    )})
            
    :   <div className="hotel-card" style={{"textAlign":"center"}}>
            <Spinner animation="border" variant="success" />
        </div>
    :   <div className="hotel-card" style={{"textAlign":"center"}}>
            <h1>No Data</h1>
        </div>
    }
    </>
    // <div className="profile-tab-body-flex hotel-card">
    //     <div id="profile-tab-body-myTrips-left">
    //         <div className="profile-tab-body-myTrips-left-sec">
    //             <div className="profile-tab-body-myTrips-left-sec-label">Location:</div>
    //             <div className="profile-tab-body-myTrips-left-sec-value">WA</div>
    //         </div>
    //         <div className="profile-tab-body-myTrips-left-sec">
    //             <div className="profile-tab-body-myTrips-left-sec-label">Room type:</div>
    //             <div className="profile-tab-body-myTrips-left-sec-value">1 Queen bed</div>
    //         </div>
    //         <div className="profile-tab-body-myTrips-left-sec">
    //             <div className="profile-tab-body-myTrips-left-sec-label">Price:</div>
    //             <div className="profile-tab-body-myTrips-left-sec-value">$250</div>
    //         </div>
    //         <div className="profile-tab-body-myTrips-left-sec">
    //             <div className="profile-tab-body-myTrips-left-sec-label">Start:</div>
    //             <div className="profile-tab-body-myTrips-left-sec-value">November 12, 2021</div>
    //         </div>
    //         <div className="profile-tab-body-myTrips-left-sec">
    //             <div className="profile-tab-body-myTrips-left-sec-label">End:</div>
    //             <div className="profile-tab-body-myTrips-left-sec-value">November 16, 2021</div>
    //         </div>
    //     </div>
    //     <div id="profile-tab-body-myTrips-right">
    //         <div className="profile-tab-body-myTrips-right-carousel">
    //             <div className="profile-tab-body-myTrips-right-carousel-hotelName">Hotel Name</div>
    //             <Carousel>
    //                 <Carousel.Item>
    //                 <img
    //                     className="d-block w-100"
    //                     src="https://cdn.britannica.com/96/115096-050-5AFDAF5D/Bellagio-Hotel-Casino-Las-Vegas.jpg?text=First slide&bg=373940"
    //                     alt="hotel"
    //                 />
    //                 </Carousel.Item>
    //                 <Carousel.Item>
    //                 <img
    //                     className="d-block w-100"
    //                     src="https://media.cntraveler.com/photos/613aabab7084bd911b309b44/master/pass/Nobu%20Hotel%20Chicago_006-NC-Zen%20Deluxe.jpg"
    //                     alt="hotel"
    //                 />
    //                 </Carousel.Item>
    //             </Carousel>
    //         </div>
    //     </div>
    // </div>
    )}

export default HotelCard; 