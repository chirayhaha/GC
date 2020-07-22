import { asyncRouterMap,constantRouterMap} from '../router'

// 检查roleid（用户权限字符串）里是否含有某个页面的访问权限。
function accessCheck(roleid) {
  if (accessHave(roleid, 'read_user#') === true) permission.state.routerHidden.read_user = false
}
// 检查某一个权限字段是否存在
function accessHave(access, name) {
  if (isEmpty(access) === false) {
    const str = (access).toString()
    return str.indexOf(name) > -1
  } else return false
}
// 判断字符串是否为空
function isEmpty(obj) {
  return typeof obj === 'undefined' || obj == null || obj === ''
}

function dgDelete(arr) {
  arr.forEach((v0, k0) => {
    for (const key in v0) {
      if (v0[key] instanceof Array) {
        dgDelete(v0[key])
      } else {
        if (v0[key] === 'read_user#') v0[key] = permission.state.routerHidden.read_user
      }
    }
  })
}


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