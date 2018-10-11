import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import {signupFn} from './Reducers/SignupReducer';
// import './SignUp.css'

class SignUp extends Component {
  constructor(props){
    super(props);
    console.log("%%%%%%%%%%%%%%5", props)
    this.state ={};
    //this.state.nextPage= this.props.nextPage
  }
   check =() =>{
     //to check for password matching
    if (document.getElementById('password').value ===
      document.getElementById('confirm_password').value) {
      document.getElementById('message').style.color = 'green';
      document.getElementById('message').innerHTML = 'matching';
      document.getElementById('submitButton').style.disabled = 'false';     
      
    } else {
      document.getElementById('message').style.color = 'red';
      document.getElementById('message').innerHTML = 'not matching';
    }
  }
  
  handleClick=(e)=>{
    //e.preventDefault();
    console.log("Clicked SignUp button");
    
  }

  onSubmit = (e) =>{
    e.preventDefault();
    console.log("Clicked SignUp button");
    let {username, password}= this.state;   
    this.props.signupFn(username, password);
  }
  render() {
    //console.log(this.props.signup,"SIGNUP")
    let {username, password}= this.state;      
    let {isSignupPending,isSignupSuccess, SignupError} = this.props;  
    console.log("Signup Success is :", isSignupSuccess)
    if(isSignupSuccess){
      return(
         <Redirect to={{
                       pathname: '/Profile',
                   }} push  />
      )
  }

    return (
      <div id="id01" className="modal" style={{display: this.props.signup? "block": "none"}}>
      <form className="modal-content animate" onSubmit={this.onSubmit}>
        <div className="container">
          <h1>Sign Up</h1>
          <p>Please fill in this form to create an account.</p>
          <hr/>
          <label htmlFor="email"><b>Email</b></label>
          <input type="text" placeholder="Enter Email" name="email" required onChange={e => this.setState({username:e.target.value})}/>
    
          <label htmlFor="password"><b>Password</b></label>
          <input type="password" id="password" placeholder="Enter Password" name="password" required onKeyUp={this.check} onChange={e => this.setState({password:e.target.value})}/>
    
          <label htmlFor="psw-repeat"><b>Repeat Password</b></label>
          <input type="password" placeholder="Repeat Password" id="confirm_password" name="psw-repeat" required onKeyUp={this.check} onChange={e => this.setState({repPassword:e.target.value})}/>
          <span id='message'></span>
          <label>
            <input type="checkbox" name="remember"  style={{marginBottom:15}} onChange={this.props.handleChange} value={this.props.checkedValue}/> Remember me
          </label>
    
          <p>By creating an account you agree to our <a href="" style={{color:"dodgerblue"}}>Terms & Privacy</a>.</p>
    
          <div className="clearfix">
            <button type="button" onClick={this.props.handleSignUp} className="cancelbtn">Cancel</button>
            <button type="submit" id="submitButton" style={{disabled:'true'}}>Sign Up</button>
          </div>
              {isSignupPending && <div>Please wait..</div>
                  // jquery.getElementById()
              }
              {isSignupSuccess && <div>Welcome</div>}
              {SignupError && <div>{SignupError.message}</div>}
        </div>
      </form>
    </div>
    
    );
  }
}

const mapStateToProps = (state) =>{

  return {
      isSignupPending: state.signupFn.isSignupPending,
      isSignupSuccess: state.signupFn.isSignupSuccess,
      SignupError: state.signupFn.SignupError,
  };
}

const dispatchToProps = (dispatch) =>{
  return {
      signupFn: (username, password) => dispatch (signupFn(username, password)),
      //cancelAction: () => dispatch(cancelAction())
  }
}
export default withRouter(
  connect(mapStateToProps, dispatchToProps)(SignUp)
);
