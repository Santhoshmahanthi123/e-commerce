import React from 'react';
// import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './Login';
// import App from './App';
import Food from './Food';
import Home from './Home';
import Profile from './Profile';
import ImageSlider from './ImageSlider';

class Routes extends React.Component{
   render(){
       return(
        <BrowserRouter>
       <div>
          <Route path = "/Login" component = {Login} />  
          <Route exact path = "/Home" component = {Home} />   
          <Route path = "/Profile" component = {Profile} /> 
          <Route path = "/ImageSlider" component = {ImageSlider} /> 
          <Route path = "/Food" component = {Food} />   
        </div>
    </BrowserRouter>
       )}
}

export default Routes;
