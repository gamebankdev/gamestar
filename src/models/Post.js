import fetchUrl from '../utils/request'
export default {
    namespace:'posts',
    state:{

    },
    effects:{
        *postVote({payload},{call,put,select}){
            yield call(fetchUrl,'broadcast/vote',{
                method:'POST',
                payload:payload
            })
            const {gameId} = yield select(state=>state.games)
            yield put({
                type:'games/getGameComment',
                gameId
            })

        },
        *PostComment({payload},{call,put}){
            yield call(fetchUrl,'broadcast/comment',{
                method:'POST',
                payload
           })


        },
    },
    reducers:{
        
    }

}