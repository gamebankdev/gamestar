import React from 'react'
import styled from 'styled-components'
import {Link} from 'dva/router'
import {connect} from 'dva'

const NewGameTitle = styled.div`
    width: 98px;
    height: 50px;
    background-color:#ff6160;
    text-align:center;
    line-height:50px;
    border-radius:5px;
    font-size:20px;
    font-family:'SimHei';
    color:#fff;
`
const Game = styled.div`
    width:100% ;
    display:flex;
    justify-content:flex-start;
    font-family:'SimHei';
    margin-top:20px;
    cursor: pointer;
    color:#333;
    p{
        padding:0;
        margin:0;
        font-size:24px;
        padding-bottom:30px;
        box-sizing:border-box;
    }
    a{
        width:100% ;
        display:inherit;
        color: #333;
        text-decoration:none;
    }
`
const GameImg = styled.div`
    width: 280px;
    height: 158px;
    border-radius:5px;
    img{
        width: 100%;
        height: 100%;
    }
`
const GameIntroduce = styled.div`
    width:calc(100% - 280px) ;
    padding-left:30px;
    box-sizing:border-box;
    div{
        width: 100%;
        font-size:16px;
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }
`

class TabsJsx extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
       
        this.props.fetchIndexGames()
    }
    render(){
        const {gameList} =this.props
        return(
            <div style={{width:"75%"}}>
            <NewGameTitle>
                <span>新品游戏</span>
            </NewGameTitle>
            {
                gameList.map((Item,index)=>{
                    return  <Game key={index}>
                                <Link to={`/games/trading/${Item.id}`}>
                                <GameImg>
                                    <img src={Item.coverImg} alt=""/>
                                </GameImg>
                                <GameIntroduce>
                                    <p>{Item.gameName}</p>
                                    <div>
                                    {Item.brief}
                                    </div>
                                </GameIntroduce>
                                </Link>  
                           </Game>
                })
            }
           
            </div>
        )
    }
}
const mapStateToProps =(state)=>{
    return {...state.games}
}
const mapDispatchToProps = (dispatch)=>{
    return {
        fetchIndexGames:()=>{
            dispatch({
                type:'games/getnewGames'
            })
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(TabsJsx)  