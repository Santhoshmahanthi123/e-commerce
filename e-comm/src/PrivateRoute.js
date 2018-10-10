import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { loginClick } from './Reducers/Reducer';

const PrivateRoute = ({ component: Component, currentUser, path, ...rest }) =>
  <Route
      // exact
      // {...rest}
      path={path}
      render={props =>
        currentUser
          ?// console.log("resetting")
          <Component currentUser={currentUser} {...props}  {...rest} /> 
          : 
          <Redirect
            to={{
              pathname: '/Login',
              state: { from: props.location }
            }}
          /> 
      }
  />;

  const mapStateToProps= (state) =>{
    return {
   //   isLoginSuccess: state.isLoginSuccess,
      user: state.user,
      visibleModal: state.visibleModal      
    }
  }
  const dispatchToProps = (dispatch) =>{
    return {
      loginClick: () => dispatch(loginClick())
    }
}
  
  export default withRouter(
    connect(mapStateToProps,dispatchToProps)(PrivateRoute)
  );