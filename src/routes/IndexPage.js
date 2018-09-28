import React from 'react';
import { connect } from 'dva';
import {  Route,Switch } from 'dva/router';
import dynamic from 'dva/dynamic';
import HadersJsx from '../components/Header'
import ContentJsx from './Contents.jsx'
import Footer from '../components/Footer'

const Login=dynamic({
  component:()=>import('./Login.jsx')
})

const Detail=dynamic({
  component:()=>import('./Deatil.jsx')
})
const Transfers=dynamic({
  component:()=>import('./transfers')
})

const GlobalLogin=dynamic({
  component:()=>import('../components/Popup/SignTranser')
})



const NotFound=dynamic({
  component:()=>import('./404.jsx')
})

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
