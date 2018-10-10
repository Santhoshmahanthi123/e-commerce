import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { loginClick } from './Reducers/Reducer';

const PrivateLoginRoute = ({ component: Component, currentUser, path, ...rest }) =>
  <Route
    // exact
    // {...rest}
    path={path}
    render={props =>
      currentUser
        ? 
        <Redirect
        to={{
          pathname: '/Profile',
          state: { from: props.location }
        }}
        /> :
        <Component currentUser={currentUser} {...props} {...rest} />        
      }
  />;

  const mapStateToProps= (state) =>{
    return {
      //isLoginSuccess: state.isLoginSuccess,
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
    connect(mapStateToProps, dispatchToProps)(PrivateLoginRoute)
  );
