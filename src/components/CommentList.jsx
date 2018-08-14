import { Avatar } from 'antd';
import React from 'react'
import { Dropdown, Icon, message,Button } from 'antd';
import styled from 'styled-components'
import Wangeditor from '../components/wangEditor'
import {connect} from 'dva'
const ListContainer = styled.div`
    display:flex;
    background-color:rgba( 32, 47, 67, 0.8);
    justify-content: flex-start;
    padding:12px 8px 10px 20px;
    border:1px solid #26384f;
    box-shadow:0 0 5px #000;
    position:relative
`
const AuthorDropdownContainer=styled.div`
    background-color:#fefefe;
    color:#333;
    width:300px ;
    border:1px solid #cacaca;
    padding:15px;
    box-shadow:1px 1px 5px 0px rgba(50, 50, 50, 0.75)
`
const Collapse=styled.div`
    position:absolute;
    right:30px;
`
const AuthorDropdown =(root_author)=>{
    return <AuthorDropdownContainer  focusable="true">
        <div>
            <div>
                <a style={{color:"#000"}} >{root_author}</a>
            </div>
            <button>关注</button>
        </div>
        <div>
             Lifestyle, Motivation & Quotes
        </div>
    </AuthorDropdownContainer>
}
class CommentList extends React.Component {
    constructor(props){
        super(props)
        this.state={
            show:false,
            voteLoading:false,
            isCollapse:false
        }
    }
    changeShow=(value)=>{
        this.setState({
            show:value
        })
    }
    componentDidMount(){
        if(this.props.you){
            this.refs.shrink.nextSibling.style.display='none'
        }
    }
    Open=()=>{
        this.setState({
            isCollapse:!this.state.isCollapse
        },()=>{
            if(this.state.isCollapse){
                this.refs.shrink.nextSibling.style.display='block'
            }else{
                this.refs.shrink.nextSibling.style.display='none'
            }
        })
       
      
    }

    /* 投票 */
    vote=async (voteId)=>{
        const {privePostingWif,author,userName,id,parent_permlink,permlink}=this.props
        if(!privePostingWif){
            return message.warning('请先登陆');
        }
        this.setState({
            voteLoading:true,
        })
        try{
            await  this.props.postVote([privePostingWif,userName,author,permlink,10000])
            this.setState({
                voteLoading:false,
            })
        }catch(err){
            this.setState({
                voteLoading:false,
            })
        }
    }
    /* 提交评论 */
    postComemnt(value){
        const {privePostingWif,author,userName,id,parent_permlink,permlink}=this.props
        if(!privePostingWif){
          return message.warning('请先登陆');
        }
        this.props.postComment([privePostingWif,author,permlink, userName, new Date().getTime().toString(),'', value, {}])
        .then(res=>{
            this.props.dispatch({
                type:'games/getGameComment',
                gameId:this.props.gameId
            })
            this.setState({
                show:false
            })
        })
    }
    render(){
     const {created,body,reward,root_author,net_votes,id}= this.props
    return (
        <div ref='shrink'>
         <ListContainer>
            <div style={{width:'48px'}}>
                <Avatar>USER</Avatar>
            </div>
            <div>
               <div style={{display:'flex',alignItems:'center'}}>
                <Dropdown root_author={root_author}  overlay={AuthorDropdown(root_author)} trigger={['click']}>
                    <div style={{color:'#8091a2'}}>
                        <div>
                        {root_author} <Icon type="down" />
                        <span>{created}</span>
                         </div>
                    </div>
                </Dropdown>
               </div>
               <div style={{color:'#acb2b8'}} dangerouslySetInnerHTML={{__html:body}}></div>
               <div style={{color:'#A4D7F5',display:'flex',justifyContent:'flex-start',fontSize:'14px'}}>
                   <div style={{padding:'0 10px',borderRight:'1px solid #212f43',display:'flex',alignItems:'center'}}>
                        <div onClick={(id)=>this.vote(id)} style={{display:'flex',alignItems:'center',paddingRight:'5px'}}>
                            <Button loading={this.state.voteLoading} type="primary" shape="circle" size='small' icon='like' title="点赞" />
                        </div>
                        <div> {reward}</div>
                   </div>
                  <div style={{padding:'0 10px'}}>{net_votes}个投票</div>
                  <div onClick={()=>this.setState({show:'block'})}>回复</div>
               </div>
            </div>
            {
                this.props.you? <Collapse style={{color:'#fff'}} onClick={this.Open} title={!this.state.isCollapse?'展开':'收缩'} >
                    {
                        /* this.state.isCollapse?<img style={{width:'14px'}} src={require("../assets/collapse-up.png")} alt="展开"/>:
                        <img style={{width:'14px'}} src={require("../assets/collapse-down.png")} alt="收缩"/> */
                        !this.state.isCollapse?"展开":"收缩"
                        
                    }
             </Collapse>:null
            }
       
        </ListContainer>
        {
            this.state.show?<Wangeditor {...{id,
                    show:this.state.show,
                    userName:this.props.userName,
                    changeShow:(value)=>this.changeShow(value),
                    postComemnt:(value)=>this.postComemnt(value)
                    }} 
            />:null
        }
        </div> 
    )
    }
}
const CommentComponent = (props) => {
    if(props.replies.length==0){
        return <CommentList key={props.id} {...props}/>
    }else{
      const content=props.prop.content;
      return (
        <div>
          <CommentList key={props.id} you={1} {...props}/>
          <div style={{paddingLeft:'20px'}}>
            {
                props.replies.map((item,index)=>{
                    if(content[item].replies.length==0){
                    return  <CommentList
                            {...content[item]} 
                            key={index} 
                            reward={props.reward}
                            dispatch={props.dispatch}
                            privePostingWif={props.privePostingWif}
                            userName={props.userName}
                            postVote={props.postVote}
                            gameId={props.gameId}
                            postComment={props.postComment}/>
                    }else{
                        
                        const obj={
                            postVote:props.postVote,
                            postComment:props.postComment,
                            privePostingWif:props.privePostingWif,
                            prop:{content:content},
                            userName:props.userName,
                            replies:content[item].replies,
                            dispatch:props.dispatch,
                            gameId:props.gameId,
                            reward:props.reward
                        }
                      return  <CommentComponent key={index} {...content[item] } {...obj} />
                    }
                })
            }
          </div>
        </div> 
      ) 
    }
}
const mapStateToProps = (state, ownProps) => {
    return {prop:state.games.gamesComment,privePostingWif:state.users.privePostingWif}
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        postComment: (payload) => {
            return new Promise((resolve,jeject)=>{
                dispatch({
                    type:'posts/PostComment',
                    payload
                 })
                 .then(res=>{
                     resolve(res)
                 })
                 .catch(err=>{
                    jeject(err)
                 })
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
        dispatch,
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(CommentComponent) 

