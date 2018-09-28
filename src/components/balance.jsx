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
            needTransfer:false,
            ModalTitle:'转账',
            modalNote:'将资金转移给另一个用户。',
            type:'transfer'
        }
    }
    render(){
        const GBCoinMenu = (
            <Menu>
              <Menu.Item 
                key="0" 
                onClick={()=>this.setState({ 
                    needTransfer:true,
                    ModalTitle:'转账',
                    modalNote:'将资金转移给另一个用户。',
                    type:'transfer'
                })}>
                <span>转账</span>
              </Menu.Item>
              <Menu.Item 
                key="1" 
                onClick={()=>this.setState({ 
                    needTransfer:true,
                    ModalTitle:'转换成GBP',
                    modalNote:'GBP是不可转让的，需要3个月才可全部换回GB(需13次转换)',
                    type:'powerUp'
                })}>
                <span>power Up</span>
              </Menu.Item>
            </Menu>
          );
          const GBPoinMenu = (
            <Menu>
              <Menu.Item 
                key="0" 
                onClick={()=>this.setState({ 
                    needTransfer:true,
                    ModalTitle:'转换成GBC',
                    modalNote:'',
                    type:'powerDown'
                })}>
                <span>power Down</span>
              </Menu.Item>
            </Menu>
          );
        const {balance,gbd_balance,vesting_shares,userName} = this.props

        const routerUserName=this.props.match.params.userName
        return (
            <div>  
              <UserWallet__balance>
                    <div style={{color:'#808891',fontSize:'17px'}}>
                    GB: GBcoin
                        <div style={{fontSize:'12px'}}>可交易代币,也可以转换成GBP</div>
                    </div>
                    {
                      routerUserName!=userName
                      ?<div style={{cursor:'pointer', color:'#ff605f'}}>{balance}</div>
                      : <div>
                          <Dropdown overlay={GBCoinMenu} trigger={['click']}>
                            <div style={{cursor:'pointer', color:'#ff605f'}}>
                            {balance} <Icon type="down" />
                            </div>
                          </Dropdown>
                        </div>
                    }
              </UserWallet__balance>
             <UserWallet__balance>
                <div style={{color:'#808891',fontSize:'17px'}}>
                GBP: GBPower
                    <div style={{fontSize:'12px'}}>代币的影响力可以使你对文章的赏金有更大的控制权，并可以获得投票奖励。
                    <br/> </div>
                </div>
                {
                  routerUserName!=userName
                  ?<div style={{cursor:'pointer', color:'#ff605f'}}>{vesting_shares}</div>
                  : <div>
                    <Dropdown overlay={GBPoinMenu} trigger={['click']}>
                      <div style={{cursor:'pointer', color:'#ff605f'}}>
                        {vesting_shares} <Icon type="down" />
                      </div>
                    </Dropdown>
                    </div>
                } 
              </UserWallet__balance>
        <TransferToAccountModal
                {...{userName,balance,gbd_balance,vesting_shares}} 
                needTransfer={this.state.needTransfer}
                type={this.state.type}
                titile={this.state.ModalTitle}
                cancle={()=>this.setState({needTransfer:false})}
        >
        <p>{this.state.modalNote}</p>
        </TransferToAccountModal>
     </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {...state.walet.userState,...state.users.loginUserMeta}
}
export default connect(mapStateToProps)(Balance) 