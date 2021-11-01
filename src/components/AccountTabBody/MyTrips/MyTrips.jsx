import React, { useState, useEffect } from 'react';

import { Spinner } from 'react-bootstrap';

import HotelCard from './HotelCard/HotelCard';

import Auth from '../../../utils/auth';
import { getSingleUser } from '../../../utils/user-API';

import './mytrips.css';

const MyTrips = () => {

    const [ user, setUser ] = useState(null);
    const [subMenuName, setSubMenuName] = useState("Upcoming");

    const [ reservations, setReservations ] = useState({});

    // Pass HotelCard component to handle update, 
    // When canceling a reservation on HotelCard, update isUpdate to rerender this component 
    const [ isUpdate, setIsUpdate ] = useState(false);  

    const canceledReservationStyle = {
        "textDecoration": "line-through", 
        "textDecorationColor": "red", 
        "textDecorationThickness": "2px", 
        "color":"gray"
    }

    useEffect(() => {
        (async () => {
            try{
                const userData = await Auth.getProfile();
                const token = Auth.getToken();
                const user = await getSingleUser(userData.data.username, token);
                console.log(user.data[0]);
                
                let reservationArr = user.data[0].reservation ?? [];
                console.log("reservationArr", reservationArr)
                let currentDate = new Date(new Date().setHours(0, 0, 0));

                if(reservationArr.length > 0){
                    // Sort Upcoming Reservation
                    let upcomingReservation = reservationArr.filter(reservation => {
                        let dateStart = new Date(reservation.dateStart);
    
                        if(dateStart >= currentDate && !reservation.isCancel){
                            return reservation;
                        }
                    })
                    // setUpcommingRevervation(upcomingReservation);
    
                    // Sort Canceled Reservation
                    let canceledReservation = reservationArr.filter(reservation => {
                        if(reservation.isCancel){
                            return reservation;
                        }
                    })
                    // setCanceledRevervation(canceledReservation);
    
                    // Sort Past Reservation
                    let pastReservation = reservationArr.filter(reservation => {
                        let dateStart = new Date(reservation.dateStart);
    
                        if(dateStart < currentDate && !reservation.isCancel){
                            return reservation;
                        }
                    })
                    // setPastRevervation(pastReservation);
                    setReservations({
                        upcomingReservation,
                        canceledReservation,
                        pastReservation
                    })
                }else{
                    setReservations({
                        upcomingReservation: null,
                        canceledReservation: null,
                        pastReservation: null
                    })
                }

                setUser(user.data[0])      
            }catch(err) {
                console.log(err);
            }
        })();
    }, [isUpdate])

    const onClickTripsMenu = (event) => {
        const profileTabMenu = document.getElementsByClassName('profile-tab-body-myTrips-menu-div');

        for(let i = 0; i < profileTabMenu.length; i++){
            profileTabMenu[i].classList.remove('profile-tab-body-myTrips-clicked');
        }
        event.target.classList.add('profile-tab-body-myTrips-clicked');
        setSubMenuName(event.target.innerText);     // Store Menu name
    }

    return(<>{user != null ? <>
        <div id="profile-tab-body-myTrips-header">
            <div className="profile-tab-body-myTrips-menu" >
                <div className="profile-tab-body-myTrips-menu-div profile-tab-body-myTrips-clicked" onClick={onClickTripsMenu}>
                    Upcoming
                </div>
            </div>
            <div className="profile-tab-body-myTrips-menu">
                <div className="profile-tab-body-myTrips-menu-div" onClick={onClickTripsMenu}>
                    Canceled
                </div>
            </div>
            <div className="profile-tab-body-myTrips-menu">
                <div className="profile-tab-body-myTrips-menu-div" onClick={onClickTripsMenu}>
                    Past Trips
                </div>
            </div>
        </div>
        <div className="profile-tab-myTrips-hotel-info">
            {subMenuName === "Upcoming" ? <HotelCard reservation={reservations.upcomingReservation} userId={user._id} upcoming={true} setIsUpdate={setIsUpdate} />
            : subMenuName === "Canceled" ?  <HotelCard reservation={reservations.canceledReservation} style={canceledReservationStyle}/>
            : subMenuName === "Past Trips" ? <HotelCard reservation={reservations.pastReservation} />
            : <Spinner animation="border" variant="success" /> }
        </div>
        </>
        :
        <div className="profile-tab-body-flex justify-content-center">
        <Spinner animation="border" variant="success" />
        </div>
        }
    </>);
}

export default MyTrips;