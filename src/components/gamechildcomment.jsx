import React from 'react'
import styled from 'styled-components'
import { Popover,Button } from 'antd';
import {connect} from 'dva'
import {Link} from 'dva/router'
import formtTime from '../utils/formatTime'
const Game_comment_child_container = styled.div`
    width: 100%;
    display:flex;
    background:#f8f8f8;
    margin-top:20px;
    padding-top:20px;
    padding-bottom:20px;
    margin-bottom:20px;
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
        cursor:pointer;
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
class Gamechildcomment extends React.Component{
    constructor(props){
        super(props)
        this.state={
            isFollow:false,
            isIgore:false
        }
    }
      //触发Popover事件
      PopoverCallback=(visible)=>{
        if(visible){
            const {ignore,folloing} = this.props.users
            const {author} = this.props.prop
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
        const {body,created,author,active_votes,replies,reward,permlink} = this.props.prop
        const {follow,vote,cancleShield,canclefollow,Shield,accounts} = this.props
        const {isIgore,isFollow} = this.state
        const {userName} = this.props.users.loginUserMeta
        const Popovercontent = (author)=>{
            return(
                <PopovercontentContainer>
                    {
                        isFollow?
                        <Button disabled={isIgore} onClick={()=>canclefollow(author)}>取消关注</Button>
                        :<Button disabled={isIgore} onClick={()=>follow(author)}>关注</Button>
                    }
                    {
                        isIgore?
                        <Button onClick={()=>cancleShield(author)}>取消屏蔽</Button>
                        :<Button onClick={()=>Shield(author)}>屏蔽</Button>
                    }
                </PopovercontentContainer>
            )
        }
        return (
             <Game_comment_child_container>
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
                                          <Link to={`/users/${author}/posts`}>{author}</Link>
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
                                            onClick={()=>vote(permlink,author)}
                                            style={{background:"#ff605f",color:"#fff"}} 
                                            size='small'>点赞
                                          </Button> 
                                          <span style={{color:"#d46e00"}}>{reward}</span>
                                        </Oper_button>
                                        <Oper_button>
                                          <span 
                                            style={{color:"#666"}} 
                                          >投票
                                          </span> ({active_votes.length})
                                        </Oper_button>
                                        <Oper_button onClick={()=>this.props.showRepalyEditor(true)}>
                                            <Button 
                                              style={{background:"#e2e2e2",color:"#666"}} 
                                              size='small'>回复</Button>
                                             ({replies.length})
                                        </Oper_button>
                                    </div>
                                </Comment_oper>
                            </Comment_meta>
            </Game_comment_child_container>
        )
    }
}


export default connect(state=>{
       return {users:state.users} 
    })(Gamechildcomment) 