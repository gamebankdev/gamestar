import React from 'react'
import { Input, Select,Form, Button, notification} from 'antd';
import {connect} from 'dva'
const Option = Select.Option;
const FormItem = Form.Item;
class TransferInput extends React.Component{
    state={
        method:'GBC',
        isforbidden:false,
        values:{}
    }
    componentDidMount(){
        this.setState({
            method:this.props.method
        })
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
            values.amount=`${Number(values.amount).toFixed(3)} ${this.state.method}`
            this.setState({
                isforbidden:true,
                values
            })
          }
        });
    }
    // 点击余额操作
    setAccountValue = () =>{
        const gameStarnum=this.props.balance.split(' ')[0]
        const sbdNum = this.props.gbd_balance.split(' ')[0]
        this.props.form.setFieldsValue({
            amount: this.state.method=='GBC'?gameStarnum:sbdNum
        });
    }  
    //验证转账数量是否足够
    validateCount(rule, value, callback){
        const gameStarnum=this.props.balance.split(' ')[0]
        const sbdNum = this.props.gbd_balance.split(' ')[0]
        if(!value || value==0){
            callback('请输入转账数量')
        }
        else if(this.state.method=='GBC'&& Number(gameStarnum)<Number(value)){
            callback('可用余额不足1')
        }else if(this.state.method=='GBD'&&sbdNum<value){
            callback('可用余额不足')
        }else{
            callback()
        }
    }
    // 返回上一步
    returnStep=()=>{
        this.setState({
            isforbidden:false
        })
    }
    // 转账发起
    Transfer=()=>{    
        this.props.Transfer(this.state.values)
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
    render(){
        const { getFieldDecorator,  } = this.props.form;
        const {method,isforbidden}=this.state
        const selectAfter = (
            <Select defaultValue={method} style={{ width: 80 }}>
              <Option value="GBC" onClick={()=>this.setState({method:'GBC'})}>GBC</Option>
              {/* <Option value="GBD" onClick={()=>this.setState({method:'GBD'})}>GBD</Option> */}
            </Select>
        );
        return(
            <Form onSubmit={this.handleSubmit} className="login-form">
                 <FormItem>
                {getFieldDecorator('from', {
                    rules: [{ required: true, message: '请输入要转入的账户' }],
                })(
                    <Input addonBefore="从 " disabled />
                )}
                </FormItem>
                <FormItem>
                {getFieldDecorator('to', {
                    rules: [{ required: true, message: '请输入要转入的账户' }],
                })(
                    <Input addonBefore="到 " disabled={isforbidden} />
                )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('amount', {
                    rules: [{ required: true,type:'number' ,validator:(rule, value, callback)=>this.validateCount(rule, value, callback) }],
                })(
                    <Input addonBefore='数'  disabled={isforbidden} type='number' addonAfter={selectAfter} placeholder='数量'/>
                )}
                 <p style={{paddingLeft:"40px"}}>
                          <Button style={{border:'0'}} onClick={this.setAccountValue}  size={'small'}>余额</Button>
                        </p>
                </FormItem>
                <FormItem>
                    {getFieldDecorator('memo', {
                    rules: [{ required: false, message: '' }],
                })(
                    <Input addonBefore="备注"  disabled={isforbidden} placeholder='备注' />
                )}
                </FormItem>
                {
                    !isforbidden? <Button htmlType="submit" className="login-form-button">
                        下一步
                 </Button>:null
                }
                {
                    isforbidden?<div>
                        <Button onClick={this.Transfer}   type="primary">
                            确认
                         </Button>
                        <Button onClick={this.returnStep} style={{marginLeft:'20px'}} type="dashed" htmlType="submit" className="login-form-button">
                        返回
                    </Button>
                    </div>
                  :null
                }
          </Form>
        )
    }
}
const WrappedNormalLoginForm = Form.create()(TransferInput);
const mapStateToProps = (state, ownProps) => {
    return { ...state.users }
}
const mapDispatchToProps = (dispatch, ownProps) => {
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