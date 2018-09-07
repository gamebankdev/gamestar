import React from 'react'
import E from 'wangeditor'
import { Button,message } from 'antd';


import styled from 'styled-components'
const Post_menu  = styled.div`
    width:100% ;
    display:flex;
    justify-content:flex-end;
    align-items:center;
    padding:20px 0 30px 0;
`
const EditorArea = styled.div`
    width:100%;
    border:1px solid #b9b9b9;
    height: 88px;
    border-radius:5px;
`
const Post_posts_comment =  styled.button`
    width: 120px;
    height: 40px;
    border:0;
    cursor:pointer;
    background-color:#ff605f;
    border-radius:5px;
    font-family:'SimHei';
    font-size:18px;
    color:#fff;
`
const Post_comment_comment= styled.button`
     width: 120px;
    height: 40px;
    border:0;
    cursor:pointer;
    background-color:#6fafe5;
    border-radius:5px;
    font-family:'SimHei';
    font-size:18px;
    color:#fff;
`
class WangEditor extends React.Component{
    constructor(){
        super()
    }
    componentDidMount(){
        const {id}=this.props;
        this.editor = new E(`#toolbar${id}`,`#EditorArea${id}`)  
        this.editor.customConfig.onchangeTimeout = 1000
        this.editor.customConfig.menus = [
            'emoticon',  // 表情
            'image',  // 插入图片
        ]
        this.editor.customConfig.uploadImgServer = `http://47.94.21.121:4000/v1/${this.props.userName}/uoload`
        this.editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024
        this.editor.customConfig.uploadImgMaxLength = 1
        this.editor.customConfig.uploadFileName = 'file'
        this.editor.create()
    }
    postComment(){
      const htmlCotent = this.editor.txt.html()   
      const txtCotent = this.editor.txt.text() 
        if(txtCotent){
            const Initialcontent = this.props.Initialcontent
            let willPrependContent;
            if(Initialcontent){
                willPrependContent = `<p>${Initialcontent}:</p>${htmlCotent}`
            }else{
                willPrependContent = htmlCotent
            }
            this.props.postComemnt(willPrependContent,this.props.permlink);
            this.editor.txt.clear()
        }else{
            message.warning('请输入评论内容');
        }
    }
    render(){
        const {id,replay}=this.props;
        return[
            <EditorArea key={1} id={`EditorArea${id}`} className="text" placeholder="1"></EditorArea>,

            <Post_menu key={2}>

                <div id={`toolbar${id}`} className="toolbar">
                </div>
                {
                    replay=='posts'? <Post_posts_comment onClick={()=>this.postComment()}>发布</Post_posts_comment>
                    : <Post_comment_comment onClick={()=>this.postComment()}>发布</Post_comment_comment>
                }
            </Post_menu>          
        ]
    }
}
export default WangEditor
