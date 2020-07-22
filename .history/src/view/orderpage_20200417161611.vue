<template>
  <div class="orderpage">
    <div class="top">
        <span>我的订单</span>
    </div>
    <div class="middle">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="待支付" name="paying">待支付</el-tab-pane>
        <el-tab-pane label="已支付" name="payed">
            <div v-for="(bill, index) in billinfo" :key="index" class="billinfo">
                <div>{{bill.storeid}}</div><br>
                <img>
                <span class="name">{{bill.foodname}}</span>
                <!-- <span>goodprice</span> -->
                <span class="num">x{{bill.ordernum}}</span>
                <span class="total">￥{{bill.total}}</span>
            </div>
        </el-tab-pane>
        <el-tab-pane label="已接单" name="taken">已接单</el-tab-pane>
        <el-tab-pane label="已完成" name="fiinished">已完成</el-tab-pane>
      </el-tabs>
    </div>
    <div class="bottom"></div>
  </div>
</template>

<script>
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage
} from "@/utils/localStorage";
import { Message } from "element-ui";
import { toMoney } from "../moneyFilter";
import back from "../components/back";

export default {
  name: "orderpage",
  data() {
    return {
        activeName:'payed',
        billinfo:[]
    };
  },
  methods: {
    handleClick(tab, event) {
    },
    getpayed(){
        let userid = JSON.parse(getLocalStorage('userid'))
        this.$api.user.getpayed(userid).then(res=>{
            console.log(res.data)
            this.billinfo = res.data
        })
    }
  },
  created(){
      this.handleClick()
      this.getpayed()
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  font-family: "幼圆";
}
.orderpage {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.top {
  flex: 4;
  height: 50px;
  border-bottom: 0.1px solid rgb(233, 233, 217);
  text-align: center;
  margin-top: 25px;
  font-size: 20px;
  font-family: "幼圆";
  font-weight: bolder;
  color: rgb(187, 187, 98);
}
.billinfo{
    background-color: antiquewhite;
    padding: 5px;
    width: 95%;
    margin-left: 5px;
}
img{width: 70px;height: 70px;}
.name{
    position: relative;
    bottom: 50px;
    left: 10px;
}
.num{
    position: relative;
    bottom: 50px;
    left: 50px;
}
.total{
    position: relative;
    bottom: 5px;
    right: 10px;
}
</style>