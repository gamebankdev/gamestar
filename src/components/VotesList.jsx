import React from 'react'
import {Icon} from 'antd'
export default ({active_votes})=>{
    active_votes.sort((a,b)=>(a.rshares-b.rshares)) 
    return (
        <ul>
            {
                active_votes.map((ele,index)=>{
                    return (
                        <li key={index} style={{listStyleType:"none",fontSize:"12px"}}>
                          <Icon type="plus" theme="outlined" />{ele.voter}
                        </li>
                    )
                })
            }
           
        </ul>
    )
}