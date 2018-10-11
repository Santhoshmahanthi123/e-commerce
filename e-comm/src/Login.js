import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom'
import './Login.css';
import SignUp from './SignUp';
import Logo from './Logo.js'
import { connect } from 'react-redux'
import { login, cancelAction } from './Reducers/Reducer';

class Login extends Component {
    constructor(props){
        super(props);
        console.log("%%%%%%%%%%%%%%5", props)
        this.state ={};
        this.state.nextPage= this.props.nextPage
    }
    // handleLoginClick = (e) =>{
    //     // code for redirection
    //     console.log(this.state.nextPage)
    //     this.setState({
    //         nextPage: true
    //     })
    //     console.log(this.state.nextPage)
       
    // }
    // componentDidMount(){
     
    //     const { user }= this.props;
    //   //  console.log(user+"  Local user")
    //     localStorage.setItem('somedata',"JSON.stringify(user)")   
    //    // localStorage.setItem("userData", JSON.stringify(user));
    //    // console.log(localStorage.getItem("userData"))
    
    //   }
      handleClick =(e)=>{
        e.preventDefault();
        console.log("Cancel button called");
        this.props.history.push('/');
            this.props.cancelAction();

      }
    onSubmit =(e) =>{
        e.preventDefault();
       // this.props.handleClick;
    //    console.log(e)
        let {username, password}= this.state;   
        this.props.login(username, password);
        //check for isLoginSuccess
     //   console.log("%%%%%%%%%%%%%%%%%", this.props.name)
       // console.log("IS login success is: "+ this.props.isLoginSuccess)
       
    }
    render() { 
      //  let privateVAlue=this.props.location.state?this.props.location.state.visibleModal: false
     //   console.log(this.props.location.state, "***&&&&&&&&&&&&&&1111")
        console.log(this.props.visibleModal, "***&&&&&&&&&&&&&&222")

        let {username, password}= this.state;
        let {isLoginPending, isLoginSuccess, loginError, user} = this.props;  
       // console.log(user+"  Local user")
         if(this.props.nextPage){
             return(
                <Redirect to={{
                              pathname: '/Profile',
                              state: user 
                          }} push  />
             )
         }
    return (
        <div id="id01" className="modal" style={{display: this.props.visibleModal ? "block": "none"}}>
         
        {/* <SignUp handleClick={this.props.handleClick} handleSignUp={this.props.handleSignUp}  {...this.props}/>  */}
            <form className="modalContent animate" onSubmit={this.onSubmit} >
                {/* <div className="imgContainer"> */}
                   <Logo/> 
                {/* </div>  */}
             
                <div className="container">
                    <label htmlFor="username"><b>Username</b></label>
                    <input type="text" placeholder="Enter Username" name="username" required onChange={e => this.setState({username:e.target.value})}></input>
            
                    <label htmlFor="password"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="password" required onChange={e => this.setState({password:e.target.value})}></input>
                    
                    <button type="submit" >Login</button>
                    <label>
                    <input type="checkbox" name="remember" onChange={this.props.handleChange} value={this.props.checkedValue}/>Remember Me
                    </label>
                </div>
            
                <div className="container" style={{backgroundColor: "#f1f1f1"}}>
                    <button type="button" onClick={this.handleClick} className="cancelbtn">Cancel</button>
                    <span className="psw"><a onClick={this.props.handleSignUp}>Sign Up?</a></span>
                </div>
                {isLoginPending && <div>Please wait..</div>
                    // jquery.getElementById()
                }
                {isLoginSuccess && <div>Welcome Back !!</div>}
                {loginError && <div>{loginError.message}</div>}
            </form>
        </div>
    );
    }
}

const mapStateToProps = (state) =>{

    return {
        isLoginPending: state.reducer.isLoginPending,
        isLoginSuccess: state.reducer.isLoginSuccess,
        loginError: state.reducer.loginError,
        user: state.reducer.user,
        visibleModal: state.reducer.visibleModal,
    };
}

const dispatchToProps = (dispatch) =>{
    return {
        login: (username, password) => dispatch (login(username, password)),
        cancelAction: () => dispatch(cancelAction())
    }
}
export default withRouter(
    connect(mapStateToProps, dispatchToProps)(Login)
  );