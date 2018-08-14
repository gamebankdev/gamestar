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
    //    计算账户gameStarPower和账户公钥
       const gameStarPower=yield call(getgameStarPower,result,userName,properties)
       yield put({ type: 'save',payload:{userState:{...result[0],...gameStarPower}}});
      },

      *Transfer({payload},{call,put,select}){
          // 验证是否转账权限
        const {activePriWif,ownerPriWif} = yield select(state=>state.users)
        if(!activePriWif || !ownerPriWif){
           return yield put({
                type:'global/changeShowPopupLogin',  
                payload:{
                    doingTask:'walet/Transfer',
                    doingParams:payload
                }
            })
        }
        payload.unshift(activePriWif||ownerPriWif)
        yield call(fetchUrl,'broadcast/transfer',{
            method:'POST',
            payload
        })
        const openNotification = () => {
            notification.open({
              message: '转账',
              description: '转账成功',
            });
        }
        openNotification()
      },
    },
    reducers: {
      save(state, action) {
        return { ...state, ...action.payload };
      },
    },
  
  }
                                                                                                                                                                                                                                                                                                                                                                                                                                                              