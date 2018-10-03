import React, { Component } from 'react';
import './Login.css';
import Logo from './Logo.js'


class Login extends Component {
    // constructor(props){
    //     super(props);
    // }
    render() {
     
    return (
        <div id="id01" className="modal" style={{display: this.props.clicked? "block": "none"}}>
            <form className="modalContent animate" action="">
                {/* <div className="imgContainer"> */}
                   <Logo/> 
                {/* </div>  */}
             
                <div className="container">
                    <label htmlFor="uname"><b>Username</b></label>
                    <input type="text" placeholder="Enter Username" name="uname" required></input>
            
                    <label htmlFor="psw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="psw" required></input>
                    
                    <button type="submit">Login</button>
                    <label>
                    <input type="checkbox" name="remember" onChange={this.props.handleChange} value={this.props.checkedValue}/>Remember Me
                    </label>
                </div>
            
                <div className="container" style={{backgroundColor: "#f1f1f1"}}>
                    <button type="button" onClick={this.props.handleClick} className="cancelbtn">Cancel</button>
                    <span className="psw"><a href=""> Forgot password?</a></span>
                </div>
            </form>
        </div>
    );
    }
    }
export default Login;    