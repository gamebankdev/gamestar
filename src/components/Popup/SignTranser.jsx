import { Modal, Button ,Form,Input,Icon} from 'antd';
import React from 'react'
import {connect} from 'dva'
const FormItem = Form.Item;
function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class SignTranser   extends React.Component{
    state = { visible: true }
    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.setFieldsValue({
            userName:this.props.userName
        });
        this.props.form.validateFields();

    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
                this.props.Signtrans(values)
          }
        });
    }
    showModal = () => {
        this.setState({
        visible: true,
        });
    }
    handleOk = (e) => {
        this.setState({
          visible: false,
        });
      }
    handleCancel = (e) => {
        this.setState({
          visible: false,
        });
      }
    render(){
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const userNameError = isFieldTouched('userName') && getFieldError('userName');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        return(
            <div>
                <Modal
                    title="签名"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                    >
                    <Form layout="vertical" onSubmit={this.handleSubmit}>
                        <FormItem
                        validateStatus={userNameError ? 'error' : ''}
                        help={userNameError || ''}
                        >
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input disabled prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                        )}
                        </FormItem>
                        <FormItem
                        validateStatus={passwordError ? 'error' : ''}
                        help={passwordError || ''}
                        >
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                        )}
                        </FormItem>
                        <p>此操作需要您的Active或者主密码</p>
                        <FormItem>
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={hasErrors(getFieldsError())}
                        >
                        登陆
                        </Button>
                        </FormItem>
                    </Form>
                </Modal>
          </div>
        )
    }
}
const WrappedHorizontalLoginForm = Form.create()(SignTranser);
const mapStateToProps = (state, ownProps) => {
    return {...state.users.loginUserMeta}
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        Signtrans:(payload) => {
            dispatch({
                type:'users/Signtrans',
                payload
            })
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(WrappedHorizontalLoginForm) 