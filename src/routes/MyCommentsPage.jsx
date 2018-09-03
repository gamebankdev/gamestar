import React from 'react'
import {connect} from 'dva'
import styled from 'styled-components'
import ListContaniner from '../components/my_list_container'
const Container = styled.div`
    width:100%;
    font-family:'SimHei'
`
const My_post_title = styled.span`
    font-size:18px;
    padding-bottom:10px;
    border-bottom:1px solid red;
    color:#ff605f;
    box-sizing:border-box;
    position:relative;
    bottom:-5px;
`
const My_posts_lists_container = styled.div`
    margin-top:10px;
    border-top:1px solid #c6c6c6;
    border-bottom:1px solid #c6c6c6;
    padding:0 10px 10px 10px;
    box-sizing:border-box;
`
const Post_title =styled.p`
    font-size:18px;
    color: #333;
    padding:20px 0;
    box-sizing:border-box;
`
class Mycomments extends React.Component{
    constructor(props){
        super(props)
        this.state={
            voteLoading:false
        }
    }
    componentDidMount(){
        this.props.getAccountPost()
    }
    vote(){

    }
    changeShow(){

    }
    render(){
        const {Comments} =this.props;
        return(
            <Container>
              <My_post_title>我的评论</My_post_title>
              <My_posts_lists_container>
                {
                    Object.values(Comments).map((Item,index)=>{
                        return  (
                            <ListContaniner 
                                  key={index} 
                                  {...Item}
                                >
                                  <Post_title>专业推荐</Post_title>
                                <div dangerouslySetInnerHTML={{__html:Item.body}}></div>
                            </ListContaniner>
                        ) 
                    })
                }
               
              </My_posts_lists_container>
            </Container>
        )
    }
}
const mapStateToProps = (state) => {
    return {Comments:state.accounts.Comments.content}
}
const mapDispatchToProps = (dispatch, ownProps) => {

    return {
        getAccountPost:()=>{
            dispatch({
                type:'accounts/accountComment',
                userName:ownProps.match.params.userName
            })
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Mycomments) 