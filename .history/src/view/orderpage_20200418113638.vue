<template>
  <div class="orderpage">
    <div class="top">
      <back></back>
      <span>我的订单</span>
    </div>
    <div class="middle">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="待支付" name="paying">
          <div v-for="(pay, id) in payinginfo" :key="id" class="payinginfo">
            <div>{{pay.storeid}}</div>
            <div class="list">
              <img />
              <div class="goodinfo">
                <div class="n">
                  <span class="name">{{pay.foodname}}</span>
                  <span class="label">待支付</span>
                  <!-- <span>goodprice</span> -->
                  <span class="num">x{{pay.ordernum}}</span>
                </div>

                <div class="total">
                  <span>实付：￥{{pay.total}}</span>
                </div>
              </div>
            </div>
              <button class="topay">支付</button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已支付" name="payed">
          <div v-for="(bill, index) in billinfo" :key="index" class="billinfo">
            <div>{{bill.storeid}}</div>
            <div class="list">
              <img />
              <div class="goodinfo">
                <div class="n">
                  <span class="name">{{bill.foodname}}</span>
                  <span class="label">已支付</span>
                  <!-- <span>goodprice</span> -->
                  <span class="num">x{{bill.ordernum}}</span>
                </div>

                <div class="total">
                  <span>实付：￥{{bill.total}}</span>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已接单" name="taken">已接单</el-tab-pane>
        <el-tab-pane label="已完成" name="fiinished">已完成</el-tab-pane>
      </el-tabs>
    </div>
    <div class="bottom">
      <div class="paypage">
        <button>支付</button>
      </div>
    </div>
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
      activeName: "payed",
      billinfo: [],
      payinginfo: [],
      checkinfo:{userid:'',orderid:''}
    };
  },
  components: { back },
  methods: {
    handleClick(tab, event) {},
    getpayed() {
      let userid = JSON.parse(getLocalStorage("userid"));
      this.$api.user.getpayed(userid).then(res => {
        /* console.log(res.data) */
        this.billinfo = res.data;
      });
    },
    getpaying() {
      let userid = JSON.parse(getLocalStorage("userid"));
      this.$api.user.getpaying(userid).then(res => {
        console.log(res.data);
        this.payinginfo = res.data;
      });
    }
  },
  created() {
    this.handleClick();
    this.getpayed();
    this.getpaying();
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
.billinfo {
  padding: 5px;
  width: 95%;
  margin-left: 5px;
}
.list{
  
  display: flex;
  flex-direction: row;
}
.payinginfo {
  padding: 5px;
  width: 95%;
  margin-left: 5px;
}
img {
  width: 70px;
  height: 70px;
  flex: 6;
}
.goodinfo {
  display: flex;
  flex-direction: column;
  flex: 18;
  overflow: hidden;
}
.n {
  flex: 12;
}
.name {
  margin-left: 20px;
}
.num {
  position: absolute;
  left: 200px;
} 
.total {
  flex: 12;
  position: relative;
  left: 150px;
  top: 10px;
}
.label {
  color: rgb(206, 197, 81);
  position: absolute;
  left: 320px;
  font-size: 11px;
}
.paypage{
  height: 200px;
  background-color: yellowgreen;
}
</style>