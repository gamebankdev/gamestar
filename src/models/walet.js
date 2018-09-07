import fetchUrl from '../utils/request'
import getgameStarPower from '../utils/gameStarPower'
import { notification} from 'antd';

export default {
    namespace: 'walet',
    state: {
        userState:{
            posting:{
                key_auths:[[0]]
            },
            active:{
                key_auths:[[0]]
            },
            owner:{
                key_auths:[[0]]
            }
        },
        requestPowerUp:false
    },
    subscriptions: {},
    effects: {
      *fetchUserWalet({ payload }, { call, put,select,}) {
        const {userName} = payload
        const [result,properties] = yield [call(fetchUrl,'api/getAccounts',{
                method:'POST',
                payload:[[userName]]
        }),
        call(fetchUrl,'api/getDynamicGlobalProperties',{
            method:'POST',
            payload:[]
        })
        ]
    //    计算账户gameStarPower 和 账户公钥
       const gameStarPower=yield call(getgameStarPower,result,userName,properties)
       yield put({ type: 'save',payload:{userState:{...result[0],...gameStarPower}}});

      },
      
      *Transfer({payload},{call,put,select}){
          // 验证是否转账权限
        const {activePriWif,userName} = yield select(state=>state.users.loginUserMeta)
        
        if(!activePriWif){
           return yield put({
                type:'global/showSignModal',  
                payload:{
                    doingTask:'walet/Transfer',
                    doingParams:payload
                }
            })
        }
        payload.unshift(activePriWif)
        yield call(fetchUrl,'broadcast/transfer',{
            method:'POST',
            payload
        })
        yield put({
            type:"fetchUserWalet",
            payload:{
                userName
            }  
        })
         notification.open({
            message: '转账',
            description: '转账成功',
          });
      },
      *powerUp({payload},{call,put,select}){
           const {activePriWif,userName} = yield select(state=>state.users.loginUserMeta)
           if(!activePriWif){
              return yield put({
                   type:'global/showSignModal',  
                   payload:{
                       doingTask:'walet/powerUp',
                       doingParams:payload
                   }
               })
           }
           try{
            payload.unshift(activePriWif)
            yield put({type:"save",payload:{requestPowerUp:'ing'}})
            yield call(fetchUrl,'broadcast/transferToVesting',{method:"POST",payload})
            yield put({type:"fetchUserWalet",payload:{userName}})
            yield put({type:"save",payload:{requestPowerUp:'success'}})
            notification.open({
              message: 'power Up',
              description: 'power Up 成功',
             });
             yield put({type:"save",payload:{requestPowerUp:false}})
           }catch(err){
             yield put({type:"save",payload:{requestPowerUp:'failer'}})
             throw err
           }
       },
       *WithdrawVesting({payload},{call,put,select}){
        const {activePriWif,userName} = yield select(state=>state.users.loginUserMeta)
           if(!activePriWif){
              return yield put({
                   type:'global/showSignModal',  
                   payload:{
                       doingTask:'walet/WithdrawVesting',
                       doingParams:payload
                   }
               })
           }
           try{
            payload.unshift(activePriWif)
            yield put({type:"save",payload:{requestPowerUp:'ing'}})
            yield call(fetchUrl,'broadcast/withdrawVesting',{method:"POST",payload})
            yield put({type:"fetchUserWalet",payload:{userName}})
            yield put({type:"save",payload:{requestPowerUp:'success'}})
            notification.open({
              message: 'power Down',
              description: 'power Down 成功,本次交易将分13周转移转移到你的账户',
              });
             yield put({type:"save",payload:{requestPowerUp:false}})
           }catch(err){
             yield put({type:"save",payload:{requestPowerUp:'failer'}})
             throw err
        }
       }

    },
    reducers: {
      save(state, action) {
        return { ...state, ...action.payload };
      },
    },
  
  }
                                                                                                                                                                                                                                                                                                                                                                                                                                                              