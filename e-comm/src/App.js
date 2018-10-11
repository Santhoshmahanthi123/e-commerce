import React, { Component } from 'react';
import './App.css';
import { Link, withRouter } from 'react-router-dom';  
import Login from './Login';
import SignUp from './SignUp';
// import Home from './Home';
import { Layout, Menu, Icon } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import Routes from './Routes';
import { connect } from 'react-redux'
import { loginClick } from './Reducers/Reducer';


const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class App extends Component {
  constructor(){
    super();
    this.state={
      collapsed: false,
      clicked: false,
      signup: false,
      checkedValue:false,
      myData: [],
      fields:{},
      errors:{},
      nextPage:false
    }
  }
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }
  
  handleClick=()=>{
    console.log("Handle clicked called ^^^^^^^^^^^^^^^^^")
    this.props.loginClick();
    this.setState({
      clicked:this.props.visibleModal
    });
    
  }
  handleChange = (e)=> {
    // let fields = this.state.fields;
    // fields[e.target.name] = e.target.value;
    this.setState({
      checkedValue: this.state.checkedVal,
      //fields
    });

  }
handleSignUp=(e)=>{
  this.setState({
    signup:!this.state.signup
  });
}
  // componentWillMount(){
  //  if(!localStorage.getItem("userData")===null){
  //    console.log("Ok")
  //  }
   
  //  else{
  //    fetch('./file.json')
  //    .then((response) => {
  //     console.log(response)
  //     //set local storage again?
  //    })
  // }
  // console.log(localStorage.getItem("userData").value)
  //}
 
  // try to call componentdidmount so as to make a call to local storage or try to use JWT tokens
  // try to check if data is there in local storage. if not then make a db call
  
  
  render() {
   // console.log(this.props.visibleModal, "MODAL")
   return ( this.props.isLoginSuccess? 
    
     
      <div className="App">
      {/* <h1 onClick={this.setState({ nextPage: true  })}>LOGIN SUCCESS</h1> */}
        <Login  name="Login" {...this.state}/>
        <SignUp handleClick={this.handleClick} handleSignUp={this.handleSignUp}  {...this.state}/> 

        {/* Navigation bar */}
         <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <Icon type="pie-chart" />
              <span><Link to='/'>E-Comm</Link></span>
              {/* try using force update */}
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={<span><Icon type="user" /><span>User</span></span>}
            >
              <Menu.Item key="3"><Link to="/Profile">Profile</Link></Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={<span><Icon type="folder-open" /><span>Categories</span></span>}
            >
              <Menu.Item key="4"><Link to="/Food">Food</Link></Menu.Item>
              <Menu.Item key="5"><Link to="/Clothing">Clothing</Link></Menu.Item>
              <Menu.Item key="6"><Link to="/Footwear">Footwear</Link></Menu.Item>

            </SubMenu>
            <Menu.Item key="7">
              <Icon type="file" />
              <span><Link to="/About">About</Link></span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <Routes isLoginSuccess={this.props.isLoginSuccess} visibleModal={ this.props.isLoginSuccess? false: true} />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            E-Comm ©2018 Created by Volans
          </Footer>
        </Layout>
      </Layout>
      </div>
    ://if no user info found
      <div className="App">
        <Login  name="Login" {...this.state}/>
        <SignUp handleClick={this.handleClick} handleSignUp={this.handleSignUp}  {...this.state}/> 

        {/* Navigation bar */}
         <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <Icon type="pie-chart" />
              <span><Link to='/'>E-Comm</Link></span>
            </Menu.Item>
            <Menu.Item key="2"><a onClick={this.handleSignUp}>Sign Up</a></Menu.Item>
            <Menu.Item key="3"><a onClick={this.handleClick} >Login</a></Menu.Item>
            
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <Routes/>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            E-Comm ©2018 Created by Volans
          </Footer>
        </Layout>
      </Layout>
      </div>
    )
  }
}

const mapStateToProps= (state) =>{
  console.log("STATE IS", state)
  return {
    isLoginSuccess: state.reducer.isLoginSuccess,
    user: state.reducer.user,
    visibleModal: state.reducer.visibleModal,
  }
}

const dispatchToProps = (dispatch) =>{
  return {
    loginClick: () => dispatch(loginClick())
  }
}

export default withRouter(
  connect(mapStateToProps, dispatchToProps)(App)
);