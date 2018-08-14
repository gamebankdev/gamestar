import fetchUrl from '../utils/request'
import gameStar from '../utils/gameBank'
import {routerRedux} from "dva/router";
import { Base64 } from 'js-base64';
import Loginjs from '../utils/loginjs'
const usermeta=window.localStorage.getItem('usermeta')?JSON.parse(Base64.decode(window.localStorage.getItem('usermeta'))):{}
console.log('usermeta',usermeta)
export default {
    namespace: 'users',
    state: {
        isLogin:usermeta.isLogin,
        SuggestedPassword:'',
        userName:usermeta.userName,
        privePostingWif:usermeta.postingPriWif,
    },
    effects: {
        // 登陆
      *fetchLogin({ payload }, { call, put }) {
        const {userName}=payload
        try{
            const loginResult = yield call(fetchUrl,'api/getAccounts',{
                method:'POST',
                payload:[[userName]]
            })
            if(loginResult.length==0){
                throw '用户名不存在'
            }
            const result  = yield  call(Loginjs,payload,loginResult)
            const obj=JSON.stringify({
                isLogin:result.isvalid,
                userName:result.userName,
                privePostingWif:result.postingPriWif,
            })
            window.localStorage.setItem('usermeta',Base64.encode(obj));
            yield put({
                type:'save',
                payload:result,
            })
            yield put(routerRedux.push("/"))
        }catch(err){
            console.log(err)
            throw err
        }  
      },
      //生成建议密码
      *CreateSuggestedPassword({payload},{call,put}){
            const password = gameStar.formatter.createSuggestedPassword();
            yield put({
                type:'save',
                payload:{
                    SuggestedPassword:password
                }
            })
      },
      //修改密码
      *changePassword({payload},{call,put,select}){
          const userState =  yield select(state=>state.walet.userState)
          const {aginSuggestedPassword,wif} = payload
          const publicKeys = gameStar.auth.generateKeys('name', aginSuggestedPassword, ['owner', 'active', 'posting', 'memo']);
          const owner = { weight_threshold: 1, account_auths: [], key_auths: [[publicKeys.owner, 1]] };
          const active = { weight_threshold: 1, account_auths: [], key_auths: [[publicKeys.active, 1]] };
          const posting = {weight_threshold: 1, account_auths: [], key_auths: [[publicKeys.posting, 1]] };
          const memoKey=publicKeys.memo;
          const changeResult = yield call(fetchUrl,'broadcast/accountUpdate',{
              method:'POST',
              payload:[wif,'test1',owner,active,posting,memoKey,{}]
          })
      },
    //   *弹窗登陆逻辑
    //  正常的登陆逻辑，保存登陆结果到state,登陆成功,执行上一步未完成的任务
     *PopupLogin({payload},{call,put,select}){
        const {userName}=payload
        const loginResult = yield call(fetchUrl,'api/getAccounts',{
            method:'POST',
            payload:[[userName]]
        })
        if(loginResult.length==0){
            throw '用户未注册'
        }
        const result  = yield  call(Loginjs,payload,loginResult)
        yield put({
                type:'save',
                payload:result,
        })
        yield put({type:'global/changeShowPopupLogin'})
        const {doingTask,doingParams} = yield select(state=>state.global)
        yield put({
            type:doingTask,
            payload:doingParams
        })
     }
    },
    reducers: {
        save(state, action) {
        return { ...state, ...action.payload}
      },
    },
  }
