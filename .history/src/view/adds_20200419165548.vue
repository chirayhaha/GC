<template>
  <div class="adds">
      <back></back>
    <el-form
      size="meduim"
      v-model="addressinfo"
      label-width="80px"
      :rules="rules"
      ref="addressinfo"
      class="addressinfo"
    >
      <el-form-item label="地级" prop="pca" class="address-item">
        <el-cascader v-model="addressinfo.pca" :options="options" @change="handleChange"></el-cascader>
      </el-form-item>
      <el-form-item label="详细地址" prop="address" class="address-item">
        <el-input
          @keyup.enter.native="addressaxios(addressinfo)"
          class="area"
          type="text"
          placeholder="详细地址"
          v-model="addressinfo.address"
        ></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="conphone" class="address-item">
        <el-input
          @keyup.enter.native="addressaxios(addressinfo)"
          class="area"
          type="text"
          placeholder="联系电话"
          v-model="addressinfo.conphone"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addressaxios(addressinfo)" class="submit_btn">添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import axios from "axios";
import back from "../components/back";
import { getLocalStorage } from "@/utils/localStorage";

export default {
  name: "adds",
  data() {
    return {
      addressinfo: { address: "", pca: [], userid: "", conphone: "" },
      rules: {
        pca:[{required: true, message: "不能为空", trigger: "blur" }],
        address:[{required: true, message: "不能为空", trigger: "blur" }],
        conphone:[{required: true, message: "不能为空", trigger: "blur", min:8,max:11}],
      },
      options: [
        {
          value: "广东省",
          label: "广东省",
          children: [
            {
              value: "广州市",
              label: "广州市",
              children: [
                {
                  value: "越秀区",
                  label: "越秀区"
                },
                {
                  value: "海珠区",
                  label: "海珠区"
                },
                {
                  value: "荔湾区",
                  label: "荔湾区"
                },
                {
                  value: "天河区",
                  label: "天河区"
                },
                {
                  value: "白云区",
                  label: "白云区"
                },
                {
                  value: "黄埔区",
                  label: "黄埔区"
                },
                {
                  value: "南沙区",
                  label: "南沙区"
                },
                {
                  value: "番禺区",
                  label: "番禺区"
                },
                {
                  value: "花都区",
                  label: "花都区"
                },
                {
                  value: "增城区",
                  label: "增城区"
                },
                {
                  value: "从化区",
                  label: "从化区"
                }
              ]
            }
          ]
        },
        {}
      ]
    };
  },
  components:{back},
  methods: {
    addressaxios(addressinfo) {
      let userid = JSON.parse(getLocalStorage("userid"));
      this.addressinfo.userid = userid;
      /* console.log(this.addressinfo.userid) */
      this.$api.user.addaddress(addressinfo).then(res => {
        if (res.code == 1) {
          this.$message("添加成功");
          this.$router.push({path:"/addaddress"})
        }
        if (res.code == -1) {
          this.$$message("添加失败");
        }
      });
    },
    handleChange(value) {
      this.addressinfo.pca = value;
      console.log(this.addressinfo);
      console.log(JSON.stringify(this.addressinfo.pca));
    }
  }
};
</script>

<style scoped>
*{margin: 0;padding: 0;}
.addressinfo {
  text-align-last: justify;
  position: absolute;
  top: 50px;
  margin: 25px;
}
.icon {
  width: 100%;
  height: 30px;
  text-align: center;
  font-size: 30px;
}
.submit_btn{
    background-color: rgb(199, 199, 153);
    border: none;
}
</style>