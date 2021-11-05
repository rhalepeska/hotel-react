import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SignForm from './SignForm/SignForm';
import Auth from '../utils/auth';
import { getSingleUser } from '../utils/user-API';

import { useSelector, useDispatch } from 'react-redux'
import { setFirstName, setUsername, setPoints, setTotalNights } from '../redux/slices/user/userSlice';
import {useTranslation} from 'react-i18next';
import { useHistory } from "react-router-dom";

const Nav = () => {
    const [ isSignForm, setIsSignForm ] = useState(false);
    const [t, i18n] = useTranslation();
    const [lang, setLang] = useState("");
    const languageHandler = lang => {
        i18n.changeLanguage(lang)
      }

    const userFirstName = useSelector(state => state.user.firstName)
    const username = useSelector(state => state.user.username)
    // To store user data on Redux
    const dispatch = useDispatch();
    const history = useHistory();

    const logout = () => {
        Auth.logout();
        
        let path = `/`; 
        history.push(path);
        history.go(0);
    }
    const signFormOnClick = () =>{
        setIsSignForm(true)
    }
    useEffect(() => {
        console.log(lang);
        languageHandler(lang);
    }, [lang])

    useEffect(() => {
        (async () => {
            if(Auth.loggedIn()){
                 const user = await Auth.getProfile();
                 console.log(user);
                //  setUser(user.data);
                const userData = await getSingleUser(user._id, Auth.getToken())
                console.log(userData.data[0]);

                // To store user data in Redux state
                dispatch(setFirstName(userData.data[0].firstName));
                dispatch(setUsername(userData.data[0].username));
                dispatch(setPoints(userData.data[0].points));
                dispatch(setTotalNights(userData.data[0].totalNights));
            }
        })();
    }, [dispatch])

    return (
        <nav className="navbar navbar-expand navbar-dark blue">
        <div className="container">
            <div className="collapse navbar-collapse" id="navigation">
            <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                    <Link to="/" className="nav-link">{t('nav.1')}</Link>
                </li>
                <li className="nav-item">
                    <Link to="/hotels" className="nav-link">{t('nav.2')}</Link>
                </li>
                {Auth.loggedIn() ? (<>
                    <li className="nav-item">
                    <p className=" text-light m-2 ms-5">{t('nav.greet')}{userFirstName !== "" ? userFirstName : username}</p>
                        {/* <Link to="#" className="nav-link">Hello, {user.username? user.firstName !== "" ? user.firstName : user.username : "World"}</Link> */}
                    </li>
                    <li className="nav-item">
                        <Link to="/account" className="nav-link">{t('nav.acc')}</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="#" onClick={logout} className="nav-link">{t('nav.out')}</Link>
                    </li>
                </>) : (
                    <li className="nav-item">
                        <Link to="#" onClick={signFormOnClick} className="nav-link">{t('nav.3')}</Link>
                        {isSignForm ? <SignForm setIsSignForm={setIsSignForm} /> : <></>}
                    </li>
                ) }
                <li className="nav-item">
                    <select className="form-select text-light blue" value={lang} onChange={e => setLang(e.target.value)}>
                        <option value="">Lang</option>
                        <option value="en">en</option>
                        <option value="es">es</option>
                    </select>
                </li>
                
            </ul>
            </div>
        </div>
    </nav>
    )
}

export default Nav
