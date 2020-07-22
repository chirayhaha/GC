<template>
  <div class="shopping">
    <bottom class="bottom"></bottom>
    <div class="top">
      <el-checkbox
        :indeterminate="isIndeterminate"
        v-model="checkAll"
        @change="handleCheckAllChange"
      >全选</el-checkbox>
      <img class="head" src="../assets/images/gwclogo.png" />
      <button class="clear" @click="clearall">清空</button>
    </div>
    <div class="gwc" v-for="(cart,index) in carinfo" :key="index">
      <img  />
      <div class="info">
        <div @click="selected(cart.good.id)">
          <el-checkbox class="checkbox" v-model="cart.good.selected==1"></el-checkbox>
        </div>
        <div>
          <img class="img" :src="goodslist.imgurl" />
        </div>
        <div class="name">
          {{cart.good.goodname}}
          <!-- {{goods.goodname}} -->
          <div class="num">
            <el-input-number
              v-model="cart.goodnum"
              size="mini"
              @change="addcginfo(cart.good.id,cart.goodnum)"
              :min="1"
            ></el-input-number>
          </div>
        </div>
        <div class="price">
          <div>
            ￥{{cart.good.goodprice}}
            <!-- {{goods.goodprice}} -->
          </div>
          <div>x{{cart.goodnum}}</div>
          <div class="goodtotal">￥{{cart.good.goodprice*cart.goodnum | moneyFilter}}</div>
        </div>
      </div>
    <div class="btns">
      <button class="del" @click="deletecart()">删除</button>
      <span class="sum">合计：￥{{total | moneyFilter}}</span>
      <button class="submit" @click="paybill">结算</button>
    </div>
  </div>
    </div>

</template>

<script>
import { getLocalStorage } from "@/utils/localStorage";
import { Message } from "element-ui";
import { toMoney } from "../moneyFilter";
import bottom from "../components/bottom";

export default {
  name: "shopping",
  components: { bottom },
  data() {
    return {
      goodslist: [],
      isSelect: false,
      sum: 0,
      isEmpty: false,
      cginfo: { userid: "", carid: 0, goodnum: [], goodid: 0 },
      carinfo: [], //通过userid从后台获取购物车信息
      checked: false,
      isIndeterminate: true,
      checkAll: false,
      delinfo: [],
      isRouterAlive: true
    };
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  },
  methods: {
    getgoodslist() {
      //得到购物车的商品
      if (localStorage.goodslist) {
        this.goodslist = JSON.parse(localStorage.goodslist);
      }
      /* console.log("goodslist" + JSON.stringify(this.goodslist)); */
      this.isEmpty = this.goodslist.length > 0 ? true : false;
    },
    clearall() {
      localStorage.removeItem("goodslist");
      this.goodslist = [];
      this.carinfo = [];
      let userid = JSON.parse(getLocalStorage("userid"));
      this.$api.user.clearcarlist(userid).then(res => {});
    },
    addcginfo(id, goodnum) {
      /* 
      this.goodslist.count++;

      let goodslist = JSON.parse(
        localStorage.goodslist
      ); 
      var goodnum = []
      this.goodslist.forEach(item=>{
        goodnum.push(item.count)
        console.log(goodnum)
      }) */
      let userid = JSON.parse(getLocalStorage("userid"));
      this.cginfo.userid = userid;
      this.cginfo.goodnum = goodnum;
      this.cginfo.goodid = id;
      /* console.log(goodid + goodnum+carid) */
      /* console.log('info'+JSON.stringify(this.cginfo)) */
      /* console.log(JSON.stringify(goodslist)) */
      this.$api.user.updatecarlist(this.cginfo).then(res => {});
    },
    getcarinfo() {
      let userid = JSON.parse(getLocalStorage("userid"));
      this.$api.user.getcarinfo(userid).then(res => {
        this.carinfo = res.data;
        // console.log("carinfo" + JSON.stringify(this.carinfo));
      }); /*  */
    },
    handleCheckAllChange(val) {
      this.carinfo.selected = val ? 1 : 0;
      this.isIndeterminate = false;
    },
    selected(goodid) {
      let userid = JSON.parse(getLocalStorage("userid"));
      let sinfo = { userid: "", goodid: 0 };
      sinfo.userid = userid;
      sinfo.goodid = goodid;
      // console.log("sinfo" + JSON.stringify(sinfo));
      this.$api.user.selected(sinfo).then(res => {});
    },
    unselected() {
      let userid = JSON.parse(getLocalStorage("userid"));
      let sinfo = { userid: "", goodid: 0 };
      sinfo.userid = userid;
      // console.log("sinfo" + JSON.stringify(sinfo));
      this.$api.user.unselected(sinfo).then(res => {});
    },
    paybill() {
      this.$router.push({ path: "/orderconfirm" });
    },
    deletecart() {
      this.$api.user.delcart().then(res=>{
        if(res.code==1){
          this.$message('删除成功')
          this.$router.push({path:'/shopping'})
        }
        else{
          this.$message('删除失败')
        }
      })
    }
  },
  created() {
    this.getgoodslist();
    this.getcarinfo();
    this.unselected();
  },
  computed: {
    total() {
      let sum = 0;
      this.carinfo.forEach((good, index) => {
        sum += good.good.goodprice * good.goodnum;
      });
      localStorage.goodslist = JSON.stringify(this.goodslist);
      return sum;
    }
  },
  destroyed() {}
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.shopping {
  position: absolute;
  left: 0;
  top: 30px;
  width: 100%;
  overflow-y: auto;
  height: 489.5px;
}
.top {
  width: 100%;
  height: 60px;
  position: fixed;
  top: 0;
  z-index: 1000;
  background-color: white;
  border-bottom: 0.1px solid rgb(221, 221, 221);
}
.head {
  width: 80px;
  height: 37px;
  padding: 8px;
  position: absolute;
  left: 40%;
}
.clear {
  border: none;
  padding-left: 4px;
  padding-right: 4px;
  padding-top: 3px;
  padding-bottom: 3px;
  border-radius: 5px;
  background-color: rgb(251, 252, 246);
  color: rgb(252, 133, 133);
  position: absolute;
  top: 20px;
  right: 15px;
}
.gwc {
}

hr {
  border: 0.1px solid rgb(243, 243, 243);
}
.info {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0.5rem;
  font-size: 0.85rem;
  border-bottom: 0.1px solid rgb(209, 203, 159);
  color: rgb(162, 175, 45);
}
.img {
  flex: 6; /* flex 共24格*/
  width: 80px;
  height: 80px;
}
.name {
  flex: 10;
  padding-left: 10px;
}
.price {
  flex: 6;
  text-align: right;
  text-align-last: right;
  margin-right: 10px;
}
.checkbox {
  flex: 2;
  position: relative;
  top: 30px;
}
.num {
  padding-top: 10px;
}
.goodtotal {
  color: rgb(86, 92, 10);
  font-weight: bolder;
  font-size: 1rem;
  float: right;
}
.sum {
  position: relative;
  left: 140px;
  top: 17px;
  font-weight: bolder;
  font-size: 1.05rem;
} /* */
.btns {
  position: fixed;
  bottom: 73px;
  height: 65px;
  width: 100%;
  border-top: 0.1px solid rgb(223, 221, 206);
  background-color: rgb(251, 252, 246);
  z-index: 1000;
}
.del {
  border: none;
  padding: 0px;
  color: red;
  background-color: white;
  position: relative;
  left: 20px;
  top: 12px;
}
.submit {
  border: none;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  position: relative;
  right: -40%;
  top: 12px;
  border-radius: 10px;
  background-color: rgb(221, 221, 147);
}
.bottom {
  position: fixed;
  bottom: 0px;
  background-color: white;
  z-index: 1000;
}
</style>