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
                  <p>订单编号：{{pay.orderid}}</p>
                </div>
              </div>
            </div>
              <button class="topay" @click="topay">支付</button>
              <button class="topay" @click="cancelorder(pay)">取消订单</button>
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
                  <p>订单编号：{{bill.orderid}}</p>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已接单" name="taken">
          <div v-for="(taken, num) in takeninfo" :key="num" class="billinfo">
            <div>{{taken.storeid}}</div>
            <div class="list">
              <img />
              <div class="goodinfo">
                <div class="n">
                  <span class="name">{{taken.foodname}}</span>
                  <span class="label">已接单</span>
                  <!-- <span>goodprice</span> -->
                  <span class="num">x{{taken.ordernum}}</span>
                </div>
                <div class="total">
                  <span>实付：￥{{taken.total}}</span>
                  <p>订单编号：{{taken.orderid}}</p>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已完成" name="fiinished">已完成</el-tab-pane>
      </el-tabs>
    </div>
    <div class="bottom">
      <div class="paypage" v-for="(pay, id) in payinginfo" :key="id" v-if="paypage">
        <span style="font-size:20px;margin-left:10px" @click="closepay">x</span>
        <div class="money">共支付:{{pay.total}}</div>
        <button class="paybtn" @click="paybill(pay)">支付</button>
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
      checkinfo:{userid:'',orderid:''},
      paypage:false,
      takeninfo:[],
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
        /* console.log(res.data); */
        this.payinginfo = res.data;
      });
    },
    topay(){
      this.paypage = true
    },
    closepay(){
      this.paypage = false
    },
    paybill(pay){
      this.$api.user.paybill(pay).then(res=>{
        if(res.code==1){
          this.$message('支付成功')
          this.$router.push({path:'/oderpage'})
        }
      })
    },
    cancelorder(pay){
      this.$api.user.cancelorder(pay).then(res=>{
        if(res.code==1){
          this.$message('取消成功')
          this.$router.push({path:'/oderpage'})
        }
        if(res.code==-1){
          this.$message('取消失败')
          this.$router.push({path:'/oderpage'})
        }
      })
    },
    gettakenorder(){
      let userid = JSON.parse(getLocalStorage("userid"));
      this.$api.user.gettakenorder(userid).then(res => {
        console.log(res.data);
        this.takeninfo = res.data;
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
  top: 0px;
  text-align: right;
}
.label {
  color: rgb(206, 197, 81);
  position: absolute;
  left: 320px;
  font-size: 11px;
}
.bottom{
  width: 100%;
}
.paypage{
  height: 200px;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 10000;
  border-top: 0.1px solid rgb(201, 201, 172);
}
.paybtn{
  padding: 10px 25px;
  font-family: '幼圆';
  border: none;
  position: absolute;
  right: 15px;
  bottom: 10px;
  background-color: rgb(177, 177, 110);
  border-radius: 10px;
}
.money{
  height: 85px;
  font-size: 20px;
  padding: 20px;
  border-bottom: 0.1px solid rgb(190, 190, 151);
}
</style>