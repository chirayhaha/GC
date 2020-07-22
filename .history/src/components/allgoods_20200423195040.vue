<template>
    <div class="allgoods">
        <div class="top"><span class="title">店铺商品</span><back></back></div>
        <div class="goodspage">
        <ul v-for="(good,index) in goodsinfo" :key="index">
          <li class="gname">{{good.goodname}}</li>
          <li class="price">￥{{good.goodprice}}</li>
          <li class="num">剩余<br />
            ：{{good.goodnum}}
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
import { getLocalStorage } from "@/utils/localStorage";
import back from '../components/back'

    export default {
        name:'allgoods',
        data(){
            return{
                goodsinfo:[]
            }
        },
        components:{back},
        methods:{
            getallgoods(){
                let userid = JSON.parse(getLocalStorage('userid'))
                this.$api.user.getallgoods(userid).then(res=>{
                    this.goodsinfo = res.data
                    console.log(this.goodsinfo)
                })
            }
        },
        created(){
            this.getallgoods()
        }
    }
</script>

<style scoped>
*{padding: 0;margin: 0;}
.back{background-color: aquamarine;}
.top{
    text-align: center;
    border-bottom: 0.1px solid green;
    height: 40px;
}
.title{
    font-size: 22px;
    color: rgb(4, 143, 4);
    font-weight: bolder;
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
  border: 0.1px solid rgb(98, 177, 87);
}
li {
  list-style: none;
}
.gname {
  font-size: 17px;
  margin: 3px;
  color: rgb(29, 107, 13);
}
.price {
  position: relative;
  top: 50px;
  font-size: 14px;
  margin: 3px;
  color: rgb(103, 116, 100);
}
.num {
  font-size: 11px;
  margin: 3px;
  position: relative;
  left: 70px;
  bottom: 25px;
  color: rgb(112, 128, 109);
}
</style>