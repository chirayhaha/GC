<template>
  <div class="userinfo">
    <img class="top" src="../assets/images/mylogo.png" />
    <hr />
    <el-upload
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <div class="middle">
      <p @click="logout" class="logout">退出登录</p>
      <br />
      <div class="info">
        <span class="msg">ID:{{userid}}</span>
        <span class="msg">用户名:{{username}}</span>
        <span class="msg">角色id:{{roleid}}</span>
      </div>
      <div class="address">
        <router-link to="/addaddress"><p class="msg">我的地址</p></router-link>
      </div>
      <div class="mybooks" @click="showbooks()">
        <p class="msg">我的食谱</p>
      </div>
      <div class="myorder" @click="showorders()">
        <p class="msg">我的订单</p>
      </div>
    </div>

    <bottom class="bottom"></bottom>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapGetters } = createNamespacedHelpers("user");
import { removeLocalStorage } from "@/utils/localStorage";

import bottom from "../components/bottom";
import axios from "axios";

export default {
  data() {
    return {
      imageUrl: ""
    };
  },
  components: { bottom },
  computed: {
    ...mapState({
      userid: state => state.userid,
      username: state => state.username,
      roleid: state => state.roleid
    }) //对userid username监控
  },
  methods: {
    logout() {
      this.$api.user.logout().then(res => {
        removeLocalStorage("Token");
        removeLocalStorage("userid");
        this.$router.push("/login");
      });
    },
    showbooks() {
      this.$router.push({ path: "/mybooks" });
    },
    showorders(){
      this.$router.push({path:'/orderpage'})
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
    }
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
.userinfo {
}
.logout {
  width: 87px;
  position: relative;
  left: 77%;
  background-color: rgb(221, 221, 147);
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  text-indent: 0.5em;
}
.middle {
  width: 100%;
  height: 500px;
}
.info{
  border-bottom: 1px solid rgba(202, 196, 144, 0.596);
  font-size: 13px;
}
.msg {
  height: 42px;
  line-height: 37px;
  text-indent: 1rem;
}
.mybooks,.address,.myorder{
  background-color: rgb(248, 248, 231);
  border-bottom: 1px solid rgba(202, 196, 144, 0.596);
  color: rgb(121, 116, 95);
  font-size: 15px;
  font-weight: bolder;
}
.mybooks:active{
  background-color: rgb(179, 179, 157);
}
.myorder:active{
  background-color: rgb(179, 179, 157);
}
.top {
  width: 100px;
  height: 37px;
  display: block;
  margin: 0 auto;
  padding: 8px;
}
hr {
  border: 0.1px solid rgb(243, 243, 243);
}
a{
  text-decoration: none;
  color: rgb(121, 116, 95);
}
.bottom {
  position: absolute;
  bottom: 0;
}
</style>