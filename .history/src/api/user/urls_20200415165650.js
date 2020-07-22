const baseUrl = '/api'

export default{
    userinfo: baseUrl + '/users/userinfo', 
    postlogin: baseUrl + '/users/postlogin',
    register:baseUrl + '/users/registerinfo',
    logout: baseUrl + '/users/logout',
    readcookbook: baseUrl + '/users/readcookbook',
    sellerinfo: baseUrl + '/seller/sellerinfo',
    sregisterinfo:baseUrl+'/seller/sregisterinfo',
    spostlogin:baseUrl+'/seller/spostlogin',
    sharebooks:baseUrl+'/users/sharebooks',
    readdetail:baseUrl+'/users/readdetail',
    mybooks:baseUrl+'/users/mybooks',
    findgoods:baseUrl + '/seller/findgoods',
    uploadgoods: baseUrl + '/seller/uploadgoods',
    goodlist:baseUrl+'/users/goodlist',
    searchgood:baseUrl+'/users/searchgood',
    getgoodinfo:baseUrl+'/users/getgoodinfo',
    addaddress:baseUrl+'/users/addaddress',
    addlist:baseUrl+'/users/addlist',
    deladd:baseUrl+"/users/deladd",
    addcarlist:baseUrl+'/users/addcarlist',
    updatecarlist:baseUrl+'/users/updatecarlist',
    /* addcginfo:baseUrl+'/users/addcginfo', */
    getcarinfo:baseUrl+'/users/getcarinfo',
    setbookgoods:baseUrl+'/users/setbookgoods',
    getbookgoods:baseUrl+'/users/getbookgoods',
    clearcarlist:baseUrl+'/users/clearcarlist'
}