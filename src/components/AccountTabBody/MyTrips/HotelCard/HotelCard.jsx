import React, { useState, useEffect } from 'react';

import { Carousel, Spinner, Modal, Button } from 'react-bootstrap';

import { getReservationById, cancelReservationById } from '../../../../utils/reservation-API';

import { useDispatch } from 'react-redux'
import { setPoints, setTotalNights } from '../../../../redux/slices/user/userSlice';


const HotelCard = ({reservation, userId, upcoming=false, style, setIsUpdate}) => { 
    // console.log(reservation)

    const [ allReservationState, setAllReservationState ] = useState([]);
    const [ reservationIdState, setReservationIdState] = useState("");

    const [ showNoticeModal, setShowNoticeModal] = useState(false);

    const handleClose = () => setShowNoticeModal(false);
    const handleShow = () => setShowNoticeModal(true);

    // To store user data on Redux
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            try{
                setAllReservationState([]);
                
                let allReservations = [];
                if(reservation != null && reservation.length > 0){
                    // console.log(reservation);
                    for(let i = 0; i < reservation.length; i++){
                        let response = await getReservationById(reservation[i]._id)
                        allReservations.push(response.data[0]);  
                    }
                    
                    // Ascending Sorting 
                    allReservations.sort((a, b) => {return new Date(a.dateStart) - new Date(b.dateStart)});
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
        const selectedRoom = roomTypeArr.filter(roomType => {return roomId === roomType._id})
        // console.log(selectedRoom[0])
        return selectedRoom[0];
    }

    const onClickcancelUpcomingReser = async (event) => {
        try {
            handleClose();
            // const reservationId = event.target.dataset.id;
            // const userId = event.target.dataset.userId;
            console.log(userId, reservationIdState)
            // Update a reservation by id to cancel.
            const updated = await cancelReservationById(reservationIdState, userId);

            // Store two states in Redux state
            dispatch(setTotalNights(updated.data.updatedNights));
            dispatch(setPoints(updated.data.updatedPoints));

            setIsUpdate(updated);
        }catch(error) {
            console.log(error);
        }
    }

    const onClickcancelModal = async (event) => {

        const reservationId = event.target.dataset.id;
        const userId = event.target.dataset.userId;
        console.log(userId, reservationId)
        setReservationIdState(event.target.dataset.id)
        handleShow();
    }

    return(<>
    { allReservationState != null ?
    allReservationState.length > 0 
    ? <>{allReservationState.map(singleReservation => {
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
                    <div className="profile-tab-body-myTrips-left-sec">
                        {upcoming ? <button data-id={singleReservation._id} data-user-id={userId} onClick={onClickcancelModal}>Cancel</button> : <></>}
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
    )})}

    <Modal show={showNoticeModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          {/* <Modal.Title>Modal title</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          <p>Do you want to cancel the reservation?</p>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="outline-success" onClick={onClickcancelUpcomingReser} >Okay</Button>
          <Button variant="outline-success" onClick={handleClose}>Close</Button>
        </Modal.Footer>
    </Modal>
    </>
            
    :   <div className="hotel-card" style={{"textAlign":"center"}}>
            <Spinner animation="border" variant="success" />
        </div>
    :   <div className="hotel-card" style={{"textAlign":"center"}}>
            <h1>No Data</h1>
        </div>
    }
    </>
    )}

export default HotelCard; 