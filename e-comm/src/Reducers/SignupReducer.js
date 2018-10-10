import Promise from 'es6-promise';
import file from '../file.json';
import axios from 'axios'
import {setSignupSuccess, setSignupPending, SignupError} from '../Actions/SignupActions'
const LOGIN_PENDING = 'LOGIN_PENDING';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_ERROR = 'LOGIN_ERROR';
const BUTTON_CANCEL = 'BUTTON_CANCEL';
const LOGINBUTTON_CLICK = 'LOGINBUTTON_CLICK'
const SIGNUP_SUCCESS ='SIGNUP_SUCCESS'
const SIGNUP_PENDING = 'SIGNUP_PENDING'
const SIGNUP_ERROR = 'SIGNUP_ERROR';


//signup reducer
export function signupReducer(state={
    isSignupPending: false,
    isSignupSuccess: false,
    SignupError: null,
   // visibleModal: true
}, action){

    switch(action.type){
        case SIGNUP_PENDING:
            return {
                ...state,
                isSignupPending: action.isSignupPending,
                visibleModal: true
            };
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isSignupSuccess: action.isSignupSuccess,
                user: action.payload,
                visibleModal: false
            };
        case SIGNUP_ERROR:
            return{
                ...state,
                SignupError: action.SignupError,
                SignupError: true
            };
        case BUTTON_CANCEL:
        return{
            ...state,
           // visibleModal: false
        };
       
        default:
            return state;
    }
}

export function signup(user){
    return dispatch => {
        dispatch(setSignupPending(true));
        dispatch(setSignupSuccess(false, null));
        dispatch(SignupError(null));

        sendSignupRequest(user)
        .then(userData =>{
            dispatch(setSignupPending(false));
            dispatch(setSignupSuccess(true, userData));

        })
        .catch( err =>{
            dispatch(setSignupPending(false));
            dispatch(setSignupSuccess(err));
        })
    };
}

function sendSignupRequest(user){
    return true
    // create a post request
    axios.post(`DB URL`, { user })
    .then(res => {
      console.log(res);
      console.log(res.data);
    })
    .catch((error)=>{
      console.log(error);
        });
}

export default signupReducer;