import React, { useState, useEffect } from 'react';

import { Spinner } from 'react-bootstrap';

import Auth from '../../../utils/auth';
import { getSingleUser, updateUser, updateCardInfo } from '../../../utils/user-API';

import { useDispatch } from 'react-redux'
import { setFirstName } from '../../../redux/slices/user/userSlice';


const Profile = () => {

    const [ user, setUser ] = useState(null);
    const [ currentYear, setCurrentYear ] = useState(["2021", "2022"]);
    const [ isUpdatingCardInfo, setIsUpdatingCardInfo ] = useState(false);

    // To store user data on Redux
    const dispatch = useDispatch();

    useEffect(() => {
      let startYear = new Date().getFullYear(); // Current Year.
      let years = [];
      for(let i = 0; i < 10; i++){
         years.push(startYear + i);
      }
      console.log(years)
      setCurrentYear(years)
    }, [])

    useEffect(() => {
        (async () => {
            try{
                const userData = await Auth.getProfile();
                const token = Auth.getToken();
                const user = await getSingleUser(userData.data.username, token);
                console.log(user);
                setUser(user.data[0])      
            }catch(err) {
                console.log(err);
            }
        })();
    }, [])



    const onChangeProfileForm = (event) => {
      let keyName = event.target.name;
      let inputValue = event.target.value;
      if(keyName === "street" || keyName === "city" || keyName === "zipcode" || keyName === "state"){
         setUser({...user, "address": {...user["address"], [keyName]: inputValue}})
      }else{
         setUser({...user, [keyName]: inputValue})
      }
    }

    const onChangeCreditCardForm = (event) => {
      let keyName = event.target.name;
      let inputValue = event.target.value;
      setUser({...user, "cardInfo": {...user["cardInfo"], [keyName]: inputValue}})
    }

    const onClickProfileUpdate = (event) => {
        event.preventDefault();

        const allInputEl = document.getElementsByClassName('profile-input');
        const profileUpdateBtnEl = document.getElementById('profile-update-btn');
        const profileUpdateSubmitEl = document.getElementById('profile-update-submit');
        const profileUpdateCancelEl = document.getElementById('profile-update-cancel');
        
        for(let i = 0; i < allInputEl.length; i++){
           if(allInputEl[i].name === "username" || allInputEl[i].name === "email"){
         
            }else{
              allInputEl[i].disabled = false;
           }
        }

        profileUpdateBtnEl.style.display = "none";
        profileUpdateSubmitEl.style.display = "block";
        profileUpdateCancelEl.style.display = "block";
    }

    const onClickProfileSumitBtn = async () => {
      console.log("submit btn")
      const allInputEl = document.getElementsByClassName('profile-input');
      let userInfo = {}
      let address = {}
      for(let i = 0; i < allInputEl.length; i++){
         if(allInputEl[i].name === "street" || allInputEl[i].name === "city" || allInputEl[i].name === "zipcode" || allInputEl[i].name === "state"){
            address[allInputEl[i].name] = allInputEl[i].value;
         }else{
            userInfo[allInputEl[i].name] = allInputEl[i].value;
         }
      }
      userInfo["address"] = address;
      console.log(userInfo);
      
      // Update userInfo
      try {
         let response = await updateUser(userInfo);
         console.log(response);

         // Store firstName in Redux state
         dispatch(setFirstName(userInfo.firstName));


         onClickProfileCancelBtn();
      }catch(error){
         console.log(error);
      }
    }

    const onClickProfileCancelBtn = () => {
      const allInputEl = document.getElementsByClassName('profile-input');
      const profileUpdateBtnEl = document.getElementById('profile-update-btn');
      const profileUpdateSubmitEl = document.getElementById('profile-update-submit');
      const profileUpdateCancelEl = document.getElementById('profile-update-cancel');

      for(let i = 0; i < allInputEl.length; i++){
         allInputEl[i].disabled = true;
     }

     profileUpdateBtnEl.style.display = "block";
     profileUpdateSubmitEl.style.display = "none";
     profileUpdateCancelEl.style.display = "none";

    }

    const onClickProfileCardUpdate = (event) => {
      event.preventDefault();

      setIsUpdatingCardInfo(true);

      const allCardInfoInputEl = document.getElementsByClassName('profile-cardInfo-input');
      const profileCardUpdateBtnEl = document.getElementById('profile-card-update-btn');
      const profileCardUpdateSubmitEl = document.getElementById('profile-card-update-submit');
      const profileCardUpdateCancelEl = document.getElementById('profile-card-update-cancel');
      
      for(let i = 0; i < allCardInfoInputEl.length; i++){
          allCardInfoInputEl[i].disabled = false;
      }

      profileCardUpdateBtnEl.style.display = "none";
      profileCardUpdateSubmitEl.style.display = "block";
      profileCardUpdateCancelEl.style.display = "block";
    }

    const onClickProfileCardSumitBtn = async (event) => {
      console.log("submit btn")
      const allCardInfoInputEl = document.getElementsByClassName('profile-cardInfo-input');
      const expireSelectMonthEl = document.getElementById('expire-select-month');
      const expireSelectYearEl = document.getElementById('expire-select-year');

      let expireDate = expireSelectMonthEl.value + "/" + expireSelectYearEl.value;
      let cardInfo = {}

      for(let i = 0; i < allCardInfoInputEl.length; i++){
         cardInfo[allCardInfoInputEl[i].name] = allCardInfoInputEl[i].value;
      }
      cardInfo["expDate"] = expireDate
      console.log(cardInfo);
      setUser({ ...user, "cardInfo" :cardInfo})
      // Update cardInfo
      try {
         let response = await updateCardInfo(cardInfo, user.username);
         console.log(response);
         onClickProfileCardCancelBtn();
         setIsUpdatingCardInfo(false);
      }catch(error){
         console.log(error);
      }

    }

    const onClickProfileCardCancelBtn = () => {
      setIsUpdatingCardInfo(false);

      const allCardInfoInputEl = document.getElementsByClassName('profile-cardInfo-input');
      const profileCardUpdateBtnEl = document.getElementById('profile-card-update-btn');
      const profileCardUpdateSubmitEl = document.getElementById('profile-card-update-submit');
      const profileCardUpdateCancelEl = document.getElementById('profile-card-update-cancel');
      
      for(let i = 0; i < allCardInfoInputEl.length; i++){
          allCardInfoInputEl[i].disabled = true;
      }

      profileCardUpdateBtnEl.style.display = "block";
      profileCardUpdateSubmitEl.style.display = "none";
      profileCardUpdateCancelEl.style.display = "none";
   }

    return(<>
        {user != null ? 
        <div className="profile-tab-body-flex">
        <div id="profile-tab-body-profile-left">
            <div>
               <label htmlFor="username">User name: </label>
               <input className="profile-input" type="text" name="username" value={user.username ?? ""} onChange={onChangeProfileForm} disabled />
            </div>
            <div>
               <label htmlFor="firstName">First Name: </label>
               <input className="profile-input" type="text" name="firstName" value={user.firstName ?? ""} onChange={onChangeProfileForm} disabled />
            </div>
            <div>
               <label htmlFor="lastName">Last Name: </label>
               <input className="profile-input" type="text" name="lastName" value={user.lastName ?? ""} onChange={onChangeProfileForm} disabled />
            </div>
            <div>
               <label htmlFor="street">Street: </label>
               <input className="profile-input" type="text" name="street" value={user.address ? user.address.street ?? "" : ""} onChange={onChangeProfileForm} disabled />
            </div>
            <div>
               <label htmlFor="city">City: </label>
               <input className="profile-input" type="text" name="city" value={user.address ? user.address.city ?? "" : ""} onChange={onChangeProfileForm} disabled />
            </div>
            <div>
               <label htmlFor="state">State: </label>
               <input className="profile-input" type="text" name="state" value={user.address ? user.address.state ?? "" : ""} onChange={onChangeProfileForm}  disabled />
            </div>
            <div>
               <label htmlFor="zipcode">Zip code: </label>
               <input className="profile-input" type="text" name="zipcode" value={user.address ? user.address.zipcode ?? "" : ""} onChange={onChangeProfileForm} disabled />
            </div>
            <div>
               <label htmlFor="email">Email: </label>
               <input className="profile-input" type="email" name="email" value={user.email ?? ""} onChange={onChangeProfileForm} disabled />
            </div>
            <div>
               <label htmlFor="phoneNumber">Phone: </label>
               <input className="profile-input" type="tel" name="phoneNumber" value={user.phoneNumber ?? ""} onChange={onChangeProfileForm} disabled />
            </div>
            <div>
                <button id="profile-update-btn" onClick={onClickProfileUpdate}>Update</button>
                <button id="profile-update-submit" onClick={onClickProfileSumitBtn} style={{"display": "none"}}>Submit</button>
                <button id="profile-update-cancel" onClick={onClickProfileCancelBtn} style={{"display": "none"}}>Cancel</button>
            </div>
        </div>
        <div id="profile-tab-body-profile-right">
           <div>
               <label htmlFor="creditCard">Credit Type: </label>
               <input className="profile-cardInfo-input" type="text" name="cardType" value={user.cardInfo ? user.cardInfo.cardType ?? "" : ""} onChange={onChangeCreditCardForm} disabled />
            </div>
            <div>
               <label htmlFor="cardNumber">Card Number: </label>
               <input className="profile-cardInfo-input" type="text" name="cardNumber" value={user.cardInfo ? user.cardInfo.cardNumber ?? "" : ""} onChange={onChangeCreditCardForm} disabled />
            </div>
            <div>
               <label htmlFor="cardNumber">Name on card: </label>
               <input className="profile-cardInfo-input" type="text" name="nameOnCard" value={user.cardInfo ? user.cardInfo.nameOnCard ?? "" : ""} onChange={onChangeCreditCardForm} disabled />
            </div>
            <div>
               <label htmlFor="expireDate">Expire: </label>
              {!isUpdatingCardInfo ? <input className="profile-cardInfo-input" type="text" name="expDate" value={user.cardInfo ? user.cardInfo.expDate ?? "" : ""} disabled />
               : <div className="expire-select">
                  {/* {yearGenerator()} */}
                  <select id="expire-select-month">
                      <option value="01">January</option>
                      <option value="02">February</option>
                      <option value="03">March</option>
                      <option value="04">April</option>
                      <option value="05">May</option>
                      <option value="06">June</option>
                      <option value="07">July</option>
                      <option value="08">August</option>
                      <option value="09">September</option>
                      <option value="10">October</option>
                      <option value="11">November</option>
                      <option value="12">December</option>
                  </select>
                  <select id="expire-select-year">
                     {currentYear ? currentYear.map(year => <option key={year} value={year}>{year}</option>) : "" }
                  </select>
               </div>}
            </div>
            <div>
               <label htmlFor="cvcNumber">CVC: </label>
               <input className="profile-cardInfo-input" type="text" name="cardCvc" value={user.cardInfo ? user.cardInfo.cardCvc ?? "" : ""} onChange={onChangeCreditCardForm} disabled />
            </div>
            <div>
                <button id="profile-card-update-btn" onClick={onClickProfileCardUpdate}>Update</button>
                <button id="profile-card-update-submit" onClick={onClickProfileCardSumitBtn} style={{"display": "none"}}>Submit</button>
                <button id="profile-card-update-cancel" onClick={onClickProfileCardCancelBtn} style={{"display": "none"}}>Cancel</button>
            </div>
        </div>
       </div>

       : <div className="profile-tab-body-flex justify-content-center">
            <Spinner animation="border" variant="success" />
        </div>}

    </>
    );
}

export default Profile;