import React from 'react'
import { Input, Select,Form, Button, notification} from 'antd';
import {connect} from 'dva'
const Option = Select.Option;
const FormItem = Form.Item;
class TransferInput extends React.Component{
    state={
        isforbidden:false,
        values:{}
    }
    componentDidMount(){
        this.props.form.setFieldsValue({
            from:this.props.userName,
            memo:''
        });
    }
    // 数据获取和检查
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            values.amount=`${Number(values.amount).toFixed(3)} GB`
            this.props.Transfer(values)
                .then(res=>{
                    this.props.onCancel()
                })
                .catch(err=>{
                    const openNotification = () => {
                        notification.open({
                        message: '转账',
                        description: '转账失败',
                        });
                    }
                    openNotification()
                })
          }
        });
    }
    // 点击余额操作
    setAccountValue = () =>{
        const gbcNum=this.props.balance.split(' ')[0]
        this.props.form.setFieldsValue({
            amount:gbcNum
        });
    }  
    //验证转账数量是否足够
    validateCount(rule, value, callback){
        const Maxgbc=this.props.balance.split(' ')[0]
        if((Maxgbc-value)<0){
            callback('余额不足')
        }else{
            callback()
        }
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <Form onSubmit={this.handleSubmit} className="login-form">
                 <FormItem>
                {getFieldDecorator('from', {
                    rules: [{ required: true, message: '请输入要转入的账户' }],
                })(
                    <Input disabled addonBefore="转账人"  />
                )}
                </FormItem>
                <FormItem>
                {getFieldDecorator('to', {
                    rules: [{ required: true, message: '请输入要转入的账户' }],
                })(
                    <Input addonBefore="收款人"  autoComplete="off" placeholder="收款账号" />
                )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('amount', {
                    rules: [{ required: true,type:'number' ,validator:(rule, value, callback)=>this.validateCount(rule, value, callback) }],
                })(
                    <Input addonBefore='金额'  type='number' addonAfter="GB" placeholder='数量'/>
                )}
                <p style={{paddingLeft:"40px"}}>
                  <Button style={{border:'0'}} onClick={this.setAccountValue}  size={'small'}>余额</Button>
                </p>
                </FormItem>
                <FormItem>
                    {getFieldDecorator('memo', {
                    rules: [{ required: false, message: '' }],
                })(
                    <Input addonBefore="备注" placeholder='备注' />
                )}
                </FormItem>
                <FormItem>
                 <Button 
                    htmlType="submit"
                    style={{background:"#ff605f",borderColor:"#ff605f"}}   
                    type="primary"
                    >
                        确认
                    </Button>
                </FormItem>
          </Form>
        )
    }
}
const WrappedNormalLoginForm = Form.create()(TransferInput);
const mapStateToProps = (state) => {
    return { ...state.users }
}
const mapDispatchToProps = (dispatch) => {
    return {
        Transfer: (payload) => {
            return new Promise((resolve,reject)=>{
                dispatch({
                    type:'walet/Transfer',
                    payload:Object.values(payload)
                })
                .then(res=>{
                    resolve()
                })
                .catch(err=>{
                    reject(err)
                })
            })
        }
    }
}
export default  connect(mapStateToProps,mapDispatchToProps)(WrappedNormalLoginForm)