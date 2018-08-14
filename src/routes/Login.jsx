import React,{Component} from 'react'
import styled from 'styled-components'
import backImg  from '../assets/cluster_bg_2.png'
import Topic from '../components/Topic'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { connect } from 'dva';

const FormItem = Form.Item;

const Container = styled.div`
    width:100%;
    min-height:815px;
    background: #1b2838 url(${backImg}) no-repeat fixed center;
`
const Rightcol= styled.div`
    width:30%;
    padding-left:20px;
    padding-top:16px;
    background-color:rgba(0,0,0,0.2);
    color:#c6d4df;
    font-size:12px;
    line-height:24px;
`
const Leftcol = styled.div`
        width:calc(68% - 1px);
        background-color:rgba(0,0,0,0.2);
        display:flex;
        justify-content:space-between;
        padding-top:20px;
        color:#c6d4df;
        font-size:12px;
`
const Loginbox_left =  styled.div`
    width: 50%;
    padding-left:20px;
    padding-right:20px;
`
const Loginbox_Right = styled.div`
    width: 50%;
    padding-left:20px;
    padding-right:20px;
    box-sizing:border-box;
    font-size:12px;
`
class Login extends Component{
    constructor(props){
        super(props)
        this.state={
            loading:false
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
                this.props.dispatchLogin(values)
          }
        });
      }
    render(){
        const { getFieldDecorator } = this.props.form;

    return (
        <Container>
            <div style={{width:960,margin:'0 auto',paddingTop:50}}>
              <Topic />
              <div style={{display:'flex',justifyContent:'space-between',marginTop:'30px'}}>
                  <Leftcol>
                      <Loginbox_left>
                          <h2 style={{color:'#ffffff'}}>登陆</h2>
                          <p>到现有的 gameBank 帐户</p>
                          <Form onSubmit={this.handleSubmit} className="login-form" >
                            <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: 'Please input your username!'}],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="gameBank 帐户名称" />
                            )}
                            </FormItem>
                            <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                            )}
                            </FormItem>
                            <FormItem>
                            <Button loading={this.state.loading}  htmlType="submit" style={{background:' rgba( 103, 193, 245, 0.2 )',border:'none'}}>
                                登  录
                            </Button>
                            </FormItem>
                        </Form>
                    </Loginbox_left>
                      <div style={{width:1,background:'#264959',height:210}}></div>
                      <Loginbox_Right>
                          <h2 style={{color:'#ffffff'}}>创建</h2>
                          <p>一个新的免费帐户</p>
                          <p>
							欢迎免费加入及轻松使用。继续创建 gameBank 帐户并获取 gameBank - 适合 PC 和 Mac 玩家的前沿数字解决方案。						</p>
                            <Button  style={{background:' rgba( 103, 193, 245, 0.2 )',border:'none'}} >
                                加入gameStar
                            </Button>
                      </Loginbox_Right>
                  </Leftcol>
                  <Rightcol>
                    <h2 style={{color:'#67c1f5'}}>为什么加入 gameStar</h2>
                    <ul>
                        <li>购买和下载完整零售游戏</li>
                        <li>加入 gameStar 社区</li>
                        <li>游戏时与好友聊天</li>
                        <li>在任何电脑上都能玩</li>
                        <li>安排游戏、比赛或 LAN 聚会</li>
                        <li>获取自动游戏更新以及更多！</li>
                    </ul>
                  </Rightcol>
              </div>
            </div>
        </Container>
    )
    }
}
const WrappedNormalLoginForm = Form.create()(Login);
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatchLogin: (params) => {
            dispatch({type:'users/fetchLogin',payload:params})
        }
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        prop: state.users
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(WrappedNormalLoginForm)