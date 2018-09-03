import React from 'react'
import { Menu, Dropdown, Icon } from 'antd';
import styled from 'styled-components';
import {connect} from 'dva'
import TransferToAccountModal from  './Popup/TransferModal'

const UserWallet__balance = styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding:20px 0;
  
`

class Balance extends React.Component{
    constructor(props){
        super(props)
        this.state={
            needTransfer:false
        }
    }
    render(){
        const GBCoinMenu = (
            <Menu>
              <Menu.Item key="0">
                <span onClick={()=>this.setState({ needTransfer:true})}>转账</span>
              </Menu.Item>
            </Menu>
          );
        const {balance,gbd_balance,gameStar_power,userName,isLogin} = this.props

        const routerUserName=this.props.match.params.userName
        return (
            <div>  
              <UserWallet__balance>
                    <div style={{color:'#808891',fontSize:'17px'}}>
                    GBC: GBCoin
                        <div style={{fontSize:'12px'}}>可交易代币可以在任何时候发送到任何地方。GBC可以在一个被称为Power Up的过程中被
                        <br/> GameStar POWER。</div>
                    </div>
                    {
                      routerUserName==userName? 
                        <div>
                          <Dropdown overlay={GBCoinMenu} trigger={['click']}>
                            <div style={{cursor:'pointer', color:'#ff605f'}}>
                            {balance} <Icon type="down" />
                            </div>
                          </Dropdown>
                        </div>
                        :<div style={{cursor:'pointer', color:'#ff605f'}}>{balance}</div>
                    }
              </UserWallet__balance>
             <UserWallet__balance>
                <div style={{color:'#808891',fontSize:'17px'}}>
                GBP: GBPower
                    <div style={{fontSize:'12px'}}>代币的影响力可以使你对文章的赏金有更大的控制权，并可以获得投票奖励。
                    <br/> </div>
                </div>
                {
                    routerUserName==userName?  
                    <div>
                        <div style={{cursor:'pointer', color:'#ff605f'}}>
                            {gameStar_power}
                        </div>
                    </div> 
                    : <div style={{cursor:'pointer', color:'#ff605f'}}>
                            {gameStar_power}
                        </div>
                } 
              </UserWallet__balance>
        <TransferToAccountModal
                {...{userName,balance,gbd_balance,isLogin}} 
                needTransfer={this.state.needTransfer}
                cancle={()=>this.setState({needTransfer:false})}
        />
     </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {...state.walet.userState,...state.users.loginUserMeta}
}
export default connect(mapStateToProps)(Balance) 