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
        console.log('props',this.props)
        const GBCoinMenu = (
            <Menu>
              <Menu.Item key="0">
                <span onClick={()=>this.setState({ needTransfer:true})}>转账</span>
              </Menu.Item>
              {/* <Menu.Item key="1">
                <span>转移到储蓄</span>
              </Menu.Item> */}
              {/* <Menu.Item key="2">
                <span>Power Up</span>
              </Menu.Item> */}
            </Menu>
          );
        const GBPower =(
            <Menu>
              <Menu.Item key="0">
                <a href="http://www.alipay.com/">Power down</a>
              </Menu.Item>
            </Menu>
        )
        const GBDollar=(
            <Menu>
                <Menu.Item key="0">
                <a href="http://www.alipay.com/">转账</a>
                </Menu.Item>
                {/* <Menu.Item key="0">
                <a href="http://www.alipay.com/">转移到储蓄</a>
                </Menu.Item> */}
          </Menu>
        )
        const SaveGBCMenu= (
            <Menu>
                <Menu.Item key="0">
                <a href="http://www.alipay.com/">取出GBC</a>
                </Menu.Item>
          </Menu>
        )
        const SaveGBDollarMenu= (
            <Menu>
                <Menu.Item key="0">
                <a href="http://www.alipay.com/">取出GBDollar</a>
                </Menu.Item>
          </Menu>
        )
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
                    routerUserName==userName? <div>
                         {/* <div style={{cursor:'pointer', color:'#67c1f5'}}>
                           {balance} <Icon type="down" />
                        </div> */}
                    <Dropdown overlay={GBCoinMenu} trigger={['click']}>
                        <div style={{cursor:'pointer', color:'#67c1f5'}}>
                           {balance} <Icon type="down" />
                        </div>
                    </Dropdown>
                </div> :null
                }
            </UserWallet__balance>,
             <UserWallet__balance>
             <div style={{color:'#808891',fontSize:'17px'}}>
             GBP: GBPower
                 <div style={{fontSize:'12px'}}>代币的影响力可以使你对文章的赏金有更大的控制权，并可以获得投票奖励。
                 <br/> </div>
             </div>
             {
                routerUserName==userName?  
                  <div>
                       <div style={{cursor:'pointer', color:'#67c1f5'}}>
                        {gameStar_power} <Icon type="down" />
                      </div>
                    {/* <Dropdown overlay={GBPower} trigger={['click']}>
                      <div style={{cursor:'pointer', color:'#67c1f5'}}>
                        {gameStar_power} <Icon type="down" />
                      </div>
                   </Dropdown> */}
                 </div> 
               :null
             }
          
         </UserWallet__balance>,
        <UserWallet__balance>
          <div style={{color:'#808891',fontSize:'17px'}}>
          GBD:GBDollar
              <div style={{fontSize:'12px'}}>Tradeable tokens that may be transferred anywhere at anytime.</div>
          </div>
          {
            routerUserName==userName?
              <div>
                  <div style={{cursor:'pointer', color:'#67c1f5'}}>
                    {gbd_balance} <Icon type="down" />
                  </div>
                {/* <Dropdown overlay={GBDollar} trigger={['click']}>
                  <div style={{cursor:'pointer', color:'#67c1f5'}}>
                    {gbd_balance} <Icon type="down" />
                  </div>
                </Dropdown> */}
              </div> 
           :null
          }
          
      </UserWallet__balance>,
      {/* <UserWallet__balance>
         <div style={{color:'#808891',fontSize:'17px'}}>
         储蓄
             <div style={{fontSize:'12px'}}>余额取决于3天的提款等待期</div>
         </div>
         {
              routerUserName==userName?<div>
              <Dropdown overlay={SaveGBCMenu} trigger={['click']}>
                  <div style={{cursor:'pointer', color:'#67c1f5'}}>
                     {savings_balance} <Icon type="down" />
                  </div>
              </Dropdown>
              <Dropdown overlay={SaveGBDollarMenu} trigger={['click']}>
                  <div style={{cursor:'pointer', color:'#67c1f5'}}>
                     {savings_gbd_balance} <Icon type="down" />
                  </div>
              </Dropdown>
          </div> :null
         }
     </UserWallet__balance> */}
         <TransferToAccountModal
            {...{userName,balance,gbd_balance,isLogin}} 
            method={'GBC'} 
            needTransfer={this.state.needTransfer}
            cancle={()=>this.setState({needTransfer:false})}
           />
     </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {...state.walet.userState,...state.users}
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {}
}

export default connect(mapStateToProps,mapDispatchToProps)(Balance) 