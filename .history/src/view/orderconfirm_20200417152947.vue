<template>
  <div class="orderconfirm">
    <div class="top">
      <span class="title">订单</span>
      <back></back>
    </div>
    <div class="middle">
      <div class="address" @click="adds" v-if="!show">
        <span class="pca">
          {{addresslist[0].province}}&nbsp;
          {{addresslist[0].city}}&nbsp;{{addresslist[0].area}}
          &nbsp;{{addresslist[0].add}}
          <br />
          {{addresslist[0].conphone}}
        </span>
        <i class="el-icon-arrow-right"></i>
      </div>
      <div class="address" @click="adds" v-if="show">
        <span class="pca">
          {{addresslist[no].province}}&nbsp;
          {{addresslist[no].city}}&nbsp;{{addresslist[no].area}}
          &nbsp;{{addresslist[no].add}}
          <br />
          {{addresslist[no].conphone}}
        </span>
        <i class="el-icon-arrow-right"></i>
      </div>
      <div class="goodslist">
        <ul v-for="(good,index) in goodslist" :key="index">
          <li class="good">
            <img class="img" />
            <span class="name">{{good.good.goodname}}</span>
            <span class="price">￥{{good.good.goodprice}}</span>
            <span class="num">x{{good.goodnum}}</span>
          </li>
        </ul>
      </div>
      <div class="paypage" v-if="paying">
        <span @click="submitbill">x</span>
        <br />
        <span>共：{{total |moneyFilter}}</span>
      </div>
    </div>
    <div class="bottom" v-if="!paying">
      <button class="pay" @click="submitbill">提交订单</button>
      <span class="total">合计：￥{{total| moneyFilter}}</span>
    </div>
    <div class="bottom" v-if="paying">
      <button class="pay" @click="paybill">支付</button>
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
import alladdress from "../view/address";

export default {
  name: "orderconfirm",
  data() {
    return {
      goodslist: [],
      addresslist: [],
      show: false,
      no: 0,
      paying: false,
      storeid: "",
      payinfo: {
        goodid: 0,
        userid: "",
        foodname: "",
        ordernum: 0,
        address: "",
        storeid: "",
        total: 0,
        conphone: 0
      }
    };
  },
  components: { back },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  },
  methods: {
    getorder() {
      let userid = JSON.parse(getLocalStorage("userid"));
      this.$api.user.getorder(userid).then(res => {
        this.goodslist = res.data;
        console.log(this.goodslist); /*  */
      });
    },
    getaddress() {
      let userid = JSON.parse(getLocalStorage("userid"));
      this.$api.user.getaddress(userid).then(res => {
        this.addresslist = res.data;
        /* console.log(this.addresslist); */
      });
    },
    adds() {
      this.$router.push({ path: "/addaddress" });
    },
    setadd() {
      let no = this.$route.params.id;
      /* console.log(no); */
      if (no) {
        this.no = no;
        this.show = true;
      }
    },
    payshow() {
      this.paying = !this.paying;
    },
    submitbill() {
      //shifouzhifi,gouwucheqingchu
      //userid,foodname,ordernum,address,storeid,total
      this.paying = !this.paying;
      let userid = JSON.parse(getLocalStorage("userid"));
      for (let i = 0; i < this.goodslist.length; i++) {
        let good = this.goodslist;
        let ordernum = good[i].goodnum;
        let foodname = good[i].good.goodname;
        let goodid = good[i].goodid;
        this.$api.user.goodlist(goodid).then(res => {
          this.storeid = JSON.parse(res.data.userid);
          console.log("userid" + JSON.stringify(this.storeid));
          let address =
            this.addresslist[this.no].province +
            this.addresslist[this.no].city +
            this.addresslist[this.no].area +
            this.addresslist[this.no].add;
          let conphone = this.addresslist[this.no].conphone;
          let total = this.total;
          console.log(
            address +
              JSON.stringify(foodname) +
              JSON.stringify(ordernum) +
              this.storeid +
              JSON.stringify(total)
          );
          let payinfo = this.payinfo;
          payinfo.userid = userid;
          payinfo.foodname = foodname;
          payinfo.ordernum = ordernum;
          payinfo.address = address;
          payinfo.storeid = res.data.userid;
          payinfo.total = total;
          payinfo.conphone = conphone;
          payinfo.goodid = goodid;
          console.log(JSON.stringify(payinfo) + payinfo.storeid);
          this.$api.user.createbill(payinfo).then(res => {
            if (res.code == 1) {
              /* this.$message({message:'提交订单成功',showClose: true,}) */
            } else {
              /* this.$message({message:'提交订单失败',showClose: true,}) */
            }
          });
        });
      }
    },
    paybill() {
      let userid = JSON.parse(getLocalStorage("userid"));
      for (let i = 0; i < this.goodslist.length; i++) {
        let good = this.goodslist;
        let ordernum = good[i].goodnum;
        let goodid = good[i].goodid;
        this.$api.user.goodlist(goodid).then(res => {
          this.storeid = JSON.parse(res.data.userid);
          console.log("userid" + JSON.stringify(this.storeid));
          let conphone = this.addresslist[this.no].conphone;
          let total = this.total;
          let payinfo = this.payinfo;
          payinfo.userid = userid;
          payinfo.ordernum = ordernum;
          payinfo.storeid = res.data.userid;
          payinfo.total = total;
          payinfo.conphone = conphone;
          payinfo.goodid = goodid;
          this.$api.user.paybill(this.payinfo).then(res => {
            console.log(JSON.stringify(res.data) + "data");
            if (res.code == 1) {
              this.$message({ message: "支付成功", showClose: true });
            } else {
              this.$message({ message: "支付失败", showClose: true });
            }
          });
        });
      }
    }
  },
  created() {
    this.getorder();
    this.getaddress();
    this.setadd();
  },
  computed: {
    total: function() {
      let total = 0;
      for (let i = 0; i < this.goodslist.length; i++) {
        let price = this.goodslist[i].good.goodprice;
        let num = this.goodslist[i].goodnum;
        total += price * num;
      }

      return total;
    }
  },
  destroyed() {
    removeLocalStorage("address");
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
.orderconfirm {
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
.address {
  display: flex;
  flex-direction: row;
  border-bottom: 0.1px solid rgb(233, 233, 217);
  height: 75px;
  margin-left: 20px;
}
.pca {
  flex: 22;
  font-size: 15px;
  margin-top: 10px;
  line-height: 1.2rem;
  overflow: hidden;
  color: rgb(110, 110, 70);
}
.el-icon-arrow-right {
  flex: 2;
  font-size: 30px;
  margin-right: 8px;
  margin-top: 25px;
  color: rgb(110, 110, 70);
}
.middle {
  flex: 16;
  height: 513px;
  overflow: hidden;
}
.bottom {
  flex: 4;
  height: 70px;
  border-top: 0.1px solid rgb(233, 233, 217);
  width: 100%;
  overflow-y: auto;
}
.goodslist {
  height: 300px;
  margin-left: 20px;
  margin-top: 20px;
  height: 442px;
}
.good {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 70px;
  border-bottom: 0.1px solid rgb(238, 238, 217);
  margin-bottom: 10px;
  padding-bottom: 10px;
  overflow: hidden;
}
.img {
  flex: 8;
  margin: 3px;
}
.name {
  flex: 5;
  position: relative;
  top: 15px;
  left: 10px;
  font-weight: bolder;
  color: rgb(184, 184, 113);
  letter-spacing: 5px;
}
.price {
  flex: 11;
  position: relative;
  left: 45px;
  top: 15px;
  font-size: 15px;
  color: rgb(218, 218, 137);
  font-weight: lighter;
}
.num {
  position: relative;
  right: 10px;
  top: 45px;
  font-size: 14px;
  color: rgb(216, 216, 147);
  font-weight: lighter;
}
.total {
  position: relative;
  top: 25px;
  left: 20px;
  color: rgb(224, 207, 47);
  font-weight: bolder;
}
.pay {
  border: none;
  width: 90px;
  height: 40px;
  border-radius: 20px;
  position: absolute;
  right: 10px;
  bottom: 15px;
  font-weight: bolder;
  color: #fffff7;
  background-color: rgb(197, 197, 151);
}
.paypage {
  background-color: aquamarine;
  height: 220px;
  position: relative;
  bottom: 220px;
  z-index: 1000;
}
</style>