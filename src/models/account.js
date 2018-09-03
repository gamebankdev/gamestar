import fetchUrl from '../utils/request'
import gameStar from '../utils/gameBank'
export default {
    namespace:'accounts',
    state:{
        Posts:{
            content:{},
        },
        Comments:{
            content:{}
        },
        messages:{
            content:{}
        },

        userReputation:0,
        FollowCounts:{
            following_count:0,
            follower_count:0
        },
        
        userAccounts:{
            active:{
                key_auths:[]
            },
            owner:{
                key_auths:[]
            },
            posting:{
                key_auths:[]
            },
            memo_key:""
        },
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
                    Posts:allPost
                }
            })
        },
        *accountComment({userName},{call,put}){
            const allComment = yield call(fetchUrl,'api/getState',{
                method:'POST',
                payload:[`/@${userName}/comments`]
            })
            const arr = Object.keys( allComment.content)
            arr.forEach((item,index)=>{
                const author_reputation=allComment.content[item].author_reputation
                allComment.content[item].userReputation=gameStar.formatter.reputation(author_reputation)
            })
            yield put({
                type:'save',
                payload:{
                    Comments:allComment
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
                    messages:allReplays
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