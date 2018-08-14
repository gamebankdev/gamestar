import React from 'react'
import E from 'wangeditor'
import { Button,message } from 'antd';
class WangEditor extends React.Component{
    constructor(){
        super()
    }
    componentDidMount(){
        this.editor = new E(`#div${this.props.id}1`, `#div${this.props.id}2`)  
        this.editor.customConfig.onchangeTimeout = 1000
        this.editor.customConfig.menus = [
            'head',  // 标题
            'bold',  // 粗体
            'fontSize',  // 字号
            'fontName',  // 字体
            'italic',  // 斜体
            'underline',  // 下划线
            'strikeThrough',  // 删除线
            // 'foreColor',  // 文字颜色
            // 'backColor',  // 背景颜色
            'link',  // 插入链接
            'list',  // 列表
            'justify',  // 对齐方式
            'quote',  // 引用
            'emoticon',  // 表情
            'image',  // 插入图片
            'table',  // 表格
            // 'video',  // 插入视频
            'code',  // 插入代码
            'undo',  // 撤销
            'redo'  // 重复
        ]
        this.editor.customConfig.uploadImgServer = `http://127.0.0.1:4000/v1/${this.props.userName}/uoload`
        this.editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024
        this.editor.customConfig.uploadImgMaxLength = 1
        this.editor.customConfig.uploadFileName = 'file'
        this.editor.create()
    }
    postComment(){
      const htmlCotent = this.editor.txt.html()   
      const txtCotent = this.editor.txt.text()   
        if(txtCotent){
            this.props.postComemnt(htmlCotent)
        }else{
            message.warning('请输入评论内容');
        }
    }
    render(){
        const {show}=this.props;
        return(
            <div id={this.props.id}>
                <div id={`div${this.props.id}1`} className="toolbar">
                </div>
                <div id={`div${this.props.id}2`} className="text" style={{color:'#fff'}}></div>
                <Button type="primary"  size='small' onClick={()=>this.postComment()}>发布</Button>
                <Button size='small' onClick={()=>this.props.changeShow(false)}>取消</Button>
            </div>
        )
    }
}
export default WangEditor