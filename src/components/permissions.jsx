import React from 'react'
import { Button, Radio, Icon, Modal } from 'antd';
import styled from 'styled-components'
import {connect} from 'dva'
const Container = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    color:#808891;
    padding-bottom:30px;
    box-sizing:border-box;
`
const UserKeys= styled.div`
    width:100%;
`
class Permissions extends React.Component{
    constructor(props){
        super(props)
        this.state={
            visible:false,
            posting:{
                showPostingPub:true,
            },
            active:{
                showActivePub:true,
            },
            memo:{
                showMenoPub:true,
            }
        }
    }
    showCode(value){
        this.setState({
            visible:true,
            title:'',
            key:''
        })
    }
    showPri(value){
        if(value=='posting'){
            this.setState({
                showPostingPub:!this.state.showPostingPub
            })
        }
        if(value=='active'){
            this.setState({
                showActivePub:!this.state.showActivePub
            })
        }
        if(value=='memo'){
            this.setState({
                showMenoPub:!this.state.showMenoPub
            })
        }
    }
    render(){
        const {showPostingPub,showActivePub,showMenoPub}=this.state
       
        const postingPubKey=this.props.posting.key_auths[0][0]
        const ActivePubKey = this.props.active.key_auths[0][0];
        const OwnerKey=  this.props.owner.key_auths[0][0];
        const memoKey = this.props.memo_key;
        
        return(
            <UserKeys style={{height:'700px'}}>
            <Modal
                title="Basic Modal"
                footer={null}
                visible={this.state.visible}
                >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
                <Container>
                    <div>
                        <label htmlFor="" style={{color:"#1890ff"}}>发帖</label>
                        <div>
                            <img onClick={()=>this.showCode('postTingKey')} src={require('../assets/code.png')} alt=""/>
                            <span>{postingPubKey}</span>
                        </div>
                        <p>Posting Key用于发帖和投票。它应与Active Key和Owner Key区分使用。</p>
                    </div>
                    <div>   
                        <Button type="primary"  onClick={()=>{this.showPri('posting')}} ghost>显示私钥</Button>
                    </div>
                </Container>
                <Container>
                    <div>
                        <label htmlFor="" style={{color:"#1890ff"}}>活跃</label>
                        <div>
                            <img onClick={()=>this.showCode('actvieKey')} src={require('../assets/code.png')} alt=""/>
                            <span>{ActivePubKey}</span>
                        </div>
                        <p>Active Key用于转帐和在内部市场下单。</p>
                    </div>
                    <div>   
                        <Button type="primary" onClick={()=>{this.showPri('active')}} ghost>显示私钥</Button>
                    </div>
                </Container>
                <Container>
                    <div>
                        <label htmlFor="" style={{color:"#1890ff"}}>拥有者</label>
                        <div>
                            <img onClick={()=>this.showCode('ownerKey')} src={require('../assets/code.png')} alt=""/>
                            <span>{OwnerKey}</span>
                        </div>
                        <p>Owner Key是帐户的主密钥，用于更改其它密钥。</p>
                        <p>Owner Key的私钥或密码应尽可能保持离线。</p>
                    </div>
                </Container>
                <Container>
                    <div>
                        <label htmlFor="" style={{color:"#1890ff"}}>备注</label>
                        <div>
                            <img onClick={()=>this.showCode('memoKey')} src={require('../assets/code.png')} alt=""/>
                            <span>{memoKey}</span>
                        </div>
                        <p>Memo Key用于创建和读取备注。</p>
                    </div>
                </Container>
            </UserKeys>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {...state.walet.userState}
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatch1: () => {
            dispatch()
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Permissions) 