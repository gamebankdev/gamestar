import React from 'react';
import { connect } from 'dva';
import HadersJsx from '../components/Header'
import ContentJsx from './Contents.jsx'
import {  Route,Switch } from 'dva/router';
import Login from './Login.jsx'
import Detail from './Deatil.jsx'
import Transfers from './transfers'
import GlobalLogin from '../components/Popup/SignTranser'
import Footer from '../components/Footer'
import NotFound from './404.jsx'
const  IndexPage =({showPopupLogin})=>{
  return (
    <div style={{width:"100%",height:"100%"}}>
      {
        showPopupLogin?<GlobalLogin />:null
      }
        <HadersJsx />
        <Switch>  
          <Route path='/' exact component={ContentJsx}/>
          <Route path='/login' component={Login}/>
          <Route path='/games/:tags/:id' component={Detail}/>
          <Route path='/404'   component={NotFound}/>
          <Route path='/users/:userName'   component={Transfers}/>
        
        </Switch> 
        <Footer >Footer</Footer>
    </div>
  );
}
  
const mapStateToProps = (state, ownProps) => {
  return {...state.users,...state.global}
}
export default connect(mapStateToProps)(IndexPage);
