<template>
    <div class="allgoods">
        <div class="goodspage" v-if="good">
        <ul v-for="(good,index) in goodsinfo" :key="index">
          <li class="gname" @click="goodsdetail(good.id)">{{good.goodname}}</li>
          <li class="price" @click="goodsdetail(good.id)">￥{{good.goodprice}}</li>
          <li class="num" @click="goodsdetail(good.id)">
            剩余
            <br />
            ：{{good.goodnum}}
          </li>
          <li>
            <i class="el-icon-shopping-cart-2" @click="addcar(good.id)"></i>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
import { getLocalStorage } from "@/utils/localStorage";


    export default {
        name:'allgoods',
        data(){
            return{
                goodsinfo:[]
            }
        },
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
</style>