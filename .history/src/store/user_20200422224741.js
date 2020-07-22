import { getLocalStorage,removeLocalStorage } from '@/utils/localStorage'

const user  = {
    namespaced: true,
    state : {
      username:'',
      token: '',
      userid:'',
      artlist:[]
    },
    getters : {
       // 传字符串参数 
      token: state => state.token,
      username: state => state.username,/*  */
      userid: state => state.userid,
      roleid: state => state.roleid,
      artlist:state=>state.artlist,
    },
    mutations: {   
      SET_USERName: (state, username) => {
        state.username = username
      },
      SET_USERID: (state, userid) => {//将请求中res.data.user对象存入userid
        state.userid = userid
      },
      SET_TOKEN: (state, token) => {
        state.token = token
      },
      SET_ROLEID:(state,roleid) =>{
        state.roleid = roleid
      },
      SET_ARTLIST:(state,artlist)=>{
        state.artlist = artlist
      }
    }, 
    actions:{
        //登出
        LogOut() {
          return new Promise((resolve, reject) => {
            removeLocalStorage('Token')
            resolve()
          })
        },
  
        
    }
  }
  
  export default user;
  