import React from 'react'
import {Link} from 'dva/router'
import { Menu } from 'antd';
import { Route } from 'dva/router';
import {connect} from 'dva'
import styled from 'styled-components';

import Balance from '../components/balance.jsx'
import Permissions from '../components/permissions.jsx'
import Repass from '../components/Repass.jsx'

const Route_container = styled.div`
    padding:0 10px;
    box-sizing:border-box;
`
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
          <Menu mode='horizontal' style={{background:"inherit"}}>
            <Menu.Item>
              <Link to={`/users/${RouteUserName}/walet`}>余额</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to={`/users/${RouteUserName}/walet/permissions`} > 权限</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to={`/users/${RouteUserName}/walet/rePass`}>密码</Link>
            </Menu.Item>
        </Menu>:null
      }
      <Route_container>
        <Route path='/users/:userName/walet' exact    component={Balance} />
        <Route path='/users/:userName/walet/permissions'  component={Permissions} />
        <Route path='/users/:userName/walet/rePass'  component={Repass} />
      </Route_container>
    </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {...state.users.loginUserMeta}
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