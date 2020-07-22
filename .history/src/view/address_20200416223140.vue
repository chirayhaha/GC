<template>
  <div class="address">
    <div class="top">
      <back class="back"></back>
      <router-link to="/adds" icon="el-icon-plus" class="el-icon-plus">添加地址</router-link>
    </div>

    <div class="addresslist">
      <div class="add">
        <ul v-for="(add,index) in adds" :key="index">
          <li @click="setaddress(add)">
            <span>
              {{add.province}}&nbsp;{{add.city}}&nbsp;{{add.area}}
              {{add.add}}&nbsp;{{add.conphone}}
            </span>
            <button class="del" @click="deladd(adds[index].id)">删除</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import back from "../components/back";
import { getLocalStorage ,setLocalStorage} from "@/utils/localStorage";

export default {
  name: "addaddress",
  components: { back },
  data() {
    return {
      adds: []
    };
  },
  methods: {
    addlist() {
      let userid = JSON.parse(getLocalStorage("userid"));
      /* console.log(userid) */
      this.$api.user.addlist(userid).then(res => {
        this.adds = res.data;
      });
    },
    deladd(idnum){
      this.$api.user.deladd(idnum).then(res=>{
        if(res.code==1){
          this.$message('删除成功')
          this.$router.push({path:'/addaddress'})
        }
        if(res.code==-1){
          this.$message('删除失败')
        }
      })
    },
    setaddress(add){
      let address = setLocalStorage('address',add)
      if(getLocalStorage('adress')){
        this.$router.push({path:'/orderconfirm'})
      }
    }
  },
  created() {
    this.addlist();
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  font-family: '幼圆';
}
.el-icon-plus {
  float: right;
  margin-right: 10px;
  border: none;
  background-color: white;
  font-size: 17px;
  font-family: "幼圆";
  color: rgb(199, 199, 145);
}
li{
  list-style-type: none;
  padding: 15px;
  border-bottom: 0.5px dotted rgb(212, 189, 84);
  line-height: 30px;
  overflow: auto;
}
.addresslist{
  position: absolute;
  top: 50px;
  margin: 20px;
}
.del{
  float: right;
  margin-right: 10px;
  border: none;
  background-color: rgb(233, 217, 147);
  padding: 5px 15px;
  border-radius: 8px;
}
</style>