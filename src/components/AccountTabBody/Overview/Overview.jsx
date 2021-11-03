import React from 'react';

import { useSelector } from 'react-redux'

import { NumberComma } from "../../../utils/helpers";


const Overview = ({user}) => {

    const userPoints = useSelector(state => state.user.points)
    const userTotalNights = useSelector(state => state.user.totalNights)

    return(
        <div id="profile-tab-body-overview">    
         <div>
             <span className="overview-boldText">{NumberComma(userPoints, false)}</span> <span className="overview-text">Points</span>
         </div>
         <div>
             <span className="overview-boldText">{userTotalNights}</span> <span className="overview-text">Nights This Year</span>
         </div>
     </div>
    );
}

export default Overview;