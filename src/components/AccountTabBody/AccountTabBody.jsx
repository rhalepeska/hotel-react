import React from 'react';

import Overview from './Overview/Overview';

import './AccountTabBody.css';
import MyTrips from './MyTrips/MyTrips';
import Profile from './Profile/Profile';

const AccountTabBody = ({user, tabMenuName}) => {
    return(<>
        {tabMenuName === "Overview" ? 
          <Overview user={user} />
        : tabMenuName === "My Trips" ? 
          <MyTrips /> 
        : tabMenuName === "Profile" ?
           <Profile /> 
        :  <></>}
    </>)
}

export default AccountTabBody;