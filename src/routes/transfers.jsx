import React from 'react'
import {Link} from 'dva/router'
import styled from 'styled-components'
import {Button ,Divider,Icon} from 'antd';
import {  Route} from 'dva/router';
import {connect} from 'dva'
import ChangeAvterModal from '../components/Popup/ChangeAvterModal'
import Walet from './walet'
import PostList from './myPostListPage'
import Comment from './MyCommentsPage'
import MyLeaveMessage from './MyLeaveMessage'
import fomatTime from '../utils/formatTime'
const Container = styled.div`
    width: 100%;
    background:#fff;
    min-height:calc(100% - 280px);
    margin:0 auto;
    padding-bottom:60px;
    box-sizing:border-box;
`
const Person_center_title = styled.h1`
    color:#f85352;
    width:980px;
    margin:0 auto;
    padding:20px 0;
    box-sizing:border-box;
`
const Container_content = styled.div`
    width:980px;
    margin:0 auto;
    background:#f8f8f8;
    display:flex;
    justify-content:flex-start;
`
const Person_meta_container = styled.div`
    width:290px;
    padding:10px;
    box-sizing:border-box;
    text-align:center;
    box-sizing:border-box;
    font-family:'SimHei'
`
const User_avter_container = styled.div`
    width:120px;
    height:120px;
    margin:0 auto;
    position:relative;
    :hover div{
        display:block;
    }
    img{
        width:100%;
        height:100%;
    }
`
const ChaneAvter=styled.div`
    width:100%;
    height:30px;
    display:none;
    line-height:30px;
    background-color:rgba(0,0,0,0.5);
    text-align:center;
    color: #fff;
    position:absolute;
    bottom: 0;
    left:0;
   
`
const Person_userName = styled.p`
    padding:20px 0;
    font-size:20px;
    color:#333;
` 
const Person_meta = styled.div`
    display:flex;
    margin-top:20px;
    padding-bottom:20px;
    justify-content:space-around;
    text-align:center;
    box-sizing:border-box;
`
const Folle_igore_container = styled.div`
    display:flex;
    justify-content:space-around;
`
const User_meta_comtainer = styled.div`
    padding-top:10px;
    padding-bottom:10px;
    box-sizing:border-box;
    background:#fff;
`
const My_button_container = styled.div`
    padding:10px;
    box-sizing:border-box;
    background:#fff;
    button{
        width:100% ;
        margin-top:20px;
        box-sizing:border-box;
    }
`
const Content_container= styled.div`
    width:calc(100% - 290px) ;
    border-left:1px solid #c6c6c6;
    padding:30px 10px 40px 10px;
    box-sizing:border-box;
`

class Transfers extends React.Component{
    constructor(props){
 
        super(props)
        this.state={
            isFollw:false,
            isShield:false,
            visible:false
        }
    }
    componentDidMount(){
        this.props.getUser();
    }
    //关注
    follow(author){
        const {privePostingWif,userName}=this.props.loginUserMeta
        let followReq = ["follow"]
        followReq.push({follower: userName, following: author, what: ["blog"]})
        const customJson = JSON.stringify(followReq)
        this.props.postUserOper([privePostingWif, [], [userName], 'follow', customJson])
    }   
     //取消关注
     canclefollow(author){
        const {privePostingWif,userName}=this.props.loginUserMeta
        let followReq = ["follow"]
        followReq.push({follower: userName, following: author, what: []})
        const customJson = JSON.stringify(followReq)
        this.props.postUserOper([privePostingWif, [], [userName], 'follow', customJson])
    }   
    /**屏蔽*/
    Shield=(author)=>{
        const {privePostingWif,userName}=this.props.loginUserMeta
        let followReq = ["follow"]
        followReq.push({follower: userName, following: author, what: ["ignore"]})
        const customJson = JSON.stringify(followReq)
        this.props.postUserOper([privePostingWif, [], [userName], 'follow', customJson])
    }
    //取消屏蔽
    cancleShield=(author)=>{
        const {privePostingWif,userName}=this.props.loginUserMeta
        let followReq = ["follow"]
        followReq.push({follower: userName, following: author, what: []})
        const customJson = JSON.stringify(followReq)
        this.props.postUserOper([privePostingWif, [], [userName], 'follow', customJson])
    }
    componentWillReceiveProps(nextProps){
 
        const {ignore,folloing,changeAvterSuccess} = nextProps
        if(changeAvterSuccess){
            this.setState({
                visible:false
            })
        }else{
            this.setState({
                visible:true
            })
        }

        if(folloing.length==0 &&ignore.length==0 ){
            this.setState({
            isFollw:false,
            isShield:false
            })
        }  
        if(ignore.length>0){
            ignore.map(item=>{
                if(item.follower == this.props.loginUserMeta.userName){
                   this.setState({
                        isShield:true,
                        isFollw:false
                   })
                }
            })
        }
        if(folloing.length>0){
            folloing.map(item=>{
                if(item.follower == this.props.loginUserMeta.userName){
                    this.setState({
                        isFollw:true,
                        isShield:false
                   })
                }
            })
        }
    }
    render(){ 
        const loginUserName = this.props.loginUserMeta.userName
        const {userReputation} =this.props
        const {isShield,isFollw,visible} = this.state
        const {userName} = this.props.match.params
        const {post_count,created,json_metadata} = this.props.userAccounts
        const {follower_count,following_count} =this.props.FollowCounts
       return(
        <Container>
            <Person_center_title>个人中心</Person_center_title>
            <ChangeAvterModal  visible={visible} cancel={()=>this.setState({visible:false})} />
            <Container_content>
                <Person_meta_container>
                <div style={{padding:'10px'}}>
                <User_meta_comtainer >
                    <User_avter_container>
                        {
                            json_metadata?
                              <img src={JSON.parse(json_metadata).profile.profile_image} alt=""/>
                              :<img src={require('../assets/DefaultAvter.jpg')} alt=""/>
                        }
                        {
                            userName==loginUserName? <ChaneAvter onClick={()=>this.setState({visible:true})}>
                                        <Icon type="edit" />&nbsp;修改头像
                                        </ChaneAvter>:null
                        }
                    </User_avter_container>

                    <Person_userName>{`${userName}(${userReputation})`}</Person_userName>
                    <span>{fomatTime(created)}加入</span>
                    <Person_meta>
                        <div>
                            <span>{follower_count}</span>
                            <br/>
                            <span>关注</span> 
                        </div>
                        <div>
                            <span>{post_count||0}</span>
                            <br/>
                            <span>帖子</span>
                        </div>
                        <div>
                            <span>{following_count}</span>
                            <br/>
                            <span>被关注</span>
                        </div>
                    </Person_meta> 
                    {
                        loginUserName==userName
                        ?null
                        : <Folle_igore_container>
                            { 
                                isShield?
                                [
                                    <Button 
                                      style={{background:"#ff6160",color:"#fff",border:"0"}}
                                      disabled 
                                      key={1} 
                                      onClick={()=>this.follow(userName)}>
                                      关注
                                    </Button>,
                                     <Button key={2} onClick={()=>this.cancleShield(userName)} >取消屏蔽</Button>
                                ]
                                :isFollw?
                                [
                                    <Button onClick={()=>this.canclefollow(userName)} key={3}>取消关注</Button>,<Button key={4} onClick={()=>this.Shield(userName)}>屏蔽</Button>
                                ]:
                                [
                                    <Button  style={{background:"#ff6160",color:"#fff",border:"0"}} key={5} onClick={()=>this.follow(userName)}>关注</Button>,<Button key={6} onClick={()=>this.Shield(userName)}>屏蔽</Button>
                                ]
                            }
                         </Folle_igore_container>
                    } 
                  
                </User_meta_comtainer>
                </div>
                <Divider />
                    <div style={{padding:'0 10px'}}>
                        <My_button_container>
                            <Link to={`/users/${userName}/posts`} replace>
                            <Button>{loginUserName==userName?'我的发帖':'发帖'}</Button>
                            </Link>
                            <br/>
                            <Link to={`/users/${userName}/messages`} replace>
                            <Button>{loginUserName==userName?'我的消息':'消息'}</Button>
                            </Link>
                            <br/>
                            <Link to={`/users/${userName}/comments`} replace>
                            <Button>{loginUserName==userName?'我的评论':'评论'}</Button>
                            </Link>
                            <br/>
                            <Link to={`/users/${userName}/walet`} replace>
                            <Button>{loginUserName==userName?'我的钱包':'钱包'}</Button>
                            </Link>
                        </My_button_container>
                    </div>
                </Person_meta_container>     
                <Content_container>
                    <Route path='/users/:userName/posts' component={PostList}/>
                    <Route path='/users/:userName/messages' component={MyLeaveMessage}/>
                    <Route path='/users/:userName/comments' component={Comment}/>
                    <Route path='/users/:userName/walet' component={Walet}/>
                </Content_container>
            </Container_content>
        </Container>

    )
 }
}
const mapStateToProps = (state) => {
    return {
        ...state.accounts,
        ...state.users
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getUser:()=>{

            dispatch({
                type:'accounts/getUserMeta',
                payload:ownProps.match.params.userName
              })
        },
        postUserOper:(payload)=>{
             dispatch({
                type:'posts/UserOper',
                payload
            })
        }
     
     }
}
export default connect(mapStateToProps,mapDispatchToProps)(Transfers)