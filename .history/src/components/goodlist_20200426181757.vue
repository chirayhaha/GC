<template>
  <div class="goodlist">
    <div v-for="(good,index) in goodsinfo" :key="index">
      <ul>
        <li>
          <img class="goodpic" @click="goodsdetail(good.goodid)" :src="imgurl" />
          <span class="name" @click="goodsdetail(goodsinfo.goodid)">{{good.goodname}}</span>
          <img class="icon" src="../assets/images/car.png" @click="addcar(good.goodid)" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getLocalStorage, setLocalStorage } from "@/utils/localStorage";
import { Message } from "element-ui";

export default {
  name: "goodlist",
  data() {
    return {
      data: [], //根据商品id获取商品信息
      carinfo: { userid: "", goodid: 0, goodnum: 0 ,selected:0}, //插入数据库的购物车数据
      imgurl: require("@/assets/images/egg.jpg"),
      carid: 0,
      getbook: { userid: "", title: "" }, //存储传给后台用于查询食谱商品数据
      goodsinfo: [], //后台返回的食谱商品数据
      goodslist: []
    };
  },
  methods: {
    addcar(goodid) {
      this.$api.user.goodlist(goodid).then(res => {
        this.data = res.data;

        let userid = JSON.parse(getLocalStorage("userid"));
        this.$api.user.getcarinfo(userid).then(res => {
          this.goodslist = res.data;

          let isHave = this.goodslist.find((good)=>(good.good.id == goodid))
          if (!isHave) {
            let cargoodid = goodid;
            let caruserid = JSON.parse(getLocalStorage("userid"));
            this.carinfo.userid = caruserid;
            this.carinfo.goodid = cargoodid;
            this.carinfo.goodnum = 1;
            this.carinfo.selected = 0;
            this.$api.user.addcarlist(this.carinfo).then(res => {
              
            });

            this.$message("添加成功");
          } else {
            this.$message("已加入到购物车");
          }
        });
      });
    },
    goodsdetail(id) {
      //name=>params,path=>query
      this.$router.push({
        name: "goodsdetail",
        params: { id: id, imgurl: this.imgurl }
      });
    },
    getbookgood() {
      let userid = this.$route.params.userid;
      let title = this.$route.params.title;
      this.getbook.userid = userid;
      this.getbook.title = title;
      this.$api.user.getbookgoods(this.getbook).then(res => {
        this.goodsinfo = res.data;
      });
    }
    
  },
  created() {
    this.getbookgood();
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.goodlist {
  width: 100%;
  height: 80px;
  font-size: 13px;
  padding: 2px;
}
.goodpic {
  width: 40px;
  height: 40px;
  position: relative;
  left: 0;
  top: 0;
}
.icon {
  width: 30px;
  height: 30px;
  position: relative;
  right: 0;
}
.name {
  position: relative;
  top: 1%;
}
.price {
  position: relative;
  left: 0;
  bottom: 0;
}
li {
  background-color: rgb(243, 243, 231);
  width: 90px;
  height: 80px;
  float: left;
  margin-left: 5px;
  list-style: none;
}
</style>