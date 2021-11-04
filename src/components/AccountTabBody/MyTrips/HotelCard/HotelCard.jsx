import React, { useState, useEffect } from 'react';

import { Carousel, Spinner, Modal, Button } from 'react-bootstrap';

import { getAllReservation, getReservationById, updateReservationById, cancelReservationById } from '../../../../utils/reservation-API';

import { useDispatch } from 'react-redux'
import { setPoints, setTotalNights } from '../../../../redux/slices/user/userSlice';

import './style.css';

const HotelCard = ({reservation, userId, upcoming=false, style, setIsUpdate}) => { 
    // console.log(reservation)

    const [ allReservationState, setAllReservationState ] = useState([]);
    const [ reservationIdState, setReservationIdState] = useState("");
    const [ inputReservationState, setinputReservationState ] = useState("");

    const [ thisRoomType, setThisRoomType] = useState("");
    const [ thisReservationState, setThisReservationState] = useState("");
    const [ allUpcomingByThisRoomState, setAllUpcomingByThisRoomState] = useState("");

    const [ isCheckRoomAvaialble, setIsCheckRoomAvaialble ] = useState(false);
    const [ notAvailableDateState, setNotAvailableDateState ] = useState([]);
    const [ showWarningNotice, setShowWarningNotice ] = useState(false);

    const [ updateModal, setUpdateModal] = useState(false);
    const [ showNoticeModal, setShowNoticeModal] = useState(false);


    const handleCloseUpdateModal = () => {
        setUpdateModal(false)
        setThisReservationState("")
        setIsCheckRoomAvaialble(false);
        setShowWarningNotice(false);
    };
    const handleShowUpdateModal = () => setUpdateModal(true);    
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

    const onClickUpdateUpcomingReser = async (event) => {
        // call API to update reservation.
        let reservationId = event.target.dataset.reservationId;
        console.log(reservationId);
        console.log(inputReservationState);
        try {
            const response = await updateReservationById(reservationId, userId, thisRoomType.price, inputReservationState);
            console.log(response);


            // Store two states in Redux state
            dispatch(setTotalNights(response.data.updatedNights));
            dispatch(setPoints(response.data.updatedPoints));

            handleCloseUpdateModal();
            setIsUpdate(response);
        }catch(error){
            console.log(error.response.data);
        }
    }

    const onClickUpdateDataChecking = () => {
        console.log("Validation")

        setShowWarningNotice(false);

        let inputReservationForUpdateEl = document.getElementsByClassName('update-modal-value');
        let inputReservationForUpdate = {}
        for( let i = 0; i < inputReservationForUpdateEl.length; i++){
            inputReservationForUpdate[inputReservationForUpdateEl[i].name] = inputReservationForUpdateEl[i].value
            // console.log(inputReservationForUpdateEl[i].name)
            // console.log(inputReservationForUpdateEl[i].value)
        }
        console.log("inputReservationForUpdate", inputReservationForUpdate);
        console.log(thisRoomType)
        console.log(thisReservationState)
        console.log(allUpcomingByThisRoomState)

        // Validation checking if the room is available during user input date.
        // 1. Create HashTable to organize the number of rooms on a specific date.
        let dateHashTable = {};
        for(let i = 0; i < allUpcomingByThisRoomState.length; i++){
            let dateStart = new Date(allUpcomingByThisRoomState[i].dateStart)
            let numRooms = allUpcomingByThisRoomState[i].roomQuantity;

            // Calculate difference days between Start and End.
            let dateEnd = new Date(allUpcomingByThisRoomState[i].dateEnd);
            let diffTime = Math.abs(dateEnd - dateStart);
            let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            console.log("diffDays", diffDays);

            for(let i = 0; i < diffDays; i++){
                let thisDate = `${dateStart.getFullYear()}-${dateStart.getMonth()+1}-${dateStart.getDate()+1}`;
                if(dateHashTable[thisDate] != null) {
                    dateHashTable[thisDate] += numRooms;
                }else{
                    dateHashTable[thisDate] = numRooms;
                }

                // Set Next Day
                dateStart.setDate(dateStart.getDate() + 1);
            }
        }
            console.log(dateHashTable)

        // Calculate difference days between Start and End.
        let inputNumRooms = parseInt(inputReservationForUpdate.numRooms);
        let inputDateStart = new Date(inputReservationForUpdate["update-checkin"])
        let inputDateEnd = new Date(inputReservationForUpdate["update-checkout"]);
        let diffTime = Math.abs(inputDateEnd - inputDateStart);
        let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        console.log("diffDays", diffDays);

        let isCheckAvailableRoom = true;
        let notAvailableDate = [];
        for(let i = 0; i < diffDays; i++){ 
            let thisDate = `${inputDateStart.getFullYear()}-${inputDateStart.getMonth()+1}-${inputDateStart.getDate()+1}`;
            console.log(thisDate);
            if(dateHashTable[thisDate] != null 
                && dateHashTable[thisDate] + inputNumRooms > thisRoomType.quantity){
                    console.log("Room is not available on the date.")
                    
                    notAvailableDate.push(thisDate);
                    isCheckAvailableRoom = false;
                }
            else if(inputNumRooms > thisRoomType.quantity){
                console.log("Room is not available on the date.")
                    
                notAvailableDate.push(thisDate);
                isCheckAvailableRoom = false;
            }
            // Set Next Day
            inputDateStart.setDate(inputDateStart.getDate() + 1);
        }


        // Display Update Button.
        if(isCheckAvailableRoom) {
            setIsCheckRoomAvaialble(true);
            setinputReservationState({
                "dateStart": inputReservationForUpdate["update-checkin"],
                "dateEnd": inputReservationForUpdate["update-checkout"],
                "roomQuantity": parseInt(inputReservationForUpdate["numRooms"])
            })
            // Disabled 
            let modalEl = document.getElementsByClassName('update-modal-value');
            for(let i = 0; i < modalEl.length; i++){
                modalEl[i].disabled = true;
            }
        }else{
            // Display warning.
            console.log("Not available date", notAvailableDate)
            setShowWarningNotice(true)
            setNotAvailableDateState(notAvailableDate);
        }

    }

    const onClickUpdateModal = async (event) => {
        handleShowUpdateModal();
        const reservationId = event.target.dataset.id;
        const roomId = event.target.dataset.roomId;
        const userId = event.target.dataset.userId;
        console.log(userId, reservationId)

        try {
            // TODO: Get all reservation by roomID and Date
            // Adding an Alias for destructured variable
            const { data: allReservation } = await getAllReservation();
            console.log(allReservation);

            // Get all upcoming reservation of the room excepting for current target reservation. 
            const allUpcomingByThisRoom = allReservation.filter(reservation => {
                if(new Date(reservation.dateStart)  > new Date() 
                && reservation.roomId === roomId 
                && reservation.isCancel !== true
                && reservation._id !== reservationId){
                    return reservation;
                }
            })

            const thisReservation = allReservation.filter(reservation => reservation._id === reservationId);
            const thisRoomType = thisReservation[0].hotel.roomType.filter(room => room._id === roomId)
            console.log("allUpcomingByThisRoom", allUpcomingByThisRoom);
            console.log("thisRoomType", thisRoomType[0])
            console.log("thisReservation[0]", thisReservation[0]);
            setAllUpcomingByThisRoomState(allUpcomingByThisRoom)
            setThisRoomType(thisRoomType[0]);
            setThisReservationState(thisReservation[0]);

            // Put default date to Input(type=date) in Update Modal
            document.getElementById('update-checkin').value = thisReservation[0].dateStart.substring(0, 10);
            document.getElementById('update-checkout').value = thisReservation[0].dateEnd.substring(0, 10);
            document.getElementById('update-numRooms').value = thisReservation[0].roomQuantity;

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
                        <div className="profile-tab-body-myTrips-left-sec-value">{singleReservation.roomQuantity} {selectedHotelRoom(singleReservation.roomId, singleReservation.hotel.roomType).name}</div>
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
                        {upcoming ? <button data-id={singleReservation._id} data-user-id={userId} data-room-id={singleReservation.roomId} onClick={onClickUpdateModal}>Update</button> : <></>}
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

    <Modal show={updateModal} onHide={handleCloseUpdateModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit your reservation.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {thisReservationState !== "" ?
           <div className="update-reservation-modal">
                   <div>
                        <label>Hotel name: </label>
                        <div className="value">{thisReservationState.hotel.name}</div>
                   </div>
                   <div>
                        <label>Room type: </label>
                        <div className="value">{thisRoomType.name}</div>
                   </div>
                   <div>
                        <label>Price: </label>
                        <div className="value">$ {thisRoomType.price}</div>
                   </div>
                    <div>
                        <label>Rooms: </label>
                        <input className="update-input-rooms update-modal-value" id="update-numRooms" name="numRooms" type="number" />
                    </div>
                    <div>
                        <label>Start: </label>
                        <input className="update-input-date update-modal-value" type="date" id="update-checkin" name="update-checkin" />
                    </div>
                    <div>
                        <label>End: </label>
                        <input className="update-input-date update-modal-value" type="date" id="update-checkout" name="update-checkout" />
                    </div>

                    {showWarningNotice ? 
                        <div className="checking-warning alert-danger">
                            <div>Not available during the date</div>
                            <ul>{notAvailableDateState.map(date => <li>{date}</li>)}</ul>
                        </div>
                        : <></>}
            </div>
           : <div style={{"textAlign":"center"}}><Spinner animation="border" variant="success" /></div> }
        </Modal.Body>
        <Modal.Footer>
            {!isCheckRoomAvaialble ? <Button variant="outline-success" onClick={onClickUpdateDataChecking} >Check</Button> : <></>}
            {isCheckRoomAvaialble ? <Button variant="outline-success" data-reservation-id={thisReservationState._id} onClick={onClickUpdateUpcomingReser} >Update</Button> : <></>}
            <Button variant="outline-success" onClick={handleCloseUpdateModal}>Close</Button>
        </Modal.Footer>
    </Modal>

    <Modal show={showNoticeModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
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