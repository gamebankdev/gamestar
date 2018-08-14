import { Avatar } from 'antd';
import React from 'react'
import { Menu, Dropdown, Icon } from 'antd';
import styled from 'styled-components'

const ListContainer = styled.div`
    display:flex;
    background-color:rgba( 32, 47, 67, 0.8);
    justify-content: flex-start;
    padding:12px 8px 10px 20px;
    border:1px solid #26384f;
    box-shadow:0 0 5px #000;

`
const AuthorDropdownContainer=styled.div`
    background-color:#fefefe;
    color:#333;
    width:300px ;
    border:1px solid #cacaca;
    padding:15px;
    box-shadow:1px 1px 5px 0px rgba(50, 50, 50, 0.75)
`
const AuthorDropdown = (
    <AuthorDropdownContainer>
        <div>
            <div>
                <a href="">Xemurai</a>
            </div>
            <button>关注</button>
        </div>
        <div>
             Lifestyle, Motivation & Quotes
        </div>
    </AuthorDropdownContainer>
  );

class CommentList extends React.Component {
    render(){
      const {author,created,body,net_votes,pending_payout_value,userReputation}=this.props

      return(
        <ListContainer>
            <div style={{width:'48px'}}>
                <Avatar>USER</Avatar>
            </div>
            <div>
               <div style={{display:'flex',alignItems:'center'}}>
                <Dropdown overlay={AuthorDropdown} trigger={['click']}>
                    <div style={{color:'#8091a2'}}>
                        <a className="ant-dropdown-link" href="#">
                                    {author} ({userReputation}) <Icon type="down" />
                                </a>
                                <span>{created}</span>
                    </div>
                </Dropdown>
               </div>
               <div style={{color:'#acb2b8'}} dangerouslySetInnerHTML={{__html:body}}></div>
               <div style={{color:'#A4D7F5',display:'flex',justifyContent:'flex-start',fontSize:'14px'}}>
                   <div style={{borderRight:'1px solid #212f43',display:'flex',alignItems:'center'}}>
                        <div style={{display:'flex',alignItems:'center',paddingRight:'5px'}}>
                            <img src={require('../assets/upvote2.png')} alt=""/>
                        </div>
                        <div>$ {pending_payout_value}</div>
                   </div>
                  <div style={{padding:'0 10px'}}>{net_votes}个投票</div>
               </div>
            </div>
        </ListContainer>
    )
    }
}
export default CommentList