import React from 'react'
import styled from 'styled-components'
import { Button} from 'antd';
import formatTime from '../utils/formatTime'
const Post_key_container = styled.div`
    background:#fff;
    padding:20px;
    margin-top:10px;
    border-radius:5px;
    box-sizing:border-box;
`
const Post_user = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    font-size:14px;
    color:#666;
`
const User_name_avter = styled.div`
    img{
        width: 30px;
        height:30px;
        border-radius:100%;
    }
    span{
        color: #333;
        font-size:16px;
        padding-left:8px;
        box-sizing:border-box;
    }
`
const Oper_container = styled.div`
    display:flex;
    justify-content:flex-end;
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


class MyListContainer extends React.Component{
    constructor(props){
        super(props)
        this.state={
            voteLoading:false
        }
    }
    componentDidMount(){
    }
    vote(){

    }
    changeShow(){

    }
    render(){
        const {author,created,active_votes,replies,pending_payout_value} = this.props
        return(
             <Post_key_container>
                    <Post_user>
                        <User_name_avter>
                            <img src={require("../assets/DefaultAvter.jpg")} alt=""/>
                            <span>{author}</span>
                        </User_name_avter>
                        <div>
                           {formatTime(created)}
                        </div>
                    </Post_user>
                    {this.props.children}
                    <Oper_container>
                      <Oper_button>
                          <span style={{color:"#d46e00"}}>{pending_payout_value}</span>
                      </Oper_button>
                      <Oper_button>
                        <span style={{background:"#fff",color:"#666"}} >
                         投票 {active_votes.length}
                        </span> 
                      </Oper_button>
                      <Oper_button onClick={()=>this.changeShow(true)}>
                        <Button 
                          style={{background:"#e2e2e2",color:"#666"}} 
                          size='small'>回复
                        </Button>    
                        <span>{replies.length}</span>      
                      </Oper_button>
                    </Oper_container>
                </Post_key_container>

        )
    }
}
export default MyListContainer