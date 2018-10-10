import Promise from 'es6-promise';
const SIGNUP_SUCCESS ='SIGNUP_SUCCESS'
const SIGNUP_PENDING = 'SIGNUP_PENDING'
const SIGNUP_ERROR = 'SIGNUP_ERROR';

function setSignupPending(isSignupPending){
    return {
        type: SIGNUP_PENDING,
        isSignupPending
    }
}

function setSignupSuccess(isSignupSuccess,userData){
    return {
        type: SIGNUP_SUCCESS,
        isSignupSuccess,
        payload: userData
    }
}

function SignupError(SignupError){
    return {
        type: SIGNUP_ERROR,
        SignupError
    }
}

export {setSignupSuccess, setSignupPending, SignupError}