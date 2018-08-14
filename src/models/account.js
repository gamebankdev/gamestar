import fetchUrl from '../utils/request'
import gameStar from '../utils/gameBank'
export default {
    namespace:'accounts',
    state:{
        allPost:{
            content:{},
            
        },
        allComment:{
            content:{}
        },
        allReplays:{
            content:{}
        },
        userReputation:0,
        userState:{},
        FollowCounts:{
            following_count:0,
            follower_count:0
        },
        userAccounts:{},
        Reward:{
            accounts:{
                1:'curation_rewards'
            }
        }
    },
    effects:{
        *accountPosting({userName},{call,put}){
            const allPost =yield call(fetchUrl,'api/getState',{
                method:'POST',
                payload:[`/@${userName}`]
            })
            yield put({
                type:'save',
                payload:{
                    allPost:allPost
                }
            })
        },
        *accountComment({path},{call,put}){
            const allComment = yield call(fetchUrl,'api/getState',{
                method:'POST',
                payload:[`/@${path}/comments`]
            })
            const arr = Object.keys( allComment.content)
            arr.forEach((item,index)=>{
                const author_reputation=allComment.content[item].author_reputation
                allComment.content[item].userReputation=gameStar.formatter.reputation(author_reputation)
            })
            yield put({
                type:'save',
                payload:{
                    allComment:allComment
                }
            })
        },
        *accountReplay({path},{call,put}){
            const allReplays = yield call(fetchUrl,'api/getState',{
                method:'POST',
                payload:[`/@${path}/recent-replies`]
            })
            const arr = Object.keys( allReplays.content)
            arr.forEach((item,index)=>{
                const author_reputation=allReplays.content[item].author_reputation
                allReplays.content[item].userReputation=gameStar.formatter.reputation(author_reputation)
            })
            yield put({
                type:'save',
                payload:{
                    allReplays:allReplays
                }
            })
        },
           //获取用户基本数据
      *getUserMeta({payload},{call,put,select}){
        const userAccounts = yield call(fetchUrl,'api/getAccounts',{
            method:'POST',
            payload:[[payload]]
        })
           //计算声望
        const reputation =gameStar.formatter.reputation(userAccounts[0].reputation)
        const FollowCounts = yield call(fetchUrl,'api/getFollowCount',{
            method:'POST',
            payload:[payload]
        })
        yield put({
            type:'save',
            payload:{
                userReputation:reputation,
                userAccounts:userAccounts[0],
                FollowCounts:FollowCounts
            }
        })
        },
        *Reward({payload},{call,put}){
            const result = yield call(fetchUrl,'api/getState',{
                method:'POST',
                payload:[`/@${payload}/transfers`]
            })
            yield put({
                type:'save',
                payload:{
                    Reward:result
                }

            })
        }
    },
    reducers:{
        save(state, action){
            return { ...state, ...action.payload };
        }
    }
}