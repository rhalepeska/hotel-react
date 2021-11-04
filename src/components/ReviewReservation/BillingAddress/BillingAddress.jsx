import { updateBillingAddress } from '../../../utils/user-API';


const BillingAddress = ( {user, setUser, setUpdateInfo} ) => {


    const onChangereservationBillingAddressForm = (event) => {
        let keyName = event.target.name;
        let inputValue = event.target.value;
        if(keyName === "street" || keyName === "city" || keyName === "zipcode" || keyName === "state"){
           setUser({...user, "billingAddress": {...user["billingAddress"], [keyName]: inputValue}})
        }else{
           setUser({...user, [keyName]: inputValue})
        }
      }

    const onClickreservationBillingAddressUpdate = (event) => {
        event.preventDefault();

        const allInputEl = document.getElementsByClassName('reservationBillingAddress-input');
        const reservationBillingAddressUpdateBtnEl = document.getElementById('reservationBillingAddress-update-btn');
        const reservationBillingAddressUpdateSubmitEl = document.getElementById('reservationBillingAddress-update-submit');
        const reservationBillingAddressUpdateCancelEl = document.getElementById('reservationBillingAddress-update-cancel');
        
        for(let i = 0; i < allInputEl.length; i++){
            allInputEl[i].disabled = false;
        }

        reservationBillingAddressUpdateBtnEl.style.display = "none";
        reservationBillingAddressUpdateSubmitEl.style.display = "block";
        reservationBillingAddressUpdateCancelEl.style.display = "block";
    }

    const onClickreservationBillingAddressSumitBtn = async () => {
      console.log("submit btn")
      const allInputEl = document.getElementsByClassName('reservationBillingAddress-input');
      let billingAddress = {}
      for(let i = 0; i < allInputEl.length; i++){
          billingAddress[allInputEl[i].name] = allInputEl[i].value;
      }

      console.log(billingAddress);
      
      // Update billingAddress
      try {
         let response = await updateBillingAddress(billingAddress, user._id);
         console.log(response);
         setUpdateInfo("Update billing Address");
         onClickreservationBillingAddressCancelBtn();
      }catch(error){
         console.log(error);
      }
    }

    const onClickreservationBillingAddressCancelBtn = () => {
      const allInputEl = document.getElementsByClassName('reservationBillingAddress-input');
      const reservationBillingAddressUpdateBtnEl = document.getElementById('reservationBillingAddress-update-btn');
      const reservationBillingAddressUpdateSubmitEl = document.getElementById('reservationBillingAddress-update-submit');
      const reservationBillingAddressUpdateCancelEl = document.getElementById('reservationBillingAddress-update-cancel');

      for(let i = 0; i < allInputEl.length; i++){
         allInputEl[i].disabled = true;
     }

     reservationBillingAddressUpdateBtnEl.style.display = "block";
     reservationBillingAddressUpdateSubmitEl.style.display = "none";
     reservationBillingAddressUpdateCancelEl.style.display = "none";

    }


    return(<>
        <div className="reviewReseravation-cardInfo" id="reservationBillingAddress-tab-body-reservationBillingAddress-left">
            <div>
               <label htmlFor="firstName">First Name: </label>
               <input className="reservationBillingAddress-input" type="text" name="firstName" value={user.billingAddress ? user.billingAddress.firstName : user.firstName } onChange={onChangereservationBillingAddressForm} disabled />
            </div>
            <div>
               <label htmlFor="lastName">Last Name: </label>
               <input className="reservationBillingAddress-input" type="text" name="lastName" value={user.billingAddress ? user.billingAddress.lastName : user.lastName } onChange={onChangereservationBillingAddressForm} disabled />
            </div>
            <div>
               <label htmlFor="street">Street: </label>
               <input className="reservationBillingAddress-input" type="text" name="street" value={user.billingAddress ? user.billingAddress.street ?? "" : ""} onChange={onChangereservationBillingAddressForm} disabled />
            </div>
            <div>
               <label htmlFor="city">City: </label>
               <input className="reservationBillingAddress-input" type="text" name="city" value={user.billingAddress ? user.billingAddress.city ?? "" : ""} onChange={onChangereservationBillingAddressForm} disabled />
            </div>
            <div>
               <label htmlFor="state">State: </label>
               <input className="reservationBillingAddress-input" type="text" name="state" value={user.billingAddress ? user.billingAddress.state ?? "" : ""} onChange={onChangereservationBillingAddressForm}  disabled />
            </div>
            <div>
               <label htmlFor="zipcode">Zip code: </label>
               <input className="reservationBillingAddress-input" type="text" name="zipcode" value={user.billingAddress ? user.billingAddress.zipcode ?? "" : ""} onChange={onChangereservationBillingAddressForm} disabled />
            </div>
            <div>
                <button id="reservationBillingAddress-update-btn" onClick={onClickreservationBillingAddressUpdate}>Update</button>
                <button id="reservationBillingAddress-update-submit" onClick={onClickreservationBillingAddressSumitBtn} style={{"display": "none"}}>Submit</button>
                <button id="reservationBillingAddress-update-cancel" onClick={onClickreservationBillingAddressCancelBtn} style={{"display": "none"}}>Cancel</button>
            </div>
        </div>
    </>)
}

export default BillingAddress;
