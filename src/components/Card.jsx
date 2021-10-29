import React from 'react'
import { useHistory } from "react-router-dom";

const Card = ({hotel}) => {
    const history = useHistory();

    const linkTo = () => {
        console.log('click');
        let path = `/reserve/${hotel._id}`; 
        history.push(path);
    }

    return (
        <div className="card mx-auto my-2 w-auto" role="button" onClick={linkTo}>
            <div className="card-header">
                <p className="fw-bold">{hotel.name} Hotel</p>    
            </div>
            <div className="card-body bk-img bg-transparent" style={{backgroundImage: `url(${hotel.image})`, height: "200px"}}>
                <p className="text-center p-2 px-3 mb-0 rounded">{hotel.location.city}, {hotel.location.state}</p>
            </div>
        </div>
    ) 
}

export default Card
