import React from 'react'
import HotelTable from '../pages/Hotels/HotelTable';
import Card from './Card'

const HotelList = (props) => {
    //logic: if no hotels, h3 only. if showAll=false, show only card. otherwise, show card+table
    return (
        props.hotels.length == 0 ? <h5>No Results</h5>
        : !props.showAll ?
            <>
                {props.hotels.map((hotel) => {
                    return(
                        <Card key={hotel._id} hotel={hotel}/>
                    )}
                )};
            </>
            :
            <>
                 {props.hotels.map((hotel) => {
                    return(
                        <div key={hotel._id} className="d-md-flex border rounded px-3 m-3 light">
                            <Card hotel={hotel}/>
                            <HotelTable location={hotel.location} rooms={hotel.roomType}/>
                        </div>
                    )}
                )};
            </>
    )
}

export default HotelList
