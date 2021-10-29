import React from 'react';

import { NumberComma } from "../../../utils/helpers";


const Overview = ({user}) => {


    return(
        <div id="profile-tab-body-overview">    
         <div>
             <span className="overview-boldText">{NumberComma(user.points, false)}</span> <span className="overview-text">Points</span>
         </div>
         <div>
             <span className="overview-boldText">{user.totalNights}</span> <span className="overview-text">Nights This Year</span>
         </div>
     </div>
    );
}

export default Overview;