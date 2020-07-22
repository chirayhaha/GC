import { asyncRoutersMap,defalutRoutersMap} from '../router'

function hasPermission(roleid,route){
    if(route.meta&&route.meta.roleid){
        return roleid.some(role => route.meta.roleid.indexOf(role) >= 0)
    }else{
        return true
    }
} 

const permission = {
    state:{
        addRouters:[],
        allRouters:defalutRoutersMap,
    },
    getters:{
        routers:state => state.routers,
        addRouters:state => state.addRouters
    },
    mutations:{
        SET_ROUTES:(state,routers) => {
            state.addRouters = routers,
            state.allRouters = defalutRoutersMap.concat(routers)
        }
    },
    actions:{
        createRouter({ commit },data){
          return new Promise((resolve,reject)=>{
            let roleid = data 
            let addRouters = []
            if(roleid.includes('0')){
              addRouters = asyncRoutersMap
            }else{
              addRouters = asyncRoutersMap.filter(item=>{

                if(hasPermission(roleid,item)){

                }
                /* if(roleid.includes(item.meta.roleid)){
                  return item
                } */
              })
            }
            commit('SET_ROLEID',addRouters)
            resolve()
          })
        }
    }
}

export default permission