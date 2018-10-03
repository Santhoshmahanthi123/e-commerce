import React, { Component } from 'react';
import './App.css';
import { Link, Redirect } from 'react-router-dom';  
import Login from './Login';
import SignUp from './SignUp';
import Home from './Home';
import { Layout, Menu, Icon } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import Routes from './Routes';

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
  componentWillMount(){
    var result=[]
    fetch('https://demo1443058.mockable.io/codeproject_tutorial/api/contacts')
    .then((Response) => Response.json())
    .then((findresponse) =>{
        result= findresponse.contacts
    //console.log("in will mount ", result)    
    this.setState({
      myData: result
     });
  //   console.log(" mount " ,this.state.myData)
    })    
   // async await usage
   // console.log(" mounted " ,this.state.myData)
   
  }
  
  handleLogin=(usr,pw)=>{
  
    this.state.myData.forEach((user) => {
      if(user.name === usr){
        if(user.password=== pw){
          this.setState({
            nextPage: true
          });
          console.log("Sucess");
          return true
        }
        else{
          console.log("Error");
          return false
        }
      }
      else{
        console.log("Invalid data")
        return false
      }

    })
    // console.log("user: ", user);
    // console.log("pwd: ", pwd);

    // console.log(usr+"  "+pw);
  }
  handleClick=(e)=>{
    this.setState({
      clicked:!this.state.clicked
    });
    
  }
   handleChange(e) {
      let fields = this.state.fields;
      fields[e.target.name] = e.target.value;
      this.setState({
        checkedValue: this.state.checkedVal,
        fields
      });

    }
  handleSignUp=(e)=>{
    this.setState({
      signup:!this.state.signup
    });
  }
  render() {
  //   if (this.state.nextPage) {
  //     return (
  //         <Redirect to={{
  //           pathname: '/Profile',
  //           state: this.props.location.state && this.props.location.state.myData 
  //       }} push  />
         
  //     );
  // }
    return (
     
      <div className="App">
         <Login  handleClick={this.handleClick} handleLogin={this.handleLogin} {...this.state}/>
        <SignUp handleClick={this.handleClick} handleSignUp={this.handleSignUp}  {...this.state}/> 

        {/* NAvigation bar */}
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
              <span><Link to='/Home'>E-Comm</Link></span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={<span><Icon type="user" /><span>User</span></span>}
            >
              <Menu.Item key="3"><a onClick={this.handleClick}>Login</a></Menu.Item>
              <Menu.Item key="4"><a onClick={this.handleSignUp}>Sign Up</a></Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={<span><Icon type="folder-open" /><span>Categories</span></span>}
            >
              <Menu.Item key="6"><Link to="/Food">Food</Link></Menu.Item>
              <Menu.Item key="7">Clothing</Menu.Item>
              <Menu.Item key="8">Footwear</Menu.Item>

            </SubMenu>
            <Menu.Item key="9">
              <Icon type="file" />
              <span>About</span>
            </Menu.Item>
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
    );
  }
}

export default App;
