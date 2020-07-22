<template>
  <div class="takeorder">
    <div class="top">
      <back></back>
      <span>店铺订单</span>
    </div>
    <div class="middle">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="待接单" name="taking">
          <div v-for="(taking, id) in takinginfo" :key="id" class="takinginfo">
            <div>{{taking.userid}}</div>
            <div class="list">
              <img />
              <div class="goodinfo">
                <div class="n">
                  <span class="name">{{taking.foodname}}</span>
                  <span class="label">待接单</span>
                  <!-- <span>goodprice</span> -->
                  <span class="num">x{{taking.ordernum}}</span>
                </div>
                <div class="total">
                  <span>实付：￥{{taking.total}}</span>
                </div>
              </div>
            </div>
            <button class="takebtn" @click="takeOrder(taking)">确认接单</button>
            <button class="takebtn" @click="cancelorder(taking)">取消订单</button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已接单" name="taken">
          <div v-for="(taken, index) in takeninfo" :key="index" class="takeninfo">
            <div>{{taken.userid}}</div>
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
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="交易成功" name="successbill">交易成功</el-tab-pane>

        <el-tab-pane label="失效" name="cancel">
          <div v-for="(cancel, no) in cancelinfo" :key="no" class="payinginfo">
            <div>{{cancel.userid}}<i class="el-icon-arrow-righ"></i></div>
            <div class="list">
              <img />
              <div class="goodinfo">
                <div class="n">
                  <span class="name">{{cancel.foodname}}</span>
                  <span class="label">取消订单</span>
                  <span class="num">x{{cancel.ordernum}}</span>
                </div>

                <div class="total">
                  <span>实付：￥{{cancel.total}}</span>
                  <p>订单编号：{{cancel.orderid}}</p>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="bottom"><!-- 
      <div class="takingpage" v-for="(taking, id) in takinginfo" :key="id" v-if="takingpage">
        <span style="font-size:20px;margin-left:10px" @click="closetaking">x</span>
        <div class="money">共支付:{{taking.total}}</div>
        <button class="takingbtn" @click="takingtaken(taking)">支付</button>
      </div> -->
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
  name: "takeorder",
  data() {
    return {
      activeName: "taking",
      takinginfo: [],
      takeninfo: [],
      cancelinfo:[],
    };
  },
  components:{back},
  inject:['reload'],  //注入reload方法
  methods: {
    handleClick(tab, event) {},
    gettaking() {
      let storeid = JSON.parse(getLocalStorage("userid"));
      this.$api.user.gettaking(storeid).then(res => {
        this.takinginfo = res.data;
        /* console.log(this.takinginfo); */
      });
    },
    gettaken() {
      let storeid = JSON.parse(getLocalStorage("userid"));
      this.$api.user.gettaken(storeid).then(res => {
        this.takeninfo = res.data;
        /* console.log(this.takeninfo); */
      });
    },
    takeOrder(taking) {
      this.$api.user.takeorder(taking).then(res=>{
          if(res.code==1){
              this.$message('接单成功')
              this.reload() 
          }
          if(res.code==-1){
              this.$message('出错，请重新接单')
              this.reload()
          }
      });
    },
    cancelorder(pay){
      this.$api.user.cancelorder(pay).then(res=>{
        if(res.code==1){
          this.$message('取消成功')
          this.reload()
        }
        if(res.code==-1){
          this.$message('取消失败')
          this.reload()
        }
      })
    },
    getCancelorders(){
      let userid = JSON.parse(getLocalStorage("userid"));
      this.$api.user.getCancelorders(userid).then(res => {
        console.log(res.data);/*  */
        this.cancelinfo = res.data;
      });
    },
  },
  created() {
    this.gettaking();
    this.gettaken()
    this.getCancelorders()
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

.back{background-color: rgb(94, 184, 91);color: white;}
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
  color: rgb(113, 187, 98);
}
.takeninfo {
  padding: 5px;
  width: 95%;
  margin-left: 5px;
}
.list {
  display: flex;
  flex-direction: row;
}
.takinginfo {
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
  color: rgb(106, 206, 81);
  position: absolute;
  left: 320px;
  font-size: 11px;
}
.bottom {
  width: 100%;
}
</style>