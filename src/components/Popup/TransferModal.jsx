import { Modal, Button } from 'antd';
import React from 'react'
import TransferToAccount from '../Transfer/TransferToAccount'
import PowerUp from './poweUp'
class TransferModal extends React.Component{
    handleCancel = (e) => {
       this.props.cancle()
    }
    render(){
        
        return(
            <div>
                <Modal
                    title={this.props.titile}
                    visible={this.props.needTransfer}
                    onCancel={this.handleCancel}
                    footer={null}
                    >
                  {this.props.children}
                  {
                      this.props.type=='powerUp'||this.props.type=='powerDown'
                      ?<PowerUp {...this.props} onCancel={this.handleCancel} />
                      :<TransferToAccount {...this.props} onCancel={this.handleCancel} />
                  }
                </Modal>
          </div>
        )
    }
}
export default TransferModal