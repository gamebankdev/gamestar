import React,{Component} from 'react'
import styled from 'styled-components'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { connect } from 'dva';

const FormItem = Form.Item;

const Container = styled.div`
    width:100%;
    height: calc(100% - 280px);
    background:#fff;
`
const Login_Container_content= styled.div`
    width: 980px;
    height:100% ;
    padding-top:30px;
    box-sizing:border-box;
    background:#f8f8f8;
    margin:0 auto;
`
const Login_title = styled.h1`
    color:#f85352;
    width:980px;
    margin:0 auto;
    padding:20px 0;
    box-sizing:border-box;
`
const Login_form= styled.div`
    width:400px ;
    margin:0 auto;
`
const formItemLayout = {
    labelCol: {
      xs: { span: 6 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 6 },
      sm: { span: 16 },
    },
  };

class Login extends Component{
    constructor(props){
        super(props)
        this.state={
            loading:false
        }
    }
    checkUserName=(rule, value, callback)=>{
        this.props.checkuser(value)
        callback()
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
        const { getFieldDecorator,setFields } = this.props.form;
        return (
        <Container>
            <Login_title>登陆</Login_title>
            <Login_Container_content>
            <Login_form>
                <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem
                  label="用户名:"
                  {...formItemLayout}
                >
                    {getFieldDecorator('userName', {
                        validateTrigger:'onBlur',
                        rules: [{ required: true, message: '请输入用户名!',validator:this.checkUserName}],
                    })(
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="gameBank 帐户名称" />
                        )}
                </FormItem>
                <FormItem
                  label="密码:"
                  {...formItemLayout}
                >
                {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码!' }],
                        })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入posting或主密码" />
                        )}
                </FormItem>
                <br/>
                <FormItem
                label=" "
                colon={false}
                {...formItemLayout}
                >
                    <Button 
                      style={{
                          width:"100%",
                          height:"60px",
                          lineHeight:"60px",
                          borderRadius:"5px",
                          background:"#f85352",
                          color:"#fff",
                          fontSize:"30px"
                        }}
                    loading={this.state.loading} 
                    htmlType="submit">
                         登  录
                    </Button>
                </FormItem>
                </Form>
            </Login_form>
           
            </Login_Container_content>
        </Container>
    )
    }
}
const WrappedNormalLoginForm = Form.create()(Login);
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatchLogin: (params) => {
            dispatch({type:'users/fetchLogin',payload:params})
        },
        checkuser:(userName)=>{
            dispatch({
                type:"users/checkUserName",
                userName
            })
        }
    }
}
const mapStateToProps = (state, ownProps) => {
    return {...state.users}
}
export default connect(mapStateToProps,mapDispatchToProps)(WrappedNormalLoginForm)