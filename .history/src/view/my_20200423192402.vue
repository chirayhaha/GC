<template>
  <div class="my">
    <!-- <el-upload
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload> -->
    <div class="top">
        
        <p class="sname">{{sellerinfo.storename}}</p>
    </div>
        <p @click="logout" class="logout">退出登录</p>
    <br />
    <div class="middle">
        <div class="info">    
            <p>用户名:{{username}}</p>
            <p>店铺电话：{{sellerinfo.storephone}}</p>
            <p>店铺地址：{{sellerinfo.storeadd}}</p>
        </div>
        <router-link to="/takeorder"><p class="msg">店铺订单</p></router-link>
    </div>
    
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("user");
import { removeLocalStorage, getLocalStorage } from "@/utils/localStorage";

import axios from "axios";

export default {
  data() {
    return {
      imageUrl: "",
      sellerinfo:[],
    };
  },
  computed: {
    ...mapState({
      userid: state => state.userid,
      username: state => state.username
    })
  },
  methods: {
    logout() {
      this.$api.user.logout().then(res => {
        removeLocalStorage("Token");
        this.$router.push("/slogin");
      });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    getsellerinfo(){
        let userid  = JSON.parse(getLocalStorage('userid'))
        this.$api.user.getsellerinfo(userid).then(res=>{
            this.sellerinfo = res.data
            console.log(this.sellerinfo)
        })
    }
  },
  created(){
      this.getsellerinfo()
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
body,
html {
  overflow: hidden;
}
.avatar-uploader .el-upload {
  border: 1px solid #8b8686;
  border-radius: 6px;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: rgb(100, 112, 124);
}
.avatar-uploader-icon {
  color: #98a6b9;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
  margin: 20px;
}
.top{
    height: 90px;
}
.sname{
    font-size: 30px;
    text-align: center;
    color: #4f678a;
    font-weight: bolder;
}
.logout {
  width: 75px;
  position: relative;
  left: 80%;
  background-color: rgba(144, 183, 209, 0.781);
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  text-indent: 0.5em;
  text-align: right;
  color: #f1f7ff;
}
.info{
    text-align: center;
    font-size: 12px;
}
.msg,
a {
  text-decoration: none;
  color: #113e7e;
  height: 42px;
  line-height: 37px;
  text-indent: 1rem;
  background-color: rgb(228, 240, 253);
}
</style>