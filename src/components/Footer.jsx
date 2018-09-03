import React from 'react'
import styled from 'styled-components'

const Footer_container = styled.div`
    width: 100%;
    background-color:#494745;
    height: 180px;
`
const Footer_content = styled.div`
    width: 980px;
    margin:0 auto;
    text-align:center;
`
const Footer_link= styled.div`
    font-family:'SimHei';
    font-size:14px;
    color: #fff;
    padding:30px 0 20px 0;
    border-bottom:1px solid #747373;
    box-sizing:border-box;
    span{
        padding:0 20px;
        box-sizing:border-box;
    }
    
`
const Footer = ()=>{
    return (
        <Footer_container>
            <Footer_content>
                <Footer_link>
                    <span>网站合作</span>
                    <span>法律声明</span>
                    <span>隐私权政策</span>
                    <span>知识产权</span>
                </Footer_link>
            </Footer_content>
        </Footer_container>
    )
}
export default Footer