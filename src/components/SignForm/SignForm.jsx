import React, { useEffect } from 'react';

import SignUp from './SignUp/SignUp';
import SignIn from './SignIn/SignIn';

import './style.css';

const SignForm = ({setIsSignForm}) => { 


    useEffect(() => {
        document.getElementById("backdrop").style.display = "block";
        const signFormModal = document.getElementById("signForm-modal");
        signFormModal.style.display = "block"
        signFormModal.classList.add("show")
    }, [])


    function closeModal() {
        document.getElementById("backdrop").style.display = "none"
        document.getElementById("signForm-modal").style.display = "none"
        document.getElementById("signForm-modal").classList.remove("show")

        setIsSignForm(false);
    }

    return(<>
    <div>

    <section className="signForm modal fade" id="signForm-modal" tabIndex="-1">
        <div className="signForm-header">
            <button type="button" className="close btn signForm-header-close" aria-label="Close" onClick={closeModal}>
                <span aria-hidden="true">×</span>
            </button>
        </div>
        <div className="signForm-body">
            <div className="signIn-register">
                <div className="signIn-register-left">
                    <SignIn closeModal={closeModal} />
                </div>
                <div className="signIn-register-center">
                    {/* Center Vertical Divider */}
                </div>
                <div className="signIn-register-right">
                    <SignUp closeModal={closeModal} />
                </div>
            </div>
        </div>
    </section>
    <div className="modal-backdrop fade show" id="backdrop" style={{"display":"none"}}></div>
    </div>
</>)}

export default SignForm;