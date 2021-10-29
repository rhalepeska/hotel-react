import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SignForm from './SignForm/SignForm';
import Auth from '../utils/auth';

const Nav = () => {

    const [ user, setUser ] = useState({});
    const [ isSignForm, setIsSignForm ] = useState(false);

    const signFormOnClick = () =>{
        setIsSignForm(true)
    }

    useEffect(() => {
        (async () => {
            if(Auth.loggedIn()){
                 const user = await Auth.getProfile();
                 console.log(user);
                 setUser(user.data);
            }
        })();
    }, [])

    return (
        <nav className="navbar navbar-expand navbar-dark blue">
        <div className="container">
            <div className="collapse navbar-collapse" id="navigation">
            <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                    <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/hotels" className="nav-link">Hotels</Link>
                </li>
                {/* <li className="nav-item">{`${message}`}</li> */}
                {Auth.loggedIn() ? (<>
                    <li className="nav-item">
                        <Link to="#" className="nav-link">Hello, {user.username? user.firstName !== "" ? user.firstName : user.username : "World"}</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/account" className="nav-link">Account</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="#" onClick={Auth.logout} className="nav-link">Logout</Link>
                    </li>
                </>) : (
                    <li className="nav-item">
                        <Link to="#" onClick={signFormOnClick} className="nav-link">Sign In or Join</Link>
                        {isSignForm ? <SignForm setIsSignForm={setIsSignForm} /> : <></>}
                    </li>
                ) }
                
            </ul>
            </div>
        </div>
    </nav>
    )
}

export default Nav
