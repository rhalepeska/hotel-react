import React, { useState, useEffect } from 'react';

import { updateCardInfo } from '../../../utils/user-API';

import { Spinner } from 'react-bootstrap';

const CardInfo = ( {user, setUser, setUpdateInfo} ) => {

    // const [ user, setUser ] = useState(null);
    const [ currentYear, setCurrentYear ] = useState(["2021", "2022"]);
    const [ isUpdatingCardInfo, setIsUpdatingCardInfo ] = useState(false);

    useEffect(() => {
        let startYear = new Date().getFullYear(); // Current Year.
        let years = [];
        for(let i = 0; i < 10; i++){
           years.push(startYear + i);
        }
        console.log(years)
        setCurrentYear(years)
      }, [])

    const onChangeCreditCardForm = (event) => {
        let keyName = event.target.name;
        let inputValue = event.target.value;
        setUser({...user, "cardInfo": {...user["cardInfo"], [keyName]: inputValue}})
      }

      const onClickCardUpdate = (event) => {
        event.preventDefault();
  
        setIsUpdatingCardInfo(true);
  
        const allCardInfoInputEl = document.getElementsByClassName('reviewReseravation-cardInfo-input');
        const reviewReseravationCardUpdateBtnEl = document.getElementById('reviewReseravation-card-update-btn');
        const reviewReseravationCardUpdateSubmitEl = document.getElementById('reviewReseravation-card-update-submit');
        const reviewReseravationCardUpdateCancelEl = document.getElementById('reviewReseravation-card-update-cancel');
        
        for(let i = 0; i < allCardInfoInputEl.length; i++){
            allCardInfoInputEl[i].disabled = false;
        }
  
        reviewReseravationCardUpdateBtnEl.style.display = "none";
        reviewReseravationCardUpdateSubmitEl.style.display = "block";
        reviewReseravationCardUpdateCancelEl.style.display = "block";
      }
  
      const onClickCardSumitBtn = async (event) => {
        console.log("submit btn")
        const allCardInfoInputEl = document.getElementsByClassName('reviewReseravation-cardInfo-input');
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
           onClickCardCancelBtn();

           setUpdateInfo("Update Card info Address");
           setIsUpdatingCardInfo(false);
        }catch(error){
           console.log(error);
        }
  
      }
  
      const onClickCardCancelBtn = () => {
        setIsUpdatingCardInfo(false);
  
        const allCardInfoInputEl = document.getElementsByClassName('reviewReseravation-cardInfo-input');
        const reviewReseravationCardUpdateBtnEl = document.getElementById('reviewReseravation-card-update-btn');
        const reviewReseravationCardUpdateSubmitEl = document.getElementById('reviewReseravation-card-update-submit');
        const reviewReseravationCardUpdateCancelEl = document.getElementById('reviewReseravation-card-update-cancel');
        
        for(let i = 0; i < allCardInfoInputEl.length; i++){
            allCardInfoInputEl[i].disabled = true;
        }
  
        reviewReseravationCardUpdateBtnEl.style.display = "block";
        reviewReseravationCardUpdateSubmitEl.style.display = "none";
        reviewReseravationCardUpdateCancelEl.style.display = "none";
     }

    return(<>
    {
        user ? <div className="reviewReseravation-cardInfo">
           <div>
               <label htmlFor="creditCard">Credit Type: </label>
               <input className="reviewReseravation-cardInfo-input" type="text" name="cardType" value={user.cardInfo ? user.cardInfo.cardType ?? "" : ""} onChange={onChangeCreditCardForm} disabled />
            </div>
            <div>
               <label htmlFor="cardNumber">Card Number: </label>
               <input className="reviewReseravation-cardInfo-input" type="text" name="cardNumber" value={user.cardInfo ? user.cardInfo.cardNumber ?? "" : ""} onChange={onChangeCreditCardForm} disabled />
            </div>
            <div>
               <label htmlFor="cardNumber">Name on card: </label>
               <input className="reviewReseravation-cardInfo-input" type="text" name="nameOnCard" value={user.cardInfo ? user.cardInfo.nameOnCard ?? "" : ""} onChange={onChangeCreditCardForm} disabled />
            </div>
            <div>
               <label htmlFor="expireDate">Expire: </label>
              {!isUpdatingCardInfo ? <input className="reviewReseravation-cardInfo-input" type="text" name="expDate" value={user.cardInfo ? user.cardInfo.expDate ?? "" : ""} disabled />
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
               <input className="reviewReseravation-cardInfo-input" type="text" name="cardCvc" value={user.cardInfo ? user.cardInfo.cardCvc ?? "" : ""} onChange={onChangeCreditCardForm} disabled />
            </div>
            <div>
                <button id="reviewReseravation-card-update-btn" onClick={onClickCardUpdate}>Update</button>
                <button id="reviewReseravation-card-update-submit" onClick={onClickCardSumitBtn} style={{"display": "none"}}>Submit</button>
                <button id="reviewReseravation-card-update-cancel" onClick={onClickCardCancelBtn} style={{"display": "none"}}>Cancel</button>
            </div>
        </div>
            : <div className="reviewReseravation-flex flex-center">
                <Spinner animation="border" variant="success" /> 
                </div>
    }
    </>)
}

export default CardInfo;