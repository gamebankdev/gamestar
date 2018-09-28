import fetchUrl from '../utils/request'
import {message} from 'antd'
export default {
    namespace:'posts',
    state:{
        voteIdIng:false,
    },
    effects:{
        //点赞
        *postVote({payload},{call,put,select}){
            try{
                yield put({type:"save",payload:{voteIdIng:payload.id}})
                yield call(fetchUrl,'broadcast/vote',{
                    method:'POST',
                    payload:payload.data
                })
                yield put({type:"save",payload:{voteIdIng:false}})
                const {gameId} = yield select(state=>state.games)
                yield put({
                    type:'games/getGameComment',
                    gameId
                })
            }catch(err){
                yield put({type:"save",payload:{voteIdIng:false}})
                message.error(err)
            }
        },
        //发表评论
        *PostComment({payload},{call,put,select}){
            try{
        
                message.loading('正在请求!', 0);
                yield call(fetchUrl,'broadcast/comment',{
                    method:'POST',
                    payload
                })
                const {gameId} = yield select(state=>state.games)
                yield put({
                    type:'games/getGameComment',
                    gameId
                })
                message.destroy()
       

            }catch(err){
                message.destroy()
            
              

                throw `${err}`
            }
        },
        //关注某人
        *UserOper({payload},{call,put,select}){
            try{
                yield call(fetchUrl,'broadcast/customJson',{
                    method:'POST',
                    payload
                })
                const currentLoginUserName=yield select(state=>state.users.loginUserMeta.userName)
                yield put({
                    type:"users/getFollow",
                    userName:currentLoginUserName,
                    isloginUser:true,
                })
                yield put({
                    type:"users/getIgnore",
                    userName:currentLoginUserName,
                    isloginUser:true,
                })
            }catch(err){
                throw err
            }
           
        },
    },
    reducers:{
        save(state, action) {
            return { ...state, ...action.payload };
          },
    }

}