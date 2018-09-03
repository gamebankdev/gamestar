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

class MymessageList extends React.Component{
    componentDidMount(){
        this.props.getAccountMessage()
    }
    render(){
        const {Replays} = this.props

        return(
           <Container>
              <My_post_title>我的消息</My_post_title>
              <My_posts_lists_container>
                {
                    Object.values(Replays).map((Item,index)=>{
                        return  (
                            <ListContaniner 
                                  key={index} 
                                  {...Item}
                                >
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
    return { Replays:state.accounts.messages.content}
}
const mapDispatchToProps = (dispatch, ownProps) => {
    const {userName}=ownProps.match.params
    return {
        getAccountMessage:()=>{
            dispatch({
                type:'accounts/accountReplay',
                path:userName
            })
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(MymessageList)
