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
        routes:defalutRoutersMap,
        addRouters:[],
        allRouters:[]
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
        
    }
}

export default permission