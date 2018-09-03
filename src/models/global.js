
export default {

    namespace: 'global',
    state: {
        showPopupLogin:false,
        doingTask:undefined,
        doingParams:undefined,

    },
    effects: {
      *showSignModal({ payload }, { call, put ,select}) {
        const nowPopupLogin = yield select(state=>state.global.showPopupLogin)
        yield put({ 
            type: 'save',
            payload:{
               showPopupLogin:!nowPopupLogin,
               ...payload
            } 
          });
      },
      *error({message},{call,put}){
        yield put({
          type:'save',
          payload:{
            errorMessage:message
          }
        })
      },
   
    },
    reducers: {
      save(state, action) {
        return { ...state, ...action.payload };
      },
    },
  
  };
  