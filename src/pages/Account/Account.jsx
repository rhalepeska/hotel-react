import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux'

import { Spinner } from 'react-bootstrap';

import AccountTabBody from '../../components/AccountTabBody/AccountTabBody';

import Auth from '../../utils/auth';
import { NumberComma } from "../../utils/helpers";

import profileImg from "../../assets/profile-img.png";
import './account.css'

const Account = () => { 

    const [user, setUser] = useState(null);
    const [tabMenuName, setTabMenuName] = useState("Overview");

    const username = useSelector(state => state.user.username)
    const userFirstName = useSelector(state => state.user.firstName)
    const userPoints = useSelector(state => state.user.points)
    const userTotalNights = useSelector(state => state.user.totalNights)


    useEffect(() => {
        (async () => {
            if(!Auth.loggedIn()){
                window.location.assign('/'); 
            }else{
                const userData = await Auth.getProfile();
                console.log(userData.data);
                setUser(userData.data);
            }
        })();
    }, [])

    const onClickTabMenu = (event) => {
        const profileTabMenu = document.getElementsByClassName('profile-tab-menu');

        for(let i = 0; i < profileTabMenu.length; i++){
            profileTabMenu[i].classList.remove('profile-tab-clicked');
        }
        setTabMenuName(event.target.innerText);
        event.target.classList.add('profile-tab-clicked');
    }

    return(<>
    {user != null ? 
    <>
        <section className="profile-top">
        <img className="" src={profileImg} id="profile-img" alt="profile" />
        <div className="">
            <div id="profile-username">{userFirstName != null ? userFirstName : username}</div>
            <div id="profile-menuname">{tabMenuName}</div>
        </div>
        <div className="profile-end">
        {tabMenuName !== "Overview" ?
        <>       
            <div>
                <h3>{NumberComma(userPoints, false)}</h3>
                <p>POINTS</p>
            </div>
            <div>
                <h3>{userTotalNights}</h3>
                <p>NIGHTS THIS YEAR</p>
            </div>
        </>
        : <></>
        }
         </div>
    </section>

    <section>
        <div className="profile-menu">
            <div id="profile-tab-header">
                <div className="profile-tab-menu profile-tab-clicked" onClick={onClickTabMenu}>
                    Overview
                </div>
                <div className="profile-tab-menu" onClick={onClickTabMenu}>
                    My Trips
                </div>
                <div className="profile-tab-menu" onClick={onClickTabMenu}>
                    Profile
                </div>
            </div>
        </div>
        <div id="profile-tab-body">
            <AccountTabBody user={user} tabMenuName={tabMenuName} />
        </div>
    </section>
    </>

    : <Spinner animation="border" variant="success" />}
    </>)
}

export default Account;