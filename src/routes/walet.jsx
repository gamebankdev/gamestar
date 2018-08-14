import Balance from '../components/balance.jsx'
import Permissions from '../components/permissions.jsx'
import Repass from '../components/Repass.jsx'
import {Link} from 'dva/router'
import { Menu, } from 'antd';
import {  Route } from 'dva/router';
import {connect} from 'dva'
import React from 'react'
class Walet extends React.Component{
  componentDidMount(){
    this.props.getAccountMeta()
  }
  render(){
    const RouteUserName=this.props.match.params.userName
    const userName=this.props.userName
    return(
      <div>
      {
        RouteUserName==userName?
          <Menu mode='horizontal' style={{background:'#1b2838', color:'#fff',border:'0'}}>
          <Menu.Item>
            <Link to={`/${RouteUserName}/walet`} style={{color:'#fff'}}>余额</Link>
          </Menu.Item>
          <Menu.Item>
            <Link  to={`/${RouteUserName}/walet/permissions`}  style={{color:'#fff'}}> 权限</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to={`/${RouteUserName}/walet/rePass`}  style={{color:'#fff'}}>密码</Link>
          </Menu.Item>
        </Menu>:null
      }
      <Route path='/:userName/walet' exact    component={Balance} />
      <Route path='/:userName/walet/permissions'  component={Permissions} />
      <Route path='/:userName/walet/rePass'  component={Repass} />
    </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  return {...state.users}
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getAccountMeta:()=>{
      dispatch({
        type:'walet/fetchUserWalet',
        payload:ownProps.match.params
      })
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Walet)