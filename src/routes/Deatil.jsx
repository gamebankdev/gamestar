import styled from 'styled-components'
import React from 'react'
import backImg  from '../assets/cluster_bg_2.png'
import CommentList from '../components/CommentList'
import Wangeditor from '../components/wangEditor'
import {connect} from 'dva'
import Carousel from '../components/Carousel'
import { message } from 'antd';
const ContentContainer=styled.div`
    width:960px;
    margin:0 auto;
`
const Container = styled.div`
    background: #1b2838 url(${backImg}) no-repeat fixed center;
    min-height:800px;
`
const PostFullFooter = styled.div`
    display:flex;
    align-items:center;
    height: 60px;
    color:rgb(164, 215, 245);
    div{
        margin-right:30px;
        align-items:center;
    }
`
class Deatail extends React.Component{
    constructor(props){
        super(props)
        this.state={
            isShowWangeditor:false
        }
    }
    componentDidMount(){
        const {id} = this.props.match.params
        this.props.getDetail(id)
    }
    changeShow(value){
        this.setState({
            isShowWangeditor:value
        })
    }
    post(value){
    //   验证是否登陆
        /*
        wif 私钥,parentAuthor 父作者，
        parentPermlink 父文章 ,author 发帖作者,
        title标题,body 内容，jsonMetadata：tag 帖子id
     */
     //   wif, parentAuthor, parentPermlink, author, permlink, title, body, jsonMetadata
        const {privePostingWif,userName}=this.props
        if(!privePostingWif){
            return message.warning('请先登陆');
        }
        const {id} = this.props.match.params
        this.props.postComment([privePostingWif,'',id, userName, new Date().getTime().toString(),new Date().getTime().toString(), value, {tags:[id]}])        
        .then((res)=>{
            this.props.getDetail(id)
            this.setState({
                isShowWangeditor:false
            })
        })
        .catch(err=>{
      
        })
    }
    render(){
        const {isShowWangeditor}=this.state
        const {id} = this.props.match.params
        const {gameName,brief,introduce,created_at}=this.props.gamesDetail
        const {gamesComment,privePostingWif,userName}=this.props
        const {content}=this.props.gamesComment
        return(
            <Container style={{margin:'0 auto'}}>
                <ContentContainer>
                    <div>
                        <div>
                            <p style={{fontSize:'26px',color:'#fff'}}>{gameName}</p>
                            <div style={{color:'rgb(144, 153, 161)'}}>
                                {brief}
                            </div>
                            <div style={{color:'rgb(144, 153, 161)'}} dangerouslySetInnerHTML={{__html: introduce}}></div>
                        </div>
                        <PostFullFooter >
                            <div > <img src={require('../assets/time.png')} alt=""/> {created_at}</div>
                            <div onClick={()=>this.setState({isShowWangeditor:'block'})}>我要评论</div>
                            <div>{Object.values(content).length} 条评论</div>
                        </ PostFullFooter>
                    </div>
                    {
                        isShowWangeditor? <Wangeditor 
                        {...{
                            show:isShowWangeditor,
                            id:id,
                            changeShow:(value)=>this.changeShow(value),
                            postComemnt:(payload)=>this.post(payload)
                       }} />:null
                    }
                    <div style={{borderTop:'1px solid #000'}}>
                    {
                        Object.values(content).map((item,index)=>{
                            if(item.parent_author==""){
                                return  <CommentList key={index} {...item} gameId={id}  userName={userName} privePostingWif={privePostingWif}/>
                            }else{
                                return null
                            }
                        })
                    }
                       
                    </div>
                </ContentContainer>
            </Container>
        )
    }   
}
const mapStateToProps = (state, ownProps) => {
    return {...state.users,...state.games}
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        postComment: (payload) => {
            return new Promise((resolve,reject)=>{
                dispatch({
                    type:'posts/PostComment',
                    payload
                })
                .then(response=>{
                    resolve(response)
                })
                .catch(error=>{
    
                    reject(error)
                })
            })
        },
        getDetail:(gameId)=>{
            dispatch({
                type:'games/getGameDeatil',
                gameId
            })
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Deatail) 