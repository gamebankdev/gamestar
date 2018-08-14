import React from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import {connect} from 'dva'
const FormItem = Form.Item;

class Repass extends React.Component{
    constructor(props){
        super(props)
        this.state={
            SuggestedPassword:false
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
                this.props.changePassword(values)
          }
        });
      }
      CreateSuggestedPassword(){
          this.setState({
            SuggestedPassword:true
          },()=>{
              this.props.CreateSuggestedPassword()
          })
      }
      validate(rule, value, callback){
        if(value!==this.props.SuggestedPassword && value!==''){
            callback('密码不匹配')
        }else{
            callback()
        }
      }
    render(){

        const {SuggestedPassword,userName} =this.props
        const { getFieldDecorator } = this.props.form;
        return(
            <div>
                <h1>重置{userName}的密码</h1>
                <p style={{color:'#808891',fontSize:'16px'}}>
                GameBank的第一条规则是: 不要丢失你的密码。
                <br/>
                GameBank的第二条规则是: 不要丢失你的密码。
                <br/>
                GameBank的第三条规则是: 我们无法恢复你的密码。
                <br/>
                第四条规则是: 如果你能记住密码，那就不安全了。
                <br/>
                第五条规则是: 只能使用随机生成的密码。
                <br/>
                第六条规则是: 请不要把你的密码告诉任何人。
                <br/>
                第七条规则是: 始终备份你的密码。
                </p>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem>
                      <Input disabled prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    </FormItem>
                    <FormItem>
                    {getFieldDecorator('wif', {
                        rules: [{ required: true, message: '当前密码' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="当前密码" />
                    )}
                    </FormItem>
                    {
                        !this.state.SuggestedPassword?
                          <FormItem>
                            <Button onClick={()=>this.CreateSuggestedPassword()} type="primary">生成密码</Button>
                           </FormItem>:
                          <FormItem>
                                <Input readOnly value={SuggestedPassword} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" />
                          </FormItem>
                    }
                    <FormItem>
                    {getFieldDecorator('aginSuggestedPassword', {
                        rules: [{ required: true, message: '密码不匹配' ,validator:(rule, value, callback)=>{this.validate(rule, value, callback)} }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="重新输入生成的密码
                        " />
                    )}
                    </FormItem>
                    <FormItem>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        修改密码
                    </Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}
const WrappedNormalLoginForm = Form.create()(Repass);
const mapStateToProps = (state, ownProps) => {
    return {...state.users}
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        CreateSuggestedPassword: () => {
            dispatch({
                type:'users/CreateSuggestedPassword'
            })
        },
        changePassword:(value)=>{
            dispatch({
                type:'users/changePassword',
                payload:value
            })
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(WrappedNormalLoginForm) 