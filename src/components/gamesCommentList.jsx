
import React from 'react'
import { Popover,message,Button } from 'antd';
import styled from 'styled-components'
import Wangeditor from '../components/wangEditor'
import ComemntChild from '../components/gamechildcomment'
import {connect} from 'dva'
import formtTime from '../utils/formatTime'
import {Link} from 'dva/router'

const Game_comment_parent_container = styled.div`
    width: 100%;
    display:flex;
    padding-top:20px;
    padding-bottom:20px;
    border-bottom:1px solid #666;
    box-sizing:border-box;
`
const User_img = styled.div`
    padding:0 20px 0 30px;
    box-sizing:border-box;
    img{
        width:70px;
        height: 70px;
        border-radius:100%;
    }
`

const Comment_meta = styled.div`
    width:calc(100% - 120px) ;
    padding-right:40px;
    box-sizing:border-box;
` 
const Comment=  styled.div`
    width:100%;
    display:flex;
    justify-content:space-between;
    p{
        font-size:16px;
    }
`
const Comment_userName = styled.p`
    padding-bottom:20px;
    box-sizing:border-box;
    a{
        color:inherit;
    }
`
const Comment_oper =  styled.div`
    width: 100%;
    justify-content:space-between;
    padding-top:20px;
    padding-right:40px;
    box-sizing:border-box;
    display:flex;
    div{
        display:inherit;
    }
`
const Comment_time = styled.p`
    font-size:14px;
    color:#666;
`
const PopovercontentContainer = styled.div`
    font-size:14px;
    height:100%;
    border:none;
    /* button{
        border:0;
        outline:none;
        border:none;
    }
    button:nth-child(1){
        color: #fff;
        border:0;
        background-color:#ff605f;

    }
    button:nth-child(2){
        color: #666;
        border:0;
        background-color:#fff;

    } */
`
const ReplayContainer= styled.div`
    display:flex;
    justify-content:flex-end;
    margin-top:20px;
    flex-wrap:wrap;

`
const CloseReplayButton = styled.button`
    width:78px;
    height:28px;
    outline:none;
    font-size:14px;
    color: #333;
    background:#f8f8f8;
    border:none;
`
const ReplayEditor = styled.div`
    width:100%;
    padding:10px;
    box-sizing:border-box;
    background:#f8f8f8;
`
const Viewallcomments = styled.div`
    width:100%;
    height: 40px;
    background:#f8f8f8;
    text-align:center;
    line-height:40px;
    font-size:14px;
    color:#333;
`
const Oper_button = styled.div`
    margin-left:20px;
    font-size:14px;
    button{
        width: 40px;
        height: 20px;
        border-radius:5px;
        font-size:12px;
        margin-right:5px;
        border:none;
    }
`

class CommentList extends React.Component {
    constructor(props){
        super(props)
        this.state={
            showReplayContainer:false,
            showAllchildComment:false,
            voteLoading:false,
            isFollow:false,
            isIgore:false
        }
    }
    changeShow=(value)=>{
        this.setState({
            showReplayContainer:value
        })
    }
    /* 点赞 */
    vote=(permlink,author)=>{
        const {privePostingWif,userName}=this.props.users.loginUserMeta
        if(!privePostingWif){
            return message.warning('请先登陆');
        }
        this.props.postVote([privePostingWif,userName,author,permlink,10000])
    }

    /* 提交评论 */
    postComemnt(value,permlink){
        const {author}=this.props.props
        const {privePostingWif,userName}=this.props.users.loginUserMeta
        
        if(!privePostingWif){
          return message.warning('请先登陆');
        }
        this.props.postComment([privePostingWif,author,permlink, userName, new Date().getTime().toString(),'', value, {}])
        this.setState({
            showReplayContainer:false
        })
    }
    //关注
    follow(author){
        const {privePostingWif,userName}=this.props.users.loginUserMeta

        let followReq = ["follow"]
        followReq.push({follower: userName, following: author, what: ["blog"]})
        const customJson = JSON.stringify(followReq)
        this.props.postUserOper([privePostingWif, [], [userName], 'follow', customJson])
    }   
     //取消关注
     canclefollow(author){
        const {privePostingWif,userName}=this.props.users.loginUserMeta
        let followReq = ["follow"]
        followReq.push({follower: userName, following: author, what: []})
        const customJson = JSON.stringify(followReq)
        this.props.postUserOper([privePostingWif, [], [userName], 'follow', customJson])
    }   
    /**屏蔽*/
    Shield=(author)=>{
        const {privePostingWif,userName}=this.props.users.loginUserMeta
        let followReq = ["follow"]
        followReq.push({follower: userName, following: author, what: ["ignore"]})
        const customJson = JSON.stringify(followReq)
        this.props.postUserOper([privePostingWif, [], [userName], 'follow', customJson])
    }
    //取消屏蔽
    cancleShield=(author)=>{
        const {privePostingWif,userName}=this.props.users.loginUserMeta
        let followReq = ["follow"]
        followReq.push({follower: userName, following: author, what: []})
        const customJson = JSON.stringify(followReq)
        this.props.postUserOper([privePostingWif, [], [userName], 'follow', customJson])
    }
    //触发Popover事件
    PopoverCallback=(visible)=>{
        if(visible){
            const {ignore,folloing} = this.props.users
            const {author} = this.props.props
            if(ignore.length==0){
                this.setState({
                    isIgore:false
                })
            }else{
                ignore.map(item=>{
                    if(author==item.following){
                        this.setState({
                            isIgore:true
                        })
                    }
                })
            }
            if(folloing.length==0){
                this.setState({
                    isFollow:false
                })
            }else{
                folloing.map(item=>{
                    if(author==item.following){
                        this.setState({
                            isFollow:true
                        })
                    }
                })
            }          
        }
    }
    render(){
        const {body,replies,created,author,active_votes,id,permlink,child,reward} = this.props.props
        const {userName} = this.props.users.loginUserMeta
        const {allComment,accounts} = this.props
        const {isIgore,isFollow} = this.state
        const Popovercontent = (author)=>{
            return(
                <PopovercontentContainer>
                    {
                        isFollow?
                        <Button disabled={isIgore} onClick={()=>this.canclefollow(author)}>取消关注</Button>
                        :<Button disabled={isIgore} onClick={()=>this.follow(author)}>关注</Button>
                    }
                    {
                        isIgore?
                        <Button onClick={()=>this.cancleShield(author)}>取消屏蔽</Button>
                        :<Button onClick={()=>this.Shield(author)}>屏蔽</Button>
                    }
                  
                </PopovercontentContainer>
            )
        }
     return (
          <Game_comment_parent_container>
                    <User_img>
                    {
                        accounts[author].json_metadata
                        ? <img src={JSON.parse(accounts[author].json_metadata).profile.profile_image} alt=""/>
                        : <img src={require('../assets/DefaultAvter.jpg')} alt=""/>
                    }
                   
                    </User_img>
                            <Comment_meta>
                                <Comment>
                                    <div>
                                        <Comment_userName>
                                          <Link  to={`/users/${author}/posts`}> {author}</Link>
                                        </Comment_userName>
                                        <div dangerouslySetInnerHTML={{__html:body}}></div>
                                    </div>
                                    <div>
                                    {
                                        userName==author?
                                        <img src={require('../assets/coment_user_oper.png')} alt=""/>
                                        :
                                        <Popover  
                                            placement="leftTop"
                                            onVisibleChange={this.PopoverCallback}
                                            content={Popovercontent(author)}
                                            title={null}
                                        >
                                        <img src={require('../assets/coment_user_oper.png')} alt=""/>
                                      </Popover>
                                    }
                                     
                                    </div>
                                </Comment>
                                <Comment_oper>
                                    <Comment_time>发表于{formtTime(created)}</Comment_time>
                                    <div>
                                        <Oper_button>
                                          <Button
                                            loading={this.state.voteLoading}
                                            onClick={()=>this.vote(permlink,author)}
                                            style={{background:"#ff605f",color:"#fff"}} 
                                            size='small'>点赞
                                          </Button> 
                                          <span style={{color:"#d46e00"}}>{reward}</span>
                                        </Oper_button>
                                        <Oper_button>
                                          <span 
                                            style={{background:"#fff",color:"#666"}} 
                                            size='small'>投票
                                          </span> ({active_votes.length})
                                        </Oper_button>
                                        <Oper_button onClick={()=>this.changeShow(true)}>
                                            <Button 
                                              style={{background:"#e2e2e2",color:"#666"}} 
                                              size='small'>回复</Button>
                                             ({replies.length})
                                        </Oper_button>
                                    </div>
                                </Comment_oper>
                                {
                                    child.map((item,index)=>{
                                        const child=  <ComemntChild 
                                              key={index} 
                                              prop={item} 
                                              accounts={accounts}
                                              vote={(permlink,author)=>this.vote(permlink,author)}
                                              cancleShield={(author)=>this.cancleShield(author)}
                                              Shield={(author)=>this.Shield(author)}
                                              follow={(author)=>this.follow(author)}
                                              canclefollow={(author)=>this.canclefollow(author)}
                                              showRepalyEditor={(value)=>this.changeShow(value)}
                                              allComment={allComment}
                                              follow={(root_author)=>this.follow(root_author)}
                                            />
                                        if(!this.state.showAllchildComment){
                                            
                                          if(index<3){
                                            return child
                                          }
                                        }else{
                                            return child
                                        }
                                       
                                    })
                                 }
                                {
                                    child.length>3?<Viewallcomments
                                      onClick={()=>this.setState({showAllchildComment:!this.state.showAllchildComment})}>
                                        {!this.state.showAllchildComment?'查看全部评论':'收起评论'}
                                    </Viewallcomments>
                                      :null
                                }
                                {
                                this.state.showReplayContainer? 
                                      <ReplayContainer>
                                        <CloseReplayButton onClick={()=>this.changeShow(false)}>收起回复</CloseReplayButton>
                                        <ReplayEditor>
                                          <Wangeditor 
                                            key={id}
                                            id={id}
                                            permlink={permlink}
                                            Initialcontent={`回复${author}`}
                                            postComemnt={(value,permlink)=>this.postComemnt(value,permlink)}
                                          />
                                        </ReplayEditor>
                                      </ReplayContainer>
                                      :null
                                }
                            </Comment_meta>
            </Game_comment_parent_container>
    )
    }
}
const mapStateToProps = (state) => {
    return {
        allComment:state.games.gamesComment,
        users:state.users
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        postComment: (payload) => {
            dispatch({
                type:'posts/PostComment',
                payload
             })
            
        },
        postVote:(payload)=>{
            return new Promise((resolve,reject)=>{
                dispatch({
                    type:'posts/postVote',
                    payload
                })
                .then(()=>{
                    resolve()
                })
                .catch(()=>{
                    reject()
                })
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
export default connect(mapStateToProps,mapDispatchToProps)(CommentList) 

