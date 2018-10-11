import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { loginClick } from './Reducers/Reducer';

const PrivateRoute = ({ component: Component, currentUser, path, ...rest, loginClick }) =>
  <Route
      // exact
      // {...rest}
      path={path}
      render={props =>
        {
          if(currentUser){

            return <Component currentUser={currentUser} {...props}  {...rest} /> 
          }
          else{
              loginClick();
              return <Redirect
                to={{
                  pathname: '/Login',
                  state: { from: props.location }
                }}
                /> 
            } 
        }
      }
    />;
  

  const mapStateToProps= (state) =>{
    return {
   //   isLoginSuccess: state.isLoginSuccess,
      user: state.reducer.user,
      visibleModal: state.reducer.visibleModal      
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