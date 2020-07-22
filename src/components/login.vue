<template>
    <div class="login">
        <back></back>
        <a href="/slogin" class="seller">商家登录</a>
        <span class="title">登录</span>
        <br>
        <el-form size="meduim" :model="logininfo" label-width="80px" :rules="rules" ref="logininfo" class="logininfo" hide-required-asterisk>
            <el-form-item label="手机号"  prop="userid" class="login-item">
                <el-input @keyup.enter.native ="loginaxios('logininfo')"  class="area" type="text" placeholder="手机号" v-model="logininfo.userid" ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" class="login-item"> 
                <el-input @keyup.enter.native ="loginaxios('logininfo')" show-password class="area" type="password" placeholder="密码" v-model="logininfo.password"></el-input>
            </el-form-item>
            <el-form-item class="btns">
                <el-button type="primary"  @click="loginaxios('logininfo')" class="submit_btn">登录</el-button>
                &nbsp;
                <router-link to="register" >注册</router-link>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import axios from 'axios'
import { setLocalStorage } from '@/utils/localStorage'
import { Message } from 'element-ui';
import back from '../components/back'

export default {
    name:'login',
    components:{back},
    data(){
        return {
            logininfo:{
                userid:'',
                password:'',
            },
            rules:{
                userid:[
                    {required:true},
                ],
                password: [
                    { required: true}
                ],
            }
        }
    },
    methods:{
        loginaxios(logininfo){
            this.$refs[logininfo].validate((valid) => {
                if (valid) {
                    let userinfo = this.logininfo;
                    this.$api.user.postlogin(userinfo).then(res =>{
                        if(res.code == -1){
                            this.$message("该用户不存在")
                        }else if(res.code == 0){
                            this.$message("密码错误")
                        }else if(res.code == 1){
                            //成功验证
                            setLocalStorage("Token",res.data.token)
                            setLocalStorage("userid",res.data.userid)
                            this.$message("登录成功")
                            this.$router.push({path:'/'})
                        }else{
                            this.showMessage("info","未知错误")
                        }
                    })
                }
            });
        } 
    }
}
</script>

<style scoped>
*{margin: 0;padding: 0;}
.title{
    text-align: center;
    position: absolute;
    text-align: center;
    top: 50px;
    left: 45%;
    font-size: 25px;
    color: rgb(187, 187, 98);
}
.logininfo{
    margin: 25px;
    position: relative;
    top: 70px;
    text-align-last: justify;
}
.login-item{
    margin: 20px;

}
.btns{
    margin-right: 22px;
    padding: 5px;
    float: right;
}
.submit_btn{
    background-color: rgb(216, 216, 170);
    border: none;
}
.seller{
    float: right;
    position: absolute;
    right: 15px;
    top: 0;
    text-decoration: none;
    margin: 0;
    font-size: 17px;
}
a{
    color: rgb(129, 129, 80);
}
</style>

