import fetchUrl from '../utils/request'
import gameStar from '../utils/gameBank'
export default {
    namespace: 'games',
    state: {
        gameid:'',
        gamesComment:{
            content:{}
        },
        gameList:[{banner:''}],
        gamesDetail:{}
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location=>{
                if(location.pathname.includes('/game/')){
                    const gameId=location.pathname.split('/')[2]
                    dispatch({
                        type:"fetchGameDeatil",
                        gameId
                    })
                }
            })
        },
    },
    effects:{
        *getGameDeatil({gameId},{call,put}){
            const detailResult = yield call(fetchUrl,`condenser/games/${gameId}`,{method:'GET'})
            yield put({
                type:'save',
                payload:{
                    gamesDetail:detailResult.data
                }
            })
            yield put({
                type:'getGameComment',
                gameId
            })
        },
        *getGameComment({gameId},{call,put}){
            const  commentResult = yield call(fetchUrl,`api/getState`,{
                method:'POST',
                payload:[`/created/${gameId}`]
            })
            const content =commentResult.content
            const time= commentResult.props.time
            const rewardArr= Object.values(commentResult.content).map((item,index)=>{
               if(item.cashout_time<time){
                    const obj={reward:(item.total_payout_value.split('')[0]*1000+item.curator_payout_value.split('')[0]*1000).toFixed(3)+' GBC'}
                    return {
                        ...item,...obj
                    }
               }else{
                   return {
                     ...item,...{reward:item.pending_payout_value}
                   }
               }
            })
            Object.keys(content).forEach((item,index)=>{
                content[item]=rewardArr[index]
            })
            yield put({
                type:'save',
                payload:{
                    gamesComment:commentResult,
                    gameId,
                }
            })
        },
        *getAllGames({payload},{call,put}){
            const allGames =yield call(fetchUrl,'condenser/games',{
                method:'GET',
            })
            // allGames.data.map(element =>element.banner=JSON.parse(element.banner));
            yield put({
                type:'save',
                payload:{
                    gameList:allGames.data
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