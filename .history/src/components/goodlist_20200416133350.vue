<template>
  <div class="goodlist">
    <div v-for="(good,index) in goodsinfo" :key="index">
      <ul>
        <li>
          <img class="goodpic" @click="goodsdetail(data.id)" :src="imgurl" />
          <span class="name" @click="goodsdetail(goodsinfo.goodid)">{{good.goodname}}</span>
          <!-- <span class="price">￥{{good}}</span> -->
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
      carinfo: { userid: "", goodid: 0, goodnum: 0 }, //插入数据库的购物车数据
      imgurl: require("@/assets/images/egg.jpg"),
      carid: 0,
      getbook: { userid: "", title: "" }, //存储传给后台用于查询食谱商品数据
      goodsinfo: [], //后台返回的食谱商品数据
      goodslist: []
    };
  },
  methods: {
    addcar(goodid) {
      console.log(goodid);
      this.$api.user.goodlist(goodid).then(res => {
        this.data = res.data;

        /* let userid = localStorage.userid;
      let goodslist = localStorage.goodslist
        ? JSON.parse(localStorage.goodslist)
        : [];

      let isHave = goodslist.find(cart => cart.id == this.data.id);
      
      if (!isHave) {
        let newGoodslist = {
          goodname: this.data.goodname,
          goodprice: this.data.goodprice,
          id: this.data.id,
          count: 1,
          imgurl: this.imgurl,
          userid: userid
        };
        goodslist.push(newGoodslist); */

        let isHave = this.goodslist.find(cart => cart.good.id == goodid);
        console.log(isHave);
        if (isHave) {
          let cargoodid = goodid;
          let caruserid = JSON.parse(getLocalStorage("userid"));
          /* console.log(cargoodid+'goodid'+JSON.stringify(caruserid)) */
          this.carinfo.userid = caruserid;
          this.carinfo.goodid = cargoodid;
          this.carinfo.goodnum = 1;
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
      //   this.$router.push({ path: "/shopping" });
    },
    goodsdetail(id) {
      /* console.log(id); */
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
      /* console.log( 'title'+title) */
      this.$api.user.getbookgoods(this.getbook).then(res => {
        /* console.log(res.data) */
        this.goodsinfo = res.data;
        console.log(this.goodsinfo);
        /*   let good=[]
      this.goodsinfo.forEach((item,index)=>{
        good.push(item) 
      })
      console.log(good+"good")
        let goodid = this.goodsinfo.goodid
        this.$api.user.goodlist(good).then(res => {
          this.data = res.data;
          console.log(this.data)
        });  */
      });
    }
    /* getgoodinfo(id){
      this.$api.user.goodlist(id).then(res => {
      this.data.push(res.data) ;
      console.log(this.data)
    });
    } */
  },
  created() {
    /* console.log(this.goodname) */
    /* this.$api.user.goodlist(this.goodname).then(res => {
      this.data = res.data;
    }); */
    this.getbookgood();

    let userid = JSON.parse(getLocalStorage("userid"));
    this.$api.user.getcarinfo(userid).then(res => {
      this.goodslist = res.data;
      console.log(this.goodslist);
    });
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