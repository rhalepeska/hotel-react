import React from 'react';

import { Carousel } from 'react-bootstrap';

import { NumberComma } from '../../../utils/helpers';

const HotelReviewCard = ({allReviewState}) => { 
    // console.log(allReviewState)
    return(
        <div className="reviewReseravation-flex review-hotel-card">
            <div id="reviewReseravation-left">
                <div className="reviewReseravation-left-sec">
                    <div className="reviewReseravation-left-sec-label">Location:</div>
                    <div className="reviewReseravation-left-sec-value">
                        {allReviewState.hotelInfo.location.street +' '+ allReviewState.hotelInfo.location.city +' '+ allReviewState.hotelInfo.location.state +', '+ allReviewState.hotelInfo.location.zipcode}
                    </div>
                </div>
                <div className="reviewReseravation-left-sec">
                    <div className="reviewReseravation-left-sec-label">Room type:</div>
                    <div className="reviewReseravation-left-sec-value">{allReviewState.numRooms} {allReviewState.roomInfo.name}</div>
                </div>
                <div className="reviewReseravation-left-sec">
                    <div className="reviewReseravation-left-sec-label">Price:</div>
                    <div className="reviewReseravation-left-sec-value">$ {allReviewState.roomInfo.price}</div>
                </div>
                <div className="reviewReseravation-left-sec">
                    <div className="reviewReseravation-left-sec-label">Start:</div>
                    <div className="reviewReseravation-left-sec-value">{allReviewState.reservationData.dateStart.substring(0, 10)}</div>
                </div>
                <div className="reviewReseravation-left-sec">
                    <div className="reviewReseravation-left-sec-label">End:</div>
                    <div className="reviewReseravation-left-sec-value">{allReviewState.reservationData.dateEnd.substring(0, 10)}</div>
                </div>
                <div className="reviewReseravation-left-sec">
                    <div className="reviewReseravation-left-sec-label">Total Price:</div>
                    <div className="reviewReseravation-left-sec-value">$ {NumberComma(allReviewState.totalPrice, true)}</div>
                </div>
            </div>
            <div id="reviewReseravation-right">
                <div className="reviewReseravation-right-carousel">
                    <div className="reviewReseravation-right-carousel-hotelName">{allReviewState.hotelInfo.name}</div>
                    <Carousel>
                        <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={allReviewState.hotelInfo.image}
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
    )
}

export default HotelReviewCard; 