import React, { useState, useEffect } from 'react';

import './reviewReservation.css';

import Auth from '../../utils/auth';
import { getSingleUser } from '../../utils/user-API';

import { Spinner, Modal, Button } from 'react-bootstrap';

import HotelReviewCard from './HotelReviewCard/HotelReviewCard';
import CardInfo from './CardInfo/CardInfo';
import BillingAddress from './BillingAddress/BillingAddress';

import { createReservation } from '../../utils/reservation-API';

import { useDispatch } from 'react-redux'
import { setPoints, setTotalNights } from '../../redux/slices/user/userSlice';


const ReviewReservation = ({allReviewState, setIsReviewReservation}) => {

    const [ user, setUser ] = useState(null);
    const [ noticeModal, setNoticeModal ] = useState(null);
    const [ showNoticeModal, setShowNoticeModal] = useState(false);

    const [ updateInfo, setUpdateInfo ] = useState("");

    const handleClose = () => setShowNoticeModal(false);
    const handleShow = () => setShowNoticeModal(true);

    // To store user data on Redux
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            try{
                const userData = await Auth.getProfile();
                const token = Auth.getToken();
                const user = await getSingleUser(userData.data.username, token);
                console.log(user);
                setUser(user.data[0])      
            }catch(err) {
                console.log(err);
            }
        })();
    }, [updateInfo])

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        document.getElementById("reviewReservation-backdrop").style.display = "block";
        const signFormModal = document.getElementById("reviewReservation-modal");
        signFormModal.style.display = "block"
        signFormModal.classList.add("show")
    }, [])

    const closeModal = () => {
        document.body.style.overflow = 'visible';
        document.getElementById("reviewReservation-backdrop").style.display = "none"
        document.getElementById("reviewReservation-modal").style.display = "none"
        document.getElementById("reviewReservation-modal").classList.remove("show")

        setIsReviewReservation(false);
    }

    // Check if There is  Card information
    const checkCardInfo = () => {
        if(user.cardInfo != null 
            && user.cardInfo.cardType.length > 0
            && user.cardInfo.cardCvc.length > 0
            && user.cardInfo.cardNumber.length > 0
            && user.cardInfo.expDate.length > 0
            && user.cardInfo.nameOnCard.length > 0
        ){
            return true;
        }else{
            return false;
        }
    }

    // Check if There is  Billing Address information
    const checkbillingAddress = () => {
        if(user.billingAddress != null 
            && user.billingAddress.firstName.length > 0
            && user.billingAddress.lastName.length > 0
            && user.billingAddress.street.length > 0
            && user.billingAddress.city.length > 0
            && user.billingAddress.state.length > 0
            && user.billingAddress.zipcode.length > 0
        ){
            return true;
        }else{
            return false;
        }
    }

    const submitReservation = async () => {
        if(checkCardInfo()){
            if(checkbillingAddress()){
                // Make a reservation
                console.log("Make a reservation")
                console.log("allReviewState", allReviewState);
                console.log("cardInfo", user.cardInfo)
                const reservationData = {...allReviewState.reservationData, "cardInfo": user.cardInfo, "roomQuantity": allReviewState.numRooms}
                console.log("reservationData", reservationData);

                try {
                    const updated = await createReservation(reservationData, user._id, allReviewState.roomInfo.price)
                    console.log(updated);
                    handleShow();
                    setNoticeModal("Booking successful");
                    console.log(updated)
                    // Store two states in Redux state
                    dispatch(setTotalNights(updated.data.updatedNights));
                    dispatch(setPoints(updated.data.updatedPoints));

                    document.body.style.overflow = 'visible';
                    closeModal();
                    window.location.assign('/account');
                }catch(error){
                    handleShow();
                    setNoticeModal(error.response.data.message);
                }
            }else{
                handleShow();
                setNoticeModal("Please Add Billing Address Information")
            }
        }else{
            handleShow();
            setNoticeModal("Please Add Credit Card Information")
        }
    }

    return(<>
    <div>
        <section className="reviewReservation modal fade" id="reviewReservation-modal" tabIndex="-1">
            <div className="reviewReservation-header">
                <button type="button" className="close btn reviewReservation-header-close" aria-label="Close" onClick={closeModal}>
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div className="reviewReservation-body">
                <div className="review-hotel-info">
                    <HotelReviewCard allReviewState={allReviewState} />
                </div>
                <div className="review-card-info reviewReseravation-flex">
                    {user != null
                    ? <>
                        <div>
                            <h4 className="text-center mb-5">Card Information</h4>
                            <CardInfo user={user} setUser={setUser} setUpdateInfo={setUpdateInfo} /> 
                        </div>
                        <div>
                            <h4 className="text-center mb-5">Billing Address</h4>
                            <BillingAddress user={user} setUser={setUser} setUpdateInfo={setUpdateInfo} />
                        </div>
                    </>
                    : <div className="flex-center">
                        <Spinner animation="border" variant="success" />
                      </div>}
                </div>
                <div className="reviewReseravation-flex">
                    <button className="reviewReseravation-submit-btn" onClick={submitReservation}>Make a reservation</button>
                    <button className="reviewReseravation-submit-btn" onClick={closeModal}>Cancel</button>
                </div>
            </div>
        </section>
        <div className="modal-backdrop fade show" id="reviewReservation-backdrop" style={{"display":"none"}}></div>
        <Modal show={showNoticeModal} onHide={handleClose}>
            <Modal.Header closeButton>
              {/* <Modal.Title>Modal title</Modal.Title> */}
            </Modal.Header>

            <Modal.Body>
              <p>{noticeModal}.</p>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    </div> 
    </>)
}

export default ReviewReservation;