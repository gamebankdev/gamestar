import React from 'react'
import {connect} from 'dva'
import { Pagination,Alert } from 'antd';

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
class MyPostList extends React.Component{
    constructor(props){
        super(props)
        this.state={
            voteLoading:false
        }
    }
    componentDidMount(){
        this.props.getAccountPost()
    }
    componentWillReceiveProps(nextProps){
       if(nextProps.games.length==0){
           
       }
    }
    handleChange=(page, pageSize)=>{
        this.setState({
            SectionStart:page*10-10,
            SectionEnd:10*page
        })
    }
    render(){
        const {posts} =this.props;
        return(
            <Container>
              <My_post_title>我的发帖</My_post_title>
              <My_posts_lists_container>
                {
                    Object.values(posts).length>0
                    ?Object.values(posts).map((Item,index)=>{
                        return  (
                            <ListContaniner 
                                  key={index} 
                                  {...Item}
                            >
                                <Post_title>{Item.game_name}</Post_title>
                                <div dangerouslySetInnerHTML={{__html:Item.body}}></div>
                            </ListContaniner>
                        ) 
                    })
                    :<Alert style={{display:"flex",justifyContent:"center",marginTop:'20px'}} message="暂无数据" type="error" />
                }
                <div style={{display:"flex",justifyContent:"center",marginTop:"20px"}}>
                  <Pagination 
                    size="small" 
                    hideOnSinglePage
                    defaultCurrent={1}
                    defaultPageSize={10}
                    onChange={this.handleChange}
                    total={ Object.values(posts).length}
                    />
                </div>
               
              </My_posts_lists_container>
            </Container>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        posts:state.accounts.Posts.content,
        games:state.games.gameList
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getAccountPost:()=>{
            dispatch({
                type:'accounts/accountPosting',
                userName:ownProps.match.params.userName
            })
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MyPostList) 