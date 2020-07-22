import api from '../index'
import urls from './urls'

export default {
    //params传参
    userinfo() {
        //return出去一个promise
        return api.get(urls.userinfo)
    },
    postlogin(params) {  //params来自vue输入数据
        //return出去一个promise
        params = {
            userid: params.userid,
            password: params.password
        }
        return api.post(urls.postlogin, params)
    },
    register(params) {
        params = {  //params是添加到url的请求字符串中的，用于get请求。
            userid: params.userid,
            password: params.password,
            username: params.username
        }
        return api.post(urls.register, params)
    },
    logout() {
        return api.get(urls.logout)
    },
    sellerinfo() {
        return api.get(urls.sellerinfo)
    },
    readcookbook() {
        return api.get(urls.readcookbook)
    },
    readdetail(params) {
        params = {
            title: params.title,
            userid: params.userid
        }
        return api.post(urls.readdetail, params)
    },
    findgoods(params) {
        params = {
            goodname: params.goodname,
            goodnum: params.goodnum,
            goodprice: params.goodprice,
            userid: params.userid
        }
        return api.post(urls.findgoods, params)
    },
    uploadgoods(params) {
        params = {  //params是添加到url的请求字符串中的，用于get请求。
            goodname: params.goodname,
            goodnum: params.goodnum,
            goodprice: params.goodprice,
            userid: params.userid
        }
        return api.post(urls.uploadgoods, params)
    },
    sregisterinfo(params) {
        params = {  //params是添加到url的请求字符串中的，用于get请求。
            userid: params.userid,
            password: params.password,
            username: params.username,
            storename: params.storename,
            storephone: params.storephone,
            storeadd: params.storeadd,
        }
        return api.post(urls.sregisterinfo, params)
    },
    spostlogin(params) {
        params = {
            userid: params.userid,
            password: params.password
        }
        return api.post(urls.spostlogin, params)
    },
    sharebooks(params) {
        params = {
            title: params.title,
            context: params.context,
            userid: params.userid,
            making: params.making,
            tags: params.tags
        }
        return api.post(urls.sharebooks, params)
    },
    mybooks(params) {
        params = { userid: params }
        return api.post(urls.mybooks, params)
    },
    searchgood(params) {
        params = { goodname: params }
        return api.post(urls.searchgood, params)
    },
    getgoodinfo(params) {
        params = { id: params.id }
        return api.post(urls.getgoodinfo, params)
    },
    addaddress(params) {
        params = {
            address: params.address,
            pca: params.pca,
            userid: params.userid,
            conphone: params.conphone
        }
        return api.post(urls.addaddress, params)
    },
    addlist(params) {
        params = {
            userid: params
        }
        return api.post(urls.addlist, params)
    },
    deladd(params) {
        params = {
            id: params
        }
        return api.post(urls.deladd, params)
    },
    addcarlist(params) {
        params = {
            userid: params.userid,
            goodid: params.goodid,
            goodnum: params.goodnum,
            selected: params.selected
        }
        return api.post(urls.addcarlist, params)
    },
    updatecarlist(params) {
        params = {
            userid: params.userid,
            goodnum: params.goodnum,
            goodid: params.goodid
        }
        return api.post(urls.updatecarlist, params)
    },
    clearcarlist(params) {
        params = { userid: params }
        return api.post(urls.clearcarlist, params)
    },
    /* addcginfo(params){
        params={
            carid:params,
            goodid:params,
            goodnum:params
        }
        return api.post(urls.addcginfo,params)
    }, */
    getcarinfo(params) {
        params = {
            userid: params
        }
        return api.post(urls.getcarinfo, params)
    },
    setbookgoods(params) {
        params = {
            goodid: params.goodid,
            cbtitle: params.cbtitle,
            userid: params.userid,
            goodname: params.goodname
        }
        return api.post(urls.setbookgoods, params)
    },
    getbookgoods(params) {
        params = {
            title: params.title,
            userid: params.userid
        }
        return api.post(urls.getbookgoods, params)
    },
    goodlist(params) {  //从id获取商品
        params = { goodid: params }
        return api.post(urls.goodlist, params)
    },
    selected(params) {
        params = {
            userid: params.userid,
            goodid: params.goodid
        }
        return api.post(urls.selected, params)
    },
    allunselected(params) {//用于离开或刷新购物车后购物车商品不被勾选
        params = {
            userid: params.userid,
            goodid: params.goodid
        }
        return api.post(urls.allunselected, params)
    },
    /* unselected(params) {
        params = {
            userid: params.userid,
            goodid: params.goodid
        }
        return api.post(urls.unselected, params)
    }, */
    getorder(params) {    //商家接单
        params = { userid: params }
        return api.post(urls.getorder, params)
    },
    getaddress(params) {    //获取全部地址
        params = { userid: params }
        return api.post(urls.getaddress, params)
    },
    delcart() {//删除购物车勾选商品
        return api.post(urls.delcart)
    },
    createbill(params) {//创建订单
        params = {
            userid: params.userid,
            foodname: params.foodname,
            ordernum: params.ordernum,
            address: params.address,
            storeid: params.storeid,
            total: params.total,
            conphone: params.conphone,
            goodid :params.goodid,
            orderid:params.orderid
        }
        return api.post(urls.createbill,params)
    },
    paybill(params) {//支付订单
        params = {
            userid: params.userid,
            foodname: params.foodname,
            ordernum: params.ordernum,
            address: params.address,
            storeid: params.storeid,
            total: params.total,
            conphone: params.conphone,
            goodid : params.goodid,
            orderid:params.orderid
        }
        return api.post(urls.paybill,params)
    },
    getpayed(params){ //获取已支付订单
        params={userid:params}
        return api.post(urls.getpayed,params)
    },
    getpaying(params){//获取待支付订单
        params={userid:params}
        return api.post(urls.getpaying,params)
    },
    gettaken(params){  //已接单
        params={storeid:params}
        return api.post(urls.gettaken,params)
    },
    gettaking(params){  //待接单
        params={storeid:params}
        return api.post(urls.gettaking,params)
    },
    cancelorder(params){//取消订单
        params={
            orderid:params.orderid,
            userid:params.userid
        }
        return api.post(urls.cancelorder,params)
    },
    takeorder(params){   //商家接单
        params={
            orderid:params.orderid,
            userid:params.userid
        }
        return api.post(urls.takeorder,params)
    },
    gettakenorder(params){//获取已接单订单
        params={userid:params}
        return api.post(urls.gettakenorder,params)
    },
    getsellerinfo(params){//获取商家页面商家信息
        params={storeid:params}
        return api.post(urls.getsellerinfo,params)
    },
    getallgoods(params){ //获取商家全部商品
        params={userid:params}
        return api.post(urls.getallgoods,params)
    },
    searchbook(params){ //搜索食谱
        params={
            bookname:params
        }
        return api.get(urls.searchbook,params)
    }
}