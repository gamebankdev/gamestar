import cluster_bg_2 from '../assets/cluster_bg_2.png'
import {Link} from 'dva/router'
import styled from 'styled-components'
import React from 'react'
import {  Route,Redirect, } from 'dva/router';
import {connect} from 'dva'
import { Menu, Dropdown, Icon } from 'antd';
import Walet from './walet'
import PostList from './myPostListPage'
import Comment from './MyCommentsPage'
import MyLeaveMessage from './MyLeaveMessage'
import curationRewards from './curationRewards.jsx'
import authorRewards from './authorRewards'
const Container = styled.div`
    width: 100%;
    background: #1b2838 url(${cluster_bg_2}) no-repeat fixed center;
    margin:0 auto;
    min-height:800px;
`
const Pageheader = styled.h2`
    color: #fff;
    font-size:34px;
    padding-top:24px;
    box-sizing:border-box;
`
const LeftNave = styled.div`
    width:100% ;
    font-size:14px;
    display:flex;
    justify-content:space-between;
    background:#2C3A45;
    align-items:center;
    div{
        padding:10px;
        color: #fff;
    }
`
const Voter= styled.span`

    :hover{
        color:#40a9ff
    }
`
class Transfers extends React.Component{
    componentDidMount(){
        this.props.getUser()
    }
    render(){
    const { userName,match,userReputation}=this.props
    const {post_count,created} = this.props.userAccounts
    const {follower_count,following_count} =this.props.FollowCounts
    const ByUserName = match.params.userName
    const menu = (
        <Menu>
          <Menu.Item key="0">
            <Link  to={`/${ByUserName}/curation-rewards`} replace>投票奖励</Link>
          </Menu.Item>  
          <Menu.Item key="1">
            <Link to={`/${ByUserName}/author-rewards`} replace>作者奖励</Link>
          </Menu.Item>
        </Menu>
      );
    return(
        <Container>
            <div style={{width:'960px',minHeight:'100%',margin:'0 auto'}}>
                <div style={{textAlign:'center'}}>
                    <Pageheader>{`${ByUserName}(${userReputation})`} 的帐户</Pageheader>
                    <div style={{color:'rgb(128, 136, 145)',paddingLeft:'15px',boxSizing:'border-box'}}>
                        <Voter>{follower_count}个关注者</Voter>  
                        <span style={{border:"1px solid #fff",borderTop:'0',borderBottom:'0',margin:'0 10px',padding:'0 10px'}}>{post_count}个帖子</span> 
                        <span>{following_count==0?'没有关注任何人':`关注${following_count}人`}</span>
                        <p> 加入{created}</p>
                    </div> 
                </div>        
                <LeftNave>
                    <div style={{display:'flex',justifyContent:'flex-start'}}>
                        <Menu mode='horizontal' style={{background:'#2C3A45',color:'#fff',border:'0'}}>
                            <Menu.Item>
                              <Link style={{color:'#fff'}} to={`/${ByUserName}/posting`} replace>发帖</Link>
                            </Menu.Item>
                            <Menu.Item>
                              <Link style={{color:'#fff'}} to={`/${ByUserName}/comment`} replace>评论</Link>
                            </Menu.Item>
                            <Menu.Item>
                              <Link style={{color:'#fff'}} to={`/${ByUserName}/leaveMessage`} replace>留言</Link>
                            </Menu.Item>
                            {/* <Menu.Item>
                                <Dropdown overlay={menu} trigger={['hover']}>
                                    <span> 奖励 <Icon type="down" /></span>
                                </Dropdown>
                            </Menu.Item> */}
                            <Menu.Item>
                                <Link style={{color:'#fff'}} to={`/${ByUserName}/walet`} replace>钱包</Link>
                            </Menu.Item>
                        </Menu>
                    </div>
                </LeftNave>
                    <div style={{paddingTop:'20px',height:'100%'}}>
                      <Route path='/:userName/posting' component={PostList}/>
                      <Route path='/:userName/comment' component={Comment}/>
                      <Route path='/:userName/leaveMessage' component={MyLeaveMessage}/>
                      <Route path='/:userName/walet' component={Walet}/>
                      <Route path='/:userName/curation-rewards' component={curationRewards}/>
                      <Route path='/:userName/author-rewards' component={authorRewards}/>
                      {/* <Redirect from='/:userName' to ={`/${ByUserName}/posting`}/> */}
                    </div>
            </div>
        </Container>

    )
 }
}
const mapStateToProps = (state, ownProps) => {
    return {...state.accounts}
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getUser:()=>{
            dispatch({
                type:'accounts/getUserMeta',
                payload:ownProps.match.params.userName
              })
        }
     }
}
export default connect(mapStateToProps,mapDispatchToProps)(Transfers)
