import React from 'react'
import { Input, Select,Form, Button, notification} from 'antd';
import {connect} from 'dva'
const Option = Select.Option;
const FormItem = Form.Item;
class PowerUp extends React.Component{
    state={
        isforbidden:false,
        values:{},
        requestIng:false
    }
    componentDidMount(){
        this.props.form.setFieldsValue({
            from:this.props.userName
        });
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.requestPowerUp=='success'){
            this.props.cancle()
            this.setState({
                requestIng:false
            })
        }
    }
    // 数据获取和检查
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            this.props.type=='powerUp'
              ?values.amount=`${Number(values.amount).toFixed(3)} GB`
              :values.amount=`${Number(values.amount).toFixed(6)} GBP`
            values.to=this.props.userName
            if(this.props.type=='powerUp'){
                this.props.powerUp(values)
            }else{
                this.props.powerDown(values)
            }
          }
        });
    }
    // 点击余额操作
    setAccountValue = () =>{
        const gbcNum=this.props.balance.split(' ')[0]
        const gbpNum=this.props.vesting_shares.split(' ')[0]
        this.props.type=='powerUp'
        ?this.props.form.setFieldsValue({
            amount:gbcNum
        })
        :this.props.form.setFieldsValue({
            amount:gbpNum
        })
    }  
    //验证转账数量是否足够
    validateCount(rule, value, callback){
        const Maxgbc=this.props.balance.split(' ')[0]
        const MaxGbp=this.props.vesting_shares.split(' ')[0]
        if((Maxgbc-value)<0 &&this.props.type=='powerUp'){
            callback('余额不足')
        }else if((MaxGbp-value)<0 &&this.props.type=='powerDown'){
            callback('余额不足')
        }else{
            callback()
        }
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const {requestPowerUp,type} =this.props
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
                    {getFieldDecorator('amount', {
                    rules: [{ required: true,type:'number' ,validator:(rule, value, callback)=>this.validateCount(rule, value, callback) }],
                })(
                    <Input addonBefore='金额'  type='number' addonAfter={type=='powerUp'?'GB':'GBP'} placeholder='数量'/>
                )}
                <p style={{paddingLeft:"40px"}}>
                  <Button style={{border:'0'}} onClick={this.setAccountValue}  size={'small'}>余额</Button>
                </p>
                </FormItem>
                <FormItem>
                 <Button 
                    htmlType="submit"
                    loading={requestPowerUp=='ing'}
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
const WrappedNormalLoginForm = Form.create()(PowerUp);

const mapStateToProps = (state, ownProps) => {
    return { 
        ...state.users,
        requestPowerUp:state.walet.requestPowerUp
     }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        powerUp: (payload) => {
            dispatch({
                type:'walet/powerUp',
                payload:[payload.from,payload.to,payload.amount]
            })
        },
        powerDown:(payload)=>{
            dispatch({
                type:'walet/WithdrawVesting',
                payload:[payload.from,payload.amount]
            })
        }
    }
}
export default  connect(mapStateToProps,mapDispatchToProps)(WrappedNormalLoginForm)