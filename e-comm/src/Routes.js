import React from 'react';
// import ReactDOM from 'react-dom';
import { Route, Switch, withRouter   } from 'react-router-dom';
import Login from './Login';
// import App from './App';
import Food from './Food';
// import Home from './Home';
import Profile from './Profile';
import ImageSlider from './ImageSlider';
import About from './About';
import Clothing from './Clothing';
import Footwear from './Footwear';
import PrivateRoute from './PrivateRoute'
import PrivateLoginRoute from './PrivateLoginRoute'
import { connect } from 'react-redux'
// import { Link, Redirect } from 'react-router-dom';  

class Routes extends React.Component{
  constructor(props){
    super(props)
    this.state={
      buttonClick :false,
      // clicked: this.props.clicked
    }
    
  }
  onButtonClick = (e) =>{
    this.setState({
      buttonClick: true
    })
    console.log("Buy Now Clicked")
  }
   render(){
    //  if  (!this.props.isLoginSuccess) {
    
    //     if(!this.state.clicked)
    //    return (<Route path="*" component= { ImageSlider }></Route>)
    //  }
      
      console.log(this.props.visibleModal, 'In ROutes')
       return(
       <Switch>
          <Route  exact path="/" component= { ImageSlider } />
          <PrivateLoginRoute path = "/Login" component={Login} currentUser={this.props.user}/>
            {/* <PrivateRoute exact path = "/" component = { Profile } />    */}
            {/* use render function for redirecting to authenticated */}
            <PrivateRoute path = "/Profile" component = {Profile} currentUser={this.props.user}/> 
            {/* <Route path = "/ImageSlider" component = {ImageSlider} />  */}
            <PrivateRoute path = "/Food" component = {Food} currentUser={this.props.user}/>
            <PrivateRoute path = "/Clothing" component = {Clothing} currentUser={this.props.user} />              
            <PrivateRoute path = "/Footwear" component = {Footwear} currentUser={this.props.user} />  
            <PrivateRoute path = "/About" component = {About} currentUser={this.props.user} />
            {/* <PrivateRoute path = "/Clothing" render = {() => {<Clothing onClick={this.onButtonClick} buttonClick={this.buttonClick}/>}} />    */}

        </Switch>
       )}
}
const mapStateToProps= (state) =>{
  return {
    isLoginSuccess: state.reducer.isLoginSuccess,
    user: state.reducer.user,
    visibleModal: state.reducer.visibleModal
  }
}

// create one global function and use it for each component
// try to pass buttonOnclick function with props thru app.js and send the info to links just as done in redirect
// export default connect(mapStateToProps)(Routes);
// export default Routes;
export default withRouter(
  connect(mapStateToProps)(Routes)
);
//connect to store

