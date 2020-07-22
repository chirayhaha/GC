<template>
  <div class="uploading">
    <back></back>
    <img class="up" src="../assets/images/uplogo.png" />
    <hr />
    <el-form
      :model="uploadForm"
      :rules="rules"
      ref="uploadForm"
      label-width="80px"
      class="uploadForm"
      size="small"
    >
      <el-form-item label="商品名称" prop="goodname">
        <el-input v-model="uploadForm.goodname"></el-input>
      </el-form-item>
      <el-form-item label="商品数量" prop="goodnum">
        <el-input v-model="uploadForm.goodnum"></el-input>
      </el-form-item>
      <el-form-item label="商品单价" prop="goodprice">
        <el-input v-model="uploadForm.goodprice"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="submit" type="primary" @click="submitForm('uploadForm')">上传</el-button>
        <el-button @click="resetForm('uploadForm')">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- <div class="bottom">
          <router-link to="/"><img src="../../static/images/index.png"></router-link>
          <router-link to="/shopping"><img src="../../static/images/upload.png"></router-link>
          <router-link to="/userinfo"><img src="../../static/images/wd.png"></router-link>
    </div>-->
  </div>
</template>

<script>
import { getLocalStorage } from "@/utils/localStorage";
import back from '../components/back'

export default {
  data() {
    return {
      uploadForm: {
        goodname: "",
        goodnum: "",
        goodprice: 0,
        userid: ""
      },
      rules: {
        goodname: [{ required: true, message: "不能为空", trigger: "blur" }],
        goodnum: [{ required: true, message: "不能为空", trigger: "blur" }],
        goodprice: [{ required: true, message: "不能为空", trigger: "blur" }]
      }
    };
  },
  components:{back},
  methods: {
    submitForm(uploadForm) {
      let userid = JSON.parse(getLocalStorage("userid"));
      this.uploadForm.userid = userid;
      this.$refs[uploadForm].validate(valid => {
        if (valid) {
          let uploadinfo = this.uploadForm;
          console.log(JSON.stringify(uploadinfo));
          this.$api.user.findgoods(uploadinfo).then(res => {
            if (res.code == 1) {
              this.$api.user.uploadgoods(uploadinfo).then(res => {
                if (res.code == 1) {
                  this.$message = "上传成功";
                }
                if (res.code == -1) {
                  this.$message = "上传失败";
                }
              });
            }
            if (res.code == -1) {
              this.$message = "上传失败";
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(uploadForm) {
      this.$refs[uploadForm].resetFields();
    }
  }
};
</script>

<style scoped>
*{padding: 0;margin: 0;}
.back{background-color: rgb(94, 184, 91);color: white;}
.up {
  width: 70px;
  height: 37px;
  display: block;
  margin: 0 auto;
  padding: 8px;
}
hr {
  border: 0.1px solid rgb(243, 243, 243);
}
.el-form {
  margin: 15px;
  text-align-last: justify;
  font-size: 15px;
}
.submit{
  background-color: rgb(102, 168, 102);
  border: none;
}
.el-botton:active{
  background-color: rgb(35, 95, 35);
}
.el-botton:hover{
  background-color: rgb(35, 95, 35);
}
.el-botton:visited{
  background-color: rgb(139, 184, 139);
}
</style>