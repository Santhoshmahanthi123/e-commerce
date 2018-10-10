import Promise from 'es6-promise';
import file from '../file.json';
import { combineReducers } from 'redux'
import signupReducer from './SignupReducer'
const LOGIN_PENDING = 'LOGIN_PENDING';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_ERROR = 'LOGIN_ERROR';
const BUTTON_CANCEL = 'BUTTON_CANCEL';
const LOGINBUTTON_CLICK = 'LOGINBUTTON_CLICK'


//actions
function setLoginPending(isLoginPending){
    return {
        type: LOGIN_PENDING,
        isLoginPending
    }
}

function setLoginSuccess(isLoginSuccess,userData){
    return {
        type: LOGIN_SUCCESS,
        isLoginSuccess,
        payload: userData
    }
}

function setLoginError(loginError){
    return {
        type: LOGIN_ERROR,
        loginError
    }
}

function setCancelButton(){
    return {
        type: BUTTON_CANCEL
    }
}

function setLoginClick(){
    return{
        type: LOGINBUTTON_CLICK
    }
}

export function cancelAction(){
    return dispatch => {
        dispatch(setCancelButton());
    }
}

export function loginClick(){
    return dispatch => {
        dispatch(setLoginClick());
    }
}

export function login(username, password){
    return dispatch => {
        dispatch(setLoginPending(true));
        dispatch(setLoginSuccess(false, null));
        dispatch(setLoginError(null));

        sendLoginRequest(username,password)
        .then(userData =>{
            dispatch(setLoginPending(false));
            dispatch(setLoginSuccess(true, userData));

        })
        .catch( err =>{
            dispatch(setLoginPending(false));
            dispatch(setLoginError(err));
        })
    };
}


// reducer function
export function reducer(state={
    isLoginPending: false,
    isLoginSuccess: false,
    loginError: null,
    visibleModal: true
}, action){

    switch(action.type){
        case LOGIN_PENDING:
            return {
                ...state,
                isLoginPending: action.isLoginPending,
                visibleModal: true
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoginSuccess: action.isLoginSuccess,
                user: action.payload,
                visibleModal: false
            };
        case LOGIN_ERROR:
            return{
                ...state,
                loginError: action.loginError,
                visibleModal: true
            };
        case BUTTON_CANCEL:
        return{
            ...state,
            visibleModal: false
        };
        case LOGINBUTTON_CLICK:
        return{
            ...state,
            visibleModal: true
        };
        default:
            return state;
    }
}


function sendLoginRequest(username, password){
    //var result={}
    //console.log("##################", file)
    // old method of fetching data from json file
    // fetch(file)
    // .then((response) => {
    //     console.log(response)
    //     return response.json()
        
    // })
    // .then((findresponse) =>{
    //     result= findresponse
    //     console.log("loginrequest fxn ", result)
    //  })
    //  .catch((err) =>{
    //         console.log(err)
    //       });

    return new Promise ((resolve, reject) => {
        var flag= false
        console.log(file.contacts)
        file.contacts.forEach((user) => {
            console.log(user.email+"*********************")
            console.log(username+"&&&&&&&&&&&&&&&&&&")
            if(username ===user.email){
                //try to use indexOf
                if(password === user.password){
                    console.log(user)
                    return resolve(user)
                }
                else{
                    return reject(new Error("Invalid password"))
                }
            }
            else{// check with flags
               flag= true
            }
           
        })
        if(flag){
            console.log("In Reducer value is "+flag)
            return reject(new Error("Invalid username"))
        }
       
    })
}

export default combineReducers({
    reducer,
    signupReducer
  })