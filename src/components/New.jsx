import React from 'react'
import styled from 'styled-components'
import {connect} from 'dva'
import {Link} from 'dva/router'
const TuijianGame  = styled.div`
    width: 98px;
    height: 50px;
    background-color:#5e85ff;
    text-align:center;
    line-height:50px;
    border-radius:5px;
    font-size:20px;
    font-family:'SimHei';
    color:#fff;
`
const Game = styled.div`
    display:flex;
    justify-content:flex-start;
    font-family:'SimHei';
    color:#333;
    font-size:16px;
    margin-top:20px;
    cursor: pointer;
    p{
        padding:0;
        margin:0;
        padding-bottom:20px;
        box-sizing:border-box;
    }
`
const GameImg = styled.div`
    width: 80px;
    height: 80px;
    border-radius:5px;
    img{
        width: 100%;
        height: 100%;
    }
`
const GameIntroduce = styled.div`
    width:calc(100% - 80px) ;
    padding-left:20px;
    box-sizing:border-box;
    font-size:16px;
    color:#333;
`
class Recommendgames extends React.Component{
    componentDidMount(){
        this.props.getRecommendgames()
    }
    render(){
        const {recommendgamesList} =this.props

        return(
            <div style={{width:"25%"}}>
                <TuijianGame>
                    <span>推荐游戏</span>
                </TuijianGame>
                {
                    recommendgamesList.map((item,index)=>{
                        return (
                            <Link to={`/games/trading/${item.id}`} key={index}>
                                <Game>
                                    <GameImg>
                                        <img src={item.logo} alt=""/>
                                    </GameImg>
                                    <GameIntroduce>
                                        <p>{item.gameName}</p>
                                        <div>
                                            {
                                                JSON.parse(item.tag).map((ele,key)=>{
                                                    return <span key={key} style={{paddingRight:"10px"}}>{ele}</span>
                                                })
                                            }
                                        </div>
                                    </GameIntroduce>
                                </Game>
                            </Link>
                           
                        )
                    })
                }
                
                </div>
        )
    }
}


export default  connect(state=>{
    return {
        recommendgamesList:state.games.recommendgamesList
    }
},dispatch=>{
    return {
        getRecommendgames:()=>{
            dispatch({
                type:"games/Recommendgames"
            })
        }
    }
})(Recommendgames) 