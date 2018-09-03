import fetchUrl from '../utils/request'
export default {
    namespace:'posts',
    state:{

    },
    effects:{
        //点赞
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
        //发表评论
        *PostComment({payload},{call,put,select}){
            yield call(fetchUrl,'broadcast/comment',{
                method:'POST',
                payload
            })
            const {gameId} = yield select(state=>state.games)
            yield put({
                type:'games/getGameComment',
                gameId
            })
        },
        //关注某人
        *UserOper({payload},{call,put}){
            yield call(fetchUrl,'broadcast/customJson',{
                method:'POST',
                payload
            })
            yield put({
                type:"users/getFollowingMethod",
                limit:20
            })
            yield put({
                type:"users/getFollowIgnore",
                limit:20
            })
        },
    },
    reducers:{
        
    }

}