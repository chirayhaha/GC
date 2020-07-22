<template>
    <div class="register">
        <back></back>
        <a href="/register" class="normal">普通用户注册</a>
        <p class="title">注册</p>
        <el-form ref="registerinfo" :rules="rules" :model="registerinfo" class="registerinfo"  size="meduim" hide-required-asterisk label-width="80px">
            <el-form-item label="手机号" prop="userid" class="register-item">
                <el-input @keyup.enter.native ="registeraxios('registerinfo')"  class="area" type="text" placeholder="phone number" v-model="registerinfo.userid" ></el-input>
            </el-form-item>
            <el-form-item label="用户名" prop="username" class="register-item">
                <el-input @keyup.enter.native ="registeraxios('registerinfo')"  class="area" type="text" placeholder="name" v-model="registerinfo.username" ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" class="register-item">
                <el-input @keyup.enter.native ="registeraxios('registerinfo')"  class="area" type="password" placeholder="password" v-model="registerinfo.password" ></el-input>
            </el-form-item>

            <el-form-item label="店铺名字" prop="storename" class="register-item">
                <el-input @keyup.enter.native ="registeraxios('registerinfo')" class="area" type="text" placeholder="storename" v-model="registerinfo.storename"></el-input>
            </el-form-item>
            <el-form-item label="店铺电话" prop="storephone" class="register-item">
                <el-input @keyup.enter.native ="registeraxios('registerinfo')" class="area" type="text" placeholder="storephone" v-model="registerinfo.storephone"></el-input>
            </el-form-item>
            <el-form-item label="店铺地址" prop="storeadd" class="register-item">
                <el-input @keyup.enter.native ="registeraxios('registerinfo')" class="area" type="text" placeholder="storeadd" v-model="registerinfo.storeadd"></el-input>
            </el-form-item>

            <el-form-item class="btns">
                <el-button type="primary"  @click="registeraxios('registerinfo')" class="submit_btn">注册</el-button>
                <router-link to="login" >登录</router-link>
            </el-form-item>
        </el-form>
        <footer></footer>
    </div>
</template>

<script>
import axios from 'axios'
/* import urls from '@/api/user/urls' */
import { Message } from 'element-ui';
import back from '../components/back'
import footer from '../components/footer'

export default {
    name:'register',
    components:{back,footer},
    data(){
        return {
            registerinfo:{
                username:'',
                userid:'',
                password:'',
                storename:'',
                storephone:'',
                storeadd:'',
            },
            rules: {
                userid:[
                    {required:true, message:'请输入用户id',trigger: 'blur'},
                    { min: 11, max: 11, message: '长度 11 个字符', trigger: 'blur' }
                ],
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
                storephone:[
                    {required:true, message:'请输入店铺电话号码',trigger: 'blur'},
                    { min: 8, max: 11, message: '长度8~11个字符', trigger: 'blur' }
                ],
                storename: [
                    { required: true, message: '请输入店铺名字', trigger: 'blur' },
                    { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
                ],
                storeadd: [
                    { required: true, message: '请输入店铺地址', trigger: 'blur' },
                ],
            }
        }
    },
    methods:{
        registeraxios(registerinfo){
            this.$refs[registerinfo].validate((valid) => {
                console.log(valid)
                if(valid){
                    let userinfo = this.registerinfo
                    //api-user-index.js
                    this.$api.user.sregisterinfo(userinfo).then(res => {
                        //console.log(res) 
                        if(res.code == 1){
                            this.$message("注册成功")
                            this.$router.push({path:'/login'})
                        }
                        else{
                            this.$message('用户已存在')
                        }
                    })/*  */
                }
            })
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
.registerinfo{
    margin: 25px;
    position: relative;
    top: 70px;
    text-align-last: justify;
}
.register-item{
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
.normal{
    float: right;
    position: absolute;
    right: 15px;
    top: 0;
    text-decoration: none;
    margin: 0;
    font-size: 15px;
}

a{
    color: rgb(129, 129, 80);
}
</style>