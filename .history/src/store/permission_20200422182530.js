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
        routers:constantRouterMap,
        addRouters:[],
        roleid:0,
        routerHidden:{read_user:true}
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
        GenerateRoutes({ commit }, data) {
            return new Promise(resolve => {
              // 因为无法直接引用store.getters.roleidG全局参数，因此先创建一个局部变量 roleid来存储。
              this.roleid = data.roleid
              // 权限解析
              setTimeout(accessCheck(this.roleid), 3000)
              // 修改路由表
              dgDelete(asyncRouterMap)
              // 设置用户可访问的路由表
              commit('SET_ROUTES', asyncRouterMap)
              resolve()
            }).catch(error => {
              console.log(error)
            })
          }
    }
}

export default permission