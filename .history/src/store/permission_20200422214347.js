import { asyncRoutersMap,defalutRoutersMap} from '../router'

function hasPermission(roles,route){
    if(route.meta&&route.meta.role){
        return roles.some(role => route.meta.role.indexOf(role) >= 0)
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
            state.routers = constantRouterMap.concat(routers)
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
                if(roleid.includes(item.meta.roleid)){
                  return item
                }
              })
            }
            
          })
        }
    }
}

export default permission