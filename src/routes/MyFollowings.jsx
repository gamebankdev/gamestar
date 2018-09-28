import React from 'react'
import {connect} from 'dva'
import { List} from 'antd';
import {Link} from 'dva/router'
import styled from 'styled-components'

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

class  Following extends React.Component{
    componentDidMount(){
        this.props.getFollowings()
    }
    render(){
        return(
            <Container>
                    <My_post_title>关注</My_post_title>
                    <My_posts_lists_container>
                     <List
                        pagination={{
                            hideOnSinglePage:true,
                            size:'small'
                        }}
                        dataSource={this.props.followings}
                        renderItem={item =>{
                            return (
                                <List.Item>
                                <Link style={{color:"#70afe5"}} to={`/users/${item.following}/posts`}>{item.following}</Link>
                                </List.Item>
                            )
                        } }
                        />
                    </My_posts_lists_container>
                    </Container>
        )
    } 
}
export default connect(state=>{
    return {
        followings:state.users.currentUserFollow
    }
},(dispatch,ownProps)=>{
    return {
        getFollowings:()=>{
            dispatch({
                type:"users/getFollow",
                userName:ownProps.match.params.userName,
                isloginUser:false
            })
        }
    }
})(Following)
