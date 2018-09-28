import fetchUrl from '../utils/request'
import Recursion from '../utils/others'
import {routerRedux} from "dva/router";
export default {
    namespace: 'games',
    state: {
        gameid:'',
        gamesComment:{
            content:{},
            tonewCommentArray:[]
        },
        gameList:[],
        gamesDetail:{},
        recommendgamesList:[]
    },

    effects:{
        *getGameDeatil({gameId},{call,put}){
            const detailResult = yield call(fetchUrl,`condenser/games/${gameId}`,{method:'GET'})
            if(detailResult.length==0){
              return yield put(routerRedux.push("/404"))
            }
            yield put({
                type:'save',
                payload:{
                    gamesDetail:detailResult,
                    gameid:gameId
                }
            })
            yield put({
                type:'getGameComment',
                gameId
            })
        },
        // 拉取初始的评论
        *getGameComment({gameId},{call,put,select}){
            const  commentResult = yield call(fetchUrl,`api/getState`,{
                method:'POST',
                payload:[`/created/${gameId}`]
            })
            const content =commentResult.content
            const time= commentResult.props.time
            const rewardArr= Object.values(commentResult.content).map((item,index)=>{
               if(item.cashout_time<time){
                const obj={reward:(item.total_payout_value.split(' ')[0]*1000+item.curator_payout_value.split(' ')[0]*1000)/1000+' GB'}
                return {...item,...obj}
               }else{
                   return {...item,...{reward:item.pending_payout_value}}
               }
            })
            Object.keys(content).forEach((item,index)=>{
                content[item]=rewardArr[index]
            })
            const tonewCommentArray = yield call(Recursion,commentResult.content)
            yield put({
                type:'save',
                payload:{
                    gamesComment:{...commentResult,tonewCommentArray},
                    gameId,
                }
            })
        },
        // 分页请求更多
        *getGameCommentMore({start_permlink,start_author,gameId},{call,put}){
            const  commentResult = yield call(fetchUrl,`api/getDiscussionsByCreated`,{
                method:'POST',
                payload:[{
                    limit: 10,
                    start_author:start_author,
                    start_permlink:start_permlink,
                    tag:gameId
                }]
            })
            delete commentResult.content[`${start_author}/${start_permlink}`]
            const content =commentResult.content
            const time= commentResult.props.time
            const rewardArr= Object.values(commentResult.content).map((item,index)=>{
               if(item.cashout_time<time){
                    const obj={reward:(item.total_payout_value.split(' ')[0]*1000+item.curator_payout_value.split(' ')[0]*1000)/1000+' GB'}
                    return {...item,...obj}
               }else{
                   return {...item,...{reward:item.pending_payout_value}}
               }
            })
            Object.keys(content).forEach((item,index)=>{
                content[item]=rewardArr[index]
            })
            const tonewCommentArray = yield call(Recursion,commentResult.content)
            yield put({
                type:'save',
                payload:{
                    gamesComment:{...commentResult,tonewCommentArray},
                    gameId,
                }
            })
        },
        *getnewGames({payload},{call,put}){
            const allGames =yield call(fetchUrl,'condenser/Newgames',{
                method:'GET',
            })
            yield put({
                type:'save',
                payload:{
                    gameList:allGames
                }
            })
        } ,
        *Recommendgames({payload},{call,put}){
            const recommendgames =yield call(fetchUrl,'condenser/recommendgames',{
                method:'GET',
            })
            yield put({
                type:'save',
                payload:{
                    recommendgamesList:recommendgames
                }
            })
        }
    },
    reducers: {
        save(state, action) {
          return { ...state, ...action.payload };
        },
      },
}