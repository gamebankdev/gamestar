import React from 'react';
import { connect } from 'dva';
import { Layout,message } from 'antd';
import HadersJsx from '../components/Header'
import ContentJsx from './Contents.jsx'
import {  Route, Redirect,Switch } from 'dva/router';
import Login from './Login.jsx'
import Detail from './Deatil.jsx'
import Transfers from './transfers'
import GlobalLogin from '../components/Popup/PopupLogin'
const { Header, Footer, Content } = Layout;

const  IndexPage =({showPopupLogin})=>{

  return (
    <Layout style={{minHeight:'100%'}}>
    {
      showPopupLogin?<GlobalLogin />:null
    }
      <Header >
          <div style={{margin:'auto'}}>
            <HadersJsx />
          </div>   
      </Header>
      <Content>
          <Switch>  
          <Route path='/' exact component={ContentJsx}/>
          <Route path='/login' component={Login}/>
          <Route path='/games/:tags/:id' component={Detail}/>
          <Route path='/:userName'   component={Transfers}/>
          </Switch> 
      </Content>
      <Footer style={{background:'rgba(0,0,0,0.9)'}}>Footer</Footer>
    </Layout>
  );
}
  
const mapStateToProps = (state, ownProps) => {
  return {...state.users,...state.global}
}
export default connect(mapStateToProps)(IndexPage);
