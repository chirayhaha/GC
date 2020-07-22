<template>
  <div class="storeinfo">
    <div class="top">
      <div>
        <span class="name">{{storeinfo.storename}}</span>
        <div class="pa">
          <p class="phone">{{storeinfo.storephone}}</p>
          <p class="add">{{storeinfo.storeadd}}</p>
        </div>
        <i class="el-icon-top-right" @click="back"></i>
      </div>
    </div>
    <div class="middle">
      <div class="indexpage" v-if="index">欢迎选购商品！</div>
      <div class="goodspage" v-if="good">
        <ul v-for="(good,index) in goodsinfo" :key="index" @click="goodsdetail(good.id)">
          <li class="gname">{{good.goodname}}</li>
          <li class="price">￥{{good.goodprice}}</li>
          <li class="num">
            剩余
            <br />
            ：{{good.goodnum}}
          </li>
          <li>
            <i class="el-icon-shopping-cart-2" @click="addcar(good.id)"></i>
          </li>
        </ul>
      </div>
      <div class="service" v-if="service">待完善……</div>
    </div>
    <div class="bottom">
      <div class="index" @click="showindex">
        <i class="el-icon-house"></i>
      </div>
      <div class="goods" @click="showgood">
        <i class="el-icon-food"></i>
      </div>
      <div class="ask" @click="showask">
        <i class="el-icon-service"></i>
      </div>
      <!--  -->
    </div>
  </div>
</template>

<script>
import { getLocalStorage ,setLocalStorage } from "@/utils/localStorage";
import { Message } from "element-ui";
import { toMoney } from "../moneyFilter";
import back from "../components/back";

export default {
  name: "storeinfo",
  data() {
    return {
      storeinfo: [],
      index: true,
      good: false,
      service: false,
      goodsinfo: [],

      goodslist: [],
      carinfo: { userid: "", goodid: 0, goodnum: 1, selected: 0 }, //插入数据库的购物车数据
      data: []
    };
  },
  components: { back },
  methods: {
    showstoreinfo() {
      let data = this.$route.params;
      let storeid = this.$route.params.storeid
      this.$api.user.getsellerinfo(storeid).then(res=>{
          this.storeinfo = res.data
        console.log(res.data)
      })
      this.storeinfo = data.data;
      /* console.log(JSON.stringify(this.storeinfo)) */
    },
    getallgoods() {
      let userid = this.storeinfo.userid;
      this.$api.user.getallgoods(userid).then(res => {
        this.goodsinfo = res.data;
        console.log(res.data);
      });
    },
    showindex() {
      this.index = true;
      this.good = false;
      this.service = false;
    },
    showask() {
      this.service = true;
      this.index = false;
      this.good = false;
    },
    showgood() {
      this.good = true;
      this.index = false;
      this.service = false;
    },
    back() {
      this.$router.go(-1);
    },
    addcar(goodid) {
      this.$api.user.goodlist(goodid).then(res => {
        this.data = res.data;

        let userid = JSON.parse(getLocalStorage("userid"));
        this.$api.user.getcarinfo(userid).then(res => {
          this.goodslist = res.data;
          console.log(this.goodslist);

          let isHave = this.goodslist.find(good => good.good.id == goodid);
          console.log(isHave);
          if (!isHave) {
            let cargoodid = goodid;
            let caruserid = JSON.parse(getLocalStorage("userid"));
            /* console.log(cargoodid+'goodid'+JSON.stringify(caruserid)) */
            this.carinfo.userid = caruserid;
            this.carinfo.goodid = cargoodid;
            this.carinfo.goodnum = 1;
            this.carinfo.selected = 0;
            this.$api.user.addcarlist(this.carinfo).then(res => {
              /* console.log(res.data) */
              this.carid = res.data[0].id;
              setLocalStorage("carid", this.carid);
            });

            this.$message("添加成功");
          } else {
            this.$message("已加入到购物车");
          }
        });
      });
      //   this.$router.push({ path: "/shopping" });
    },
    goodsdetail(id) {
      /* console.log(id); */
      //name=>params,path=>query
      this.$router.push({
        name: "goodsdetail",
        params: { id: id}
      });
    },
  },
  created() {
    let storeid = this.$route.params.storeid
    setLocalStorage('storeid',storeid)
    this.showstoreinfo();
    this.getallgoods();
  }
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  font-family: "幼圆";
}
.top {
  height: 63px;
  border-bottom: 0.1px solid rgb(235, 235, 225);
}
.middle {
  height: 517px;
}
.name {
  font-size: 27px;
  position: relative;
  top: 28px;
  left: 5px;
  color: rgb(199, 199, 59);
}

.pa {
  border-left: 0.1px solid rgb(190, 190, 49);
  padding-left: 10px;
  font-size: 12px;
  position: relative;
  left: 100px;
  top: 6px;
  line-height: 10px;
  color: rgb(187, 187, 110);
}
.el-icon-top-right {
  position: relative;
  left: 90%;
  font-size: 30px;
  bottom: 50px;
  color: rgb(143, 143, 94);
}
.bottom {
  height: 78px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  font-size: 55px;
  text-align: center;
  color: rgb(156, 156, 124);
  padding-top: 13px;
  border-top: 0.1px solid rgb(235, 235, 225);
}
.index {
  flex: 8;
}
.goods {
  flex: 8;
  font-size: 58px;
}
.ask {
  flex: 8;
}
.indexpage {
  text-align: center;
  font-size: 30px;
  color: rgb(134, 134, 75);
  padding: 30px;
}
.service {
  text-align: center;
  font-size: 30px;
  color: rgb(134, 134, 75);
  padding: 30px;
}
.goodspage {
  padding-top: 30px;
  height: 517px;
}
ul {
  width: 100px;
  height: 100px;
  float: left;
  margin: 7px 12px;
  border: 0.1px solid rgb(177, 177, 87);
}
li {
  list-style: none;
}
.gname {
  font-size: 17px;
  margin: 3px;
  color: rgb(107, 107, 13);
}
.price {
  position: relative;
  top: 50px;
  font-size: 14px;
  margin: 3px;
  color: rgb(116, 116, 100);
}
.num {
  font-size: 11px;
  margin: 3px;
  position: relative;
  left: 70px;
  bottom: 25px;
  color: rgb(128, 128, 109);
}
.el-icon-shopping-cart-2 {
  position: relative;
  left: 73px;
  font-size: 20px;
  color: rgb(161, 161, 36);
}
</style>