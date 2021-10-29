import React from 'react'

const HotelTable = ({location, rooms}) => {
    return (
        <div className="container p-3">
            <p className="p-3">
                <span className="fw-bold px-1">Address: </span>
                <span>{location.street}, {location.city}, {location.state} {location.zipcode}</span>
            </p>
            <div className="p-3">
                <p className="fw-bold px-1">Rooms: </p>
                {rooms.map((room) => {
                    return <p key={room._id}>{room.name} - {room.beds} beds, ${room.price}</p>
                })}
            </div>
        </div>
    )
}

export default HotelTable
