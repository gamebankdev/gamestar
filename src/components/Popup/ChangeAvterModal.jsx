import React from 'react'
import {Modal,Button,message,Upload,Icon} from 'antd';
import styled from 'styled-components';
import Cropper from 'cropperjs'
import {connect} from 'dva'
import gameBank from '../../utils/gameBank'

const PreviewContainer = styled.div`
    width:120px;
    height:120px;
    background-color:#f0f0f0;
`
const ChoseImgContainer= styled.div`
    width:288px;
    height:252px;
    background:#f0f0f0;
    div{
        width:100% !important;
        height:100% !important;
    }
`
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
class ChangeAvterModal extends React.Component{
    state = {
        loading: false,
        imageUrl:null,
        uploadDoneUrl:null
      };
    
    handleChange = (info) => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, imageUrl => this.setState({
            imageUrl,
            loading: false,
          }));
        }
        if(info.file.status === 'error'){
            getBase64(info.file.originFileObj, imageUrl => this.setState({
                imageUrl,
                loading: false,
              }));
        }
    }
    beforeUploadAvter=(file)=>{
        const isJPG = (file.type === 'image/png' || file.type === 'image/jpeg');
        if (!isJPG) {
            message.error('支持png,jpg格式的图片文件!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('文件大小小于2M!');
        }
        return isJPG && isLt2M;

    }    
    handleChange = (info) => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          message.success('图片上传成功!');
          getBase64(info.file.originFileObj, imageUrl => this.setState({
            imageUrl,
            uploadDoneUrl:info.file.response.data[0],
            loading: false,
          }));
        }
      }
    handleUpload=()=>{
        const {userName,memo_key}=this.props
        this.props.dispatch({
            type:"users/changeAvter",
            payload:[userName,undefined,undefined,undefined,memo_key,{
                profile:{
                    profile_image:this.state.uploadDoneUrl
                }
            }] 
        })
    }
    render(){
        const imageUrl = this.state.imageUrl;
        return(
             <Modal
                title="Basic Modal"
                style={{padding:0}}
                width={560}
                footer={null}
                onCancel={this.props.cancel}
                visible={this.props.visible}
                title='修改头像'
                >
                <div style={{padding:'0 30px'}}>
                    <div style={{textAlign:"center",padding:"0 0 30px 0"}}>
                      <span>支持png,jpg格式的图片文件，文件大小小于2M</span>
                    </div>
                    <div style={{display:"flex",justifyContent:"space-around",alignItems:"center"}}>
                        <ChoseImgContainer>
                            <Upload
                                name="file"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action={`http://www.gbank.pro:4000/v1/avter/uoload`}
                                beforeUpload={this.beforeUploadAvter}
                                onChange={this.handleChange}
                            >
                            {imageUrl ? <img style={{maxWidth:"100%",maxHeight:"100%"}} src={imageUrl} alt="avatar" /> : <img src={require('../../assets/personavter.png')} alt=""/>}
                            </Upload>
                        </ChoseImgContainer>
                    </div>
                    <div style={{display:"flex",justifyContent:"space-around",marginTop:"20px"}}>
                     <Button 
                       style={{backgroundColor:"#ff6160",border:"0",color:"#fff"}}
                       disabled={this.state.uploadDoneUrl==null?true:false}
                       onClick={this.handleUpload}
                       >确定</Button>
                     <Button onClick={this.props.cancel}>取消</Button>
                    </div>
                </div>
            </Modal>
        )
    }
}

export default connect(state=>{
    return {
        ...state.users.loginUserMeta
    }
})(ChangeAvterModal) 

