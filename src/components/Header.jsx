import styled from 'styled-components'
import {Link} from  'dva/router'
import { Menu, Dropdown, Icon ,Avatar } from 'antd';
import {connect} from 'dva'
const classification=[]
const HaderContainer=styled.div`
    width:940px;
    margin:0 auto;
    display:flex;
    justify-content:space-between;
    color: #fff;
    font-size:14px;
`
const Class=styled.div`
    display:flex;
    justify-content:space-between;
    span{
        padding:0 20px;
        cursor:pointer
    };
`
const Header=({isLogin,userName})=>{
    const menu = (
        <Menu>
          <Menu.Item key="0">
          <Link to={`/${userName}/posting`}>动态</Link>
          </Menu.Item>
          <Menu.Item key="1">
          <Link to={`/${userName}/leaveMessage`}>留言</Link>
          </Menu.Item>
          {/* <Menu.Item key="3">
            <a href="http://www.taobao.com/">关注</a>
          </Menu.Item> */}
          <Menu.Item key="4">
            <Link to={`/${userName}/walet`}>钱包</Link>
          </Menu.Item>
          {/* <Menu.Item key="5">
            <a href="http://www.taobao.com/">夜间</a>
          </Menu.Item> */}
          <Menu.Item key="6">
            <Link to={`/${userName}/walet/rePass`}>修改密码</Link>
          </Menu.Item>
          {/* <Menu.Item key="7">
            <a href="http://www.taobao.com/">设置</a>
          </Menu.Item> */}
          <Menu.Item key="8">
            <div onClick={()=>{
                 window.localStorage.clear()
                 window.location.href='/'
            }}>退出</div>
          </Menu.Item>
        </Menu>
    );
    return(
        <div>
            <HaderContainer>
                <div>
                     <Link to="/" replace style={{color:'#fff',fontSize:'26px',border:'0',textDecoration:'none'}}>
                       GameStar
                     </Link>
                </div>
                <div>
                    <Class>
                        {classification.map((item,index)=>{
                            return <span key={index}>{item}</span>   
                        })}
                    </Class>
                </div>
                {
                    isLogin? <div style={{display:'flex',justifyContent:'flex-end'}}>
                    <Dropdown overlay={menu} trigger={['click']} placement={'bottomRight'}>
                        <a className="ant-dropdown-link" href="#">
                        <Avatar icon="user" /><Icon type="down" />
                        </a>
                    </Dropdown>
                    </div>:
                    <div style={{display:'flex',justifyContent:'flex-end'}}>
                        <Link  to='/login' style={{cursor:'pointer',color:'#fff'}}>登陆</Link>
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <a href="http://192.168.1.101:3000"  style={{cursor:'pointer',color:'#fff'}}>注册</a>
                    </div>
                }
            </HaderContainer>
           
        </div>
    )
}
const mapStateToProps = (state, ownProps) => {
    return {...state.users}
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatch1: () => {
            dispatch()
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Header) 