import { Modal, Button } from 'antd';
import React from 'react'
import TransferToAccount from '../Transfer/TransferToAccount'

class TransferModal extends React.Component{
    handleOk = (e) => {
        this.setState({
            needTransfer: false,
        });
    }
    handleCancel = (e) => {
       this.props.cancle()
      }
    render(){
        return(
            <div>
                <Modal
                    title="将资金转移给另一个gameStar的用户"
                    visible={this.props.needTransfer}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                    >
                    <TransferToAccount {...this.props} onCancel={this.handleCancel} />
                </Modal>
          </div>
        )
    }
}
export default TransferModal