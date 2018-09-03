import styled from 'styled-components'
import {Link} from  'dva/router'
import {connect} from 'dva'

const HaderContainer=styled.div`
    width:100%;
    height: 100px;
    background-color:#ff605f;
    margin:0 auto;
`
const HeadContent = styled.div`
    width: 980px;
    margin:0 auto;
    height: 100%;
    display:flex;
    justify-content:space-between;
`
const HeadLog = styled.div`
    width: 200px;
    height: 100%;
    font-size:36px;
    font-family:'Microsoft YaHei';
    text-align:center;
    background-color:#fedad9;
    a{
        color:#ff605f;
        text-decoration:none;
    }
`
const Login_register = styled.div`
    height:50px;
    margin-top:50px;
    border-top-left-radius:5px;
    border-top-right-radius:5px;
    background-color:#db4643;
    text-align:center;
    line-height:50px;
    padding:0 10px;
    box-sizing:border-box;
    font-size:16px;
    color: #fff;
    font-family:'SimHei';
    span:nth-child(1){
        cursor:pointer;
    }
    span:nth-child(2){
        border:1px solid #fff;
        margin-left:18px;
        margin-right:18px;
    }
    span:nth-child(3){
        cursor:pointer;
    }
    a{
        text-decoration:none;
        border:none;
    }
`
const Header=({isLogin,userName,dispatch})=>{
    return(
        <HaderContainer>
            <HeadContent>
                <HeadLog>
                    <Link to="/" replace>
                     <span>GameStar</span>
                    </Link>
                </HeadLog>
                {
                    !isLogin? 
                    <Login_register>
                        <span>
                        <Link to="/login">登录</Link>   
                        </span>
                        <span></span>
                        <span>
                        <a target="__blank " href="http://www.gbank.pro:3000">注册</a>   
                        </span>
                    </Login_register>:
                    <Login_register>
                        <Link to={`/users/${userName}/posts`}>
                            <span>
                            欢迎您{userName}
                            </span>
                        </Link>
                        <span></span>
                        <span onClick={()=>{
                            dispatch({
                                type:"users/clearlocalstor"
                             })
                            }}>
                         退出
                        </span>
                    </Login_register>
                }
            </HeadContent>
           
        </HaderContainer>
    )
}
const mapStateToProps = (state) => {
    return {...state.users.loginUserMeta}
}
export default connect(mapStateToProps)(Header) 