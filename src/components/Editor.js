import React from "react";
import {Button, message, Input, Upload, Icon } from "antd";
import styled from "styled-components";


const { TextArea } = Input;

const Post_menu = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 20px 0 30px 0;
`;
const EditorArea = styled.div`
  width: 100%;
  border: 1px solid #b9b9b9;
  height: 88px;
  border-radius: 5px;
`;
const Post_posts_comment = styled.button`
  width: 120px;
  height: 40px;
  border: 0;
  cursor: pointer;
  background-color: #ff605f;
  border-radius: 5px;
  font-family: "SimHei";
  font-size: 18px;
  color: #fff;
`;
const Post_comment_comment = styled.button`
  width: 120px;
  height: 40px;
  border: 0;
  cursor: pointer;
  background-color: #6fafe5;
  border-radius: 5px;
  font-family: "SimHei";
  font-size: 18px;
  color: #fff;
`;


function beforeUpload(file) {
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return  isLt2M;
  }
  
class Editor extends React.Component {
  constructor() {
    super();
    this.state = {
      inputTextValue: "",
      uploading:false,
      imageUrl:[],
      post:false
    };
  }
  postComment() {
      const {permlink}=this.props
      const {inputTextValue,imageUrl}=this.state
      if(imageUrl.length==0 && !inputTextValue){
        return message.error('请输入您的看法!');
      }
     const content=`${inputTextValue}`
     this.props.postComemnt({content,permlink,image:imageUrl});
  }
  inputText = event => {
    this.setState({
      inputTextValue: event.target.value
    });
  };
  handleChange=(info)=>{
    if (info.file.status === 'uploading') {
        return this.setState({ uploading: true });
    }
    if (info.file.status === 'done') {
      const {data,success}=info.file.response
        if(success){
            this.setState({
                uploading:false,
                imageUrl:this.state.imageUrl.concat(data)
            })
        }
    }
  }
  remove=(event,index)=>{
      const {imageUrl}=this.state
      if(event.button==2){
        imageUrl.splice(index,1)
        this.setState({
            imageUrl:imageUrl
        })
      }
  }
  render() {
    const { id, replay } = this.props;
    const { inputTextValue ,imageUrl} = this.state;
    return (
      <div style={{ position:"relative"}}>
        <TextArea
          value={inputTextValue}
          style={{marginBottom:"20px"}}
          placeholder="来都来了，说两句吧!"
          onChange={this.inputText}
          autosize={{ minRows: 3, maxRows: 6 }}
        />
            {
                imageUrl.map((item,index)=>{
                   return (
                       <span>
                         <img 
                           key={index} 
                           title="右键移除该图片"
                           onMouseDown={(event)=>this.remove(event,index)}
                           style={{maxWidth:"100%",maxHeight:"200px"}} 
                           src={item} alt=""/>
                       </span>
                   )
                })
            }
        <div>
        {
                imageUrl.length>0?<span>提示:右键图片删除</span>:null
        }
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "20px 0",
           
          }}
        >
          <Upload 
            showUploadList={false}
            listType='picture'
            beforeUpload={beforeUpload}
            action={`http://47.94.21.121:4000/v1/${this.props.permlink}/uoload`}
            onChange={this.handleChange}
            accept="image/*" 
            style={{ margin: "0 10px", height: "40px" }}>
              <img src={require("../assets/pic.png")} alt="" />
          </Upload>
          <Post_posts_comment onClick={() => this.postComment()}>
            发布
          </Post_posts_comment>
        </div>
      </div>
    );
  }
}
export default Editor;
