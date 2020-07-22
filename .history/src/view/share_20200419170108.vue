<template>
  <div class="share">
    <back></back>
    <img class="up" src="../assets/images/slogo.png" />
    <hr />
    <!-- <div class="upload">
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
      >
    上传地址，文件类型，点击文件列表中已上传的文件时的钩子，文件列表移除文件时的钩子-->
    <!-- <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt />
      </el-dialog>
    </div>-->

    <el-form
      :model="uploadForm"
      :rules="rules"
      ref="uploadForm"
      hide-required-asterisk
      label-width="70px"
      class="uploadForm"
      size="small"
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="uploadForm.title"></el-input>
      </el-form-item>
      <el-form-item label="食材" prop="context" class="context">
        <el-input class="good" v-model="uploadForm.context"></el-input>
        <el-tooltip class="item" effect="dark" content="点击搜索相应商品" placement="top">
          <el-button>
            <i class="el-icon-zoom-in" @click="searchgood(uploadForm.context)"></i>
          </el-button>
        </el-tooltip>
        <el-tag
          v-for="tag in uploadForm.tags"
          :key="tag.name"
          closable
          @close="handleClose(tag)"
        >{{tag}}</el-tag>
        <div class="goodslist" v-if="show">
          <ul v-for="(info,index) in goodsinfo" :key="index">
            <li @click="setbookgoods(info.id,info.goodname)">
              <span>{{info.goodname}}</span>
              <span>￥{{info.goodprice}}</span>
            </li>
          </ul>
        </div>
      </el-form-item>
      <el-form-item label="做法" prop="making">
        <el-input type="textarea" v-model="uploadForm.making"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="upload" type="primary" @click="submitForm('uploadForm')">分享</el-button>
        <el-button @click="resetForm('uploadForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getLocalStorage } from "@/utils/localStorage";
import { Message } from "element-ui";
import axios from "axios";
import back from "../components/back";

export default {
  components: { back },
  data() {
    return {
      uploadForm: {
        title: "",
        context: "",
        making: "",
        userid: "",
        dialogImageUrl: "",
        dialogVisible: false,
        tags: []
      },
      rules: {
        title: [{ required: true, message: "不能为空", trigger: "blur" }],
        context: [{ required: true, message: "不能为空", trigger: "blur" }],
        making: [{ required: true, message: "不能为空", trigger: "blur" }]
      },
      goodsinfo: [],
      show: false,
      setinfo: { userid: "", goodid: 0, cbtitle: "", goodname: "" }
    };
  },
  methods: {
    handleClose(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
    },
    submitForm(uploadForm) {
      let userid = JSON.parse(getLocalStorage("userid"));
      this.uploadForm.userid = userid;
      /*console.log(userid+this.uploadForm.userid)*/
      this.$refs[uploadForm].validate(valid => {
        if (valid) {
          let uploadinfo = this.uploadForm;
          console.log(uploadinfo);
          this.$api.user.sharebooks(uploadinfo).then(res => {
            console.log("share" + res.data); /*  */
            this.$message("分享成功");
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    searchgood(goodname) {
      this.$api.user.searchgood(goodname).then(res => {
        console.log(res.data);
        if (res.code == 1) {
          this.goodsinfo = res.data;
          this.show = true;
          console.log(this.goodsinfo + JSON.stringify(this.goodsinfo));
        }
        if (res.code == 0) {
          this.$message("暂无此商品");
        }
        let form = this.uploadForm;
        form.tags.push(goodname);
        console.log(form.tags);
      });
    },
    setbookgoods(id, name) {
      let userid = JSON.parse(getLocalStorage("userid"));
      let cbtitle = this.uploadForm.title;
      let goodid = id;
      let setinfo = this.setinfo;
      setinfo.userid = userid;
      setinfo.cbtitle = cbtitle;
      setinfo.goodid = goodid;
      setinfo.goodname = name;
      console.log(setinfo);
      this.$api.user.setbookgoods(setinfo).then(res => {});
      this.show = false;
    },
    resetForm(uploadForm) {
      this.uploadForm.tags = [];
      this.setinfo = {};
      this.$refs[uploadForm].resetFields();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  font-size: 15px; /**icon size */
}
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
  margin-left: 50px;
  margin-right: 50px;
  text-align-last: justify;
  font-size: 15px;
  margin-top: 20px;
}
.upload {
  background-color: rgb(207, 207, 164);
  border: 1px solid rgb(187, 187, 147);
}
.good {
  margin-right: 5px;
  width: 150px;
}
.goodslist {
  background-color: blanchedalmond;
  position: absolute;
  left: 0px;
  top: 32px;
  width: 180px;
  z-index: 1000;
}
li {
  font-size: 13px;
  list-style-type: none;
}
li:hover {
  background-color: rebeccapurple;
}
.el-button:active {
  background-color: rgb(187, 187, 120);
  border: none;
}
.el-button:visited {
  background-color: rgb(221, 221, 188);
  border: none;
}
.el-button:hover {
  background-color: rgb(221, 221, 188);
  border: none;
  color: white;
}
</style>