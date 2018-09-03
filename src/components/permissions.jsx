import React from 'react'
import { Button, Radio, Icon, Modal } from 'antd';
import styled from 'styled-components'
import {connect} from 'dva'
const Container = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    color:#808891;
    padding:20px 0;
    box-sizing:border-box;
`
const Key_code_text= styled.div`
    display:flex;
    align-items:center;
    font-family:"SimHei"
`
const Key_index_Container = styled.div`
    padding:20px 0;
    box-sizing:border-box;
    display:flex;
    justify-content:space-between;
    align-items:center;
    i{
        font-size:40px;
    }
`
class Permissions extends React.Component{
    constructor(props){
        super(props)
        this.state={
            visible:false,
            showPostingPub:true,
            showActivePub:true,
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
    }
    render(){       
        const {ActivePubKey,postingPubKey,ownerPubKey,memoPubkey,loginUserMeta} = this.props
        const {showPostingPub,showActivePub} = this.state
        return(
            <div>
            <Key_index_Container>
                    <div>
                      <h3>发帖</h3>
                      <Key_code_text>
                        <Icon style={{fontSize:"40px"}} type="qrcode" />
                        <span>{showPostingPub?postingPubKey.key_auths[0]:loginUserMeta.privePostingWif}</span>
                      </Key_code_text>
                      <p>Posting Key用于发帖和投票。它应与Active Key和Owner Key区分使用。</p>
                    </div>
                    <div>   
                      <Button 
                        type="primary"
                        onClick={()=>{this.showPri('posting')}} ghost>
                       {showPostingPub?'显示私钥':'显示公钥'} 
                      </Button>
                    </div>
                </Key_index_Container>
                <Key_index_Container>
                        <div>
                            <h3>活跃</h3>
                            <Key_code_text>
                              <Icon type="qrcode" />
                              <span>{showActivePub?ActivePubKey.key_auths[0]:loginUserMeta.activePriWif}</span>
                            </Key_code_text>
                            <p>Active Key用于转帐和在内部市场下单。</p>
                        </div>
                        <div>   
                        {
                            !loginUserMeta.activePriWif?
                            <Button 
                              onClick={()=>this.props.dispatch({type:"global/showSignModal"})} 
                              type="primary" 
                              ghost  
                            >
                              登陆显示
                            </Button>
                            :
                            showActivePub?
                            <Button type="primary" onClick={()=>{this.showPri('active')}} ghost>显示私钥</Button>
                            :<Button type="primary" onClick={()=>{this.showPri('active')}} ghost>显示公钥</Button>
                        }
                        </div>
                </Key_index_Container>
                <Key_index_Container>
                    <div>
                      <h3>拥有者</h3>
                          <Key_code_text>
                              <Icon type="qrcode" />
                              <span>{ownerPubKey.key_auths[0]}</span>
                            </Key_code_text>
                            <p>Owner Key是帐户的主密钥，用于更改其它密钥。</p>
                            <p>Owner Key的私钥或密码应尽可能保持离线。</p>
                        </div>
                </Key_index_Container>
                <Key_index_Container>
                        <div>
                            <h3>备注</h3>
                            <Key_code_text>
                              <Icon type="qrcode" />
                              <span>{memoPubkey}</span>
                            </Key_code_text>
                            <p>Memo Key用于创建和读取备注。</p>
                        </div>
                </Key_index_Container>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    //账户公钥
    const {active,memo_key,owner,posting} = state.accounts.userAccounts;
    //账户私钥
    const {loginUserMeta} =state.users
    return {
        ActivePubKey:active,
        ownerPubKey:owner,
        postingPubKey:posting,
        memoPubkey:memo_key,
        loginUserMeta:loginUserMeta,
    }
}

export default connect(mapStateToProps)(Permissions) 

