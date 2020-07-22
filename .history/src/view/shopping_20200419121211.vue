<template>
  <div class="shopping">
    <div class="top">
      <img class="head" src="../assets/images/gwclogo.png" />
      <button class="clear" @click="clearall">清空</button>
    </div>
    <div class="gwc" v-for="(goods,index) in goodslist" :key="index">
      <img :src="imgurl" />
      <div class="info">
        <div>
          <img class="img" :src="goods.imgurl" />
        </div>
        <div class="name">
          {{carinfo.good.goodname}}<!-- {{goods.goodname}} -->
          <div class="num">
            <el-input-number v-model="goods.count" size="mini" @change="addcginfo" :min="1"></el-input-number>
          </div>
        </div>
        <div class="price">
          <div>￥{{carinfo.good.goodprice}}<!-- {{goods.goodprice}} --></div>
          <div>x{{goods.count}}</div>
          <div class="goodtotal">￥{{goods.goodprice*goods.count | moneyFilter}}</div>
        </div>
      </div>
    </div>

    <div class="btns">
      <button class="del">删除</button>
      <span class="sum">合计：￥{{total | moneyFilter}}</span>
      <button class="submit">结算</button>
    </div>
    <bottom class="bottom"></bottom>
    <!-- <p>{{carinfo.goodnum}}{{carinfo.good.goodname}}{{carinfo.good.goodprice}}</p> -->
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
      cginfo:{userid:'',carid:0,goodnum:[]},
      carinfo:[]
    };
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  },
  methods: {
    getgoodslist() {
      if (localStorage.goodslist) {
        this.goodslist = JSON.parse(localStorage.goodslist);
      }
      /* console.log("goodslist" + JSON.stringify(this.goodslist)); */
      this.isEmpty = this.goodslist.length > 0 ? true : false;
    },
    clearall() {
      localStorage.removeItem("goodslist");
      this.goodslist = [];
    },
    numAdd(goods, index) {
      //商品数量增加
      goods.num++;
      this.goodslist.count++
      if (goods.isSelect == true) {
        this.sum = this.sum + goods.money;
      } //已选择商品增加数量，需要增加总额
    },
    numDel(goods, index) {
      //商品数量减少
      goods.num--;
      if (goods.isSelect == true) {
        this.sum = this.sum - goods.money;
      } //已选择商品减少数量，需要减少总额
      if (goods.num == 0) {
        this.goodslist.splice(index, 1);
      } //数量减少为0，需要删除对应数据
    },
    addcginfo(){
      
      this.goodslist.count++

      let goodslist= JSON.parse(localStorage.goodslist)
      var goodnum = []
      this.goodslist.forEach(item=>{
        goodnum.push(item.count)
        console.log(goodnum)
      })
      let userid = JSON.parse(getLocalStorage('userid'))
      this.cginfo.userid = userid
      this.cginfo.goodnum = goodnum
      /* console.log(goodid + goodnum+carid) */
      /* console.log('info'+JSON.stringify(this.cginfo)) */
      /* console.log(JSON.stringify(goodslist)) */
      this.$api.user.updatecarlist(this.cginfo).then(res=>{})
    },
    getcarinfo(){
      let userid = JSON.parse(getLocalStorage('userid'))
      this.$api.user.getcarinfo(userid).then(res=>{
        this.carinfo=res.data
        console.log(this.carinfo)
      })/*  */
    }
  },
  created() {
    this.getgoodslist();
    this.addcginfo()
    this.getcarinfo()
  },
  computed: {
    total() {
      let sum = 0;
      this.goodslist.forEach((good, index) => {
        sum += good.goodprice * good.count;
      });
      localStorage.goodslist = JSON.stringify(this.goodslist);
      return sum;
    }
  }
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
  flex: 12;
  padding-left: 10px;
}
.price {
  flex: 6;
  text-align: right;
  text-align-last: right;
  margin-right: 10px;
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
}/* */
.btns {
  position: fixed;
  bottom: 73px;
  height: 65px;
  width: 100%;
  border-top: 0.1px solid rgb(223, 221, 206);
  background-color: rgb(251, 252, 246) ;
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
.bottom{
  position: fixed;
  bottom: 0px;
  background-color: white;
  z-index: 1000;
}
</style>