import React, { useState, useEffect } from 'react';

import { validateEmail, validatePassword } from '../../../utils/helpers';
import { createUser } from "../../../utils/user-API";
import Auth from '../../../utils/auth';


const SignUp = ( {closeModal} ) => { 
    const [userFormData, setUserFormData] = useState({'username': '', 'password': '', 'confirmpassword':'', 'email': ''}); 
    const [ usernameNotice, setUsernameNotice] = useState('none');
    const [ passwordNotice, setPasswordNotice] = useState({'display': 'none', 'char8': 'red', 'specialChar': 'red', 'number': 'red', 'letter': 'red'});
    const [ emailNotice, setEmailNotice] = useState('none');
    const [ confirmPWNotice, setConfirmPWNotice] = useState('none');

    // Handle Register Button
    useEffect(() =>{
        const registerbtnEl = document.getElementById("register-btn");

        if(userFormData.username !== ''
        && userFormData.password !== ''
        && userFormData.confirmpassword !== ''
        && userFormData.email !== ''
        && usernameNotice === 'none' 
        && emailNotice === 'none'
        && passwordNotice.display === 'none'
        && confirmPWNotice === 'none'){
            registerbtnEl.disabled = false;
        }else{
            registerbtnEl.disabled = true;
        }
    }, [userFormData, usernameNotice, passwordNotice, emailNotice, confirmPWNotice])

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
        setPasswordNotice({...validatePassword(userFormData.password)})
    };

    // Validate SignUp information - Username, email type, password
    const focusOutUserName = () => {
        if(userFormData.username === ""){
            setUsernameNotice('block');
        }else{
            setUsernameNotice('none');
        }
    }
    const focusOutEmail = () =>{
        if(!validateEmail(userFormData.email)){
            setEmailNotice('block');
        }else{
            setEmailNotice('none');
        }
    }
    const focusOutPassword= () =>{
        setPasswordNotice({...validatePassword(userFormData.password)})
    }

    const focusOutConfirmPW = () => {
        // console.log(userFormData.password)
        // console.log(userFormData.confirmpassword)
        if(userFormData.password !== "" && userFormData.password === userFormData.confirmpassword){
            setConfirmPWNotice('none');
        }else{
            setConfirmPWNotice('block');
        }
    }
    
    const signUpSubmit = async (event) =>{
        event.preventDefault();

        console.log(userFormData)
        try {
            const response = await createUser(userFormData);
            console.log(response)
      
            const { token, user } = response.data;
            console.log(token)
            console.log(user);
            
            // console.log(user);
            Auth.login(token);

            closeModal();
        }
        catch(err) {
            console.error(err);
        }
    }
    return(
        <div id="signUp">
            <h3 id="title-signUp">New to Spinka</h3>
            <form onSubmit={signUpSubmit}> 
                <label className="custom-margin-signIn-register">User name:</label>
                <input name="username" type="text" onChange={handleInputChange} onBlur={focusOutUserName} />
                <div id="caution-username" style={{ "display": usernameNotice }}>
                    <span style={{ "color": "red" }}>User name required</span>
                </div>
                <label className="custom-margin-signIn-register">Email Address:</label>
                <input name="email" type="text" id="signUp-email" onChange={handleInputChange} onBlur={focusOutEmail} />
                <div id="caution-email-validation" style={{ "display": emailNotice }}>
                    <span style={{ "color": "red", "marginBottom": "3px" }}>The email you entered is invalid.</span>
                    <span style={{ "color": "red" }}>Please check your email and try again.</span>
                </div>
                <label className="custom-margin-signIn-register">Password:</label>
                <input name="password" type="password" id="signUp-password" onChange={handleInputChange} onBlur={focusOutPassword}/>
                <div id="caution-password" style={{'display': passwordNotice.display}}>
                    <span style={{'color': passwordNotice.char8}}>* 8 characters minimum</span>
                    <span style={{'color': passwordNotice.specialChar}}>* At least one special character</span>
                    <span style={{'color': passwordNotice.number}}>* At least one number</span>
                    <span style={{'color': passwordNotice.letter}}>* At least one lowercase letter</span>
                </div>
                <label className="custom-margin-signIn-register">Confirm Password:</label>
                <input name="confirmpassword" type="password" id="confirm-password" onChange={handleInputChange} onBlur={focusOutConfirmPW} />
                <div id="caution-confirm-password" style={{"display": confirmPWNotice}}>
                    <span style={{ "color": "red" }}>Your passwords do not match, please try again.</span>
                </div>
                <button type="submit" className="custom-margin-signIn-register submit" id="register-btn" disabled >REGISTER</button>
            </form>
        </div>
    )
}

export default SignUp;