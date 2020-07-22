<template>
    <div class="storeinfo">
        <div class="top">
            <div>
                <span class="name">{{storeinfo.storename}}</span>
                <div class="pa">
                    <p class="phone">{{storeinfo.storephone}}</p>
                    <p class="add">{{storeinfo.storeadd}}</p>
                </div>
                
            </div>
        </div>
        <div class="middle">
            <div class="indexpage" v-if="index">欢迎选购商品！</div>
            <div class="goodspage">
                <ul v-for="(good,index) in goodsinfo" :key="index">
                    <li>{{good.goodname}}</li>
                    <li>{{good.goodprice}}</li>
                    <li>{{good.goodnum}}</li>
                </ul>
            </div>
            <div class="service" v-if="service">待完善……</div>
        </div>
        <div class="bottom">
            <div class="index" @click="showindex"><i class="el-icon-house"></i></div>
            <div class="goods" @click="showgood"><i class="el-icon-food"></i></div>
            <div class="ask" @click="showask"><i class="el-icon-service"></i></div><!--  -->
        </div>
    </div>
</template>

<script>
import {getLocalStorage} from "@/utils/localStorage";
import { Message } from "element-ui";
import { toMoney } from "../moneyFilter";
import back from "../components/back";

    export default {
        name:'storeinfo',
        data(){
            return{
                storeinfo:[],
                index:true,
                good:false,
                service:false,
                goodsinfo:[]
            }
        },
        components:{back},
        methods:{
            showstoreinfo(){
                let data = this.$route.params
                this.storeinfo = data.data
                /* console.log(JSON.stringify(this.storeinfo)) */
            },
            getallgoods(){
                let userid = this.storeinfo.userid
                this.$api.user.getallgoods(userid).then(res=>{
                    this.goodsinfo= res.data
                    console.log(res.data)
                })
            },
            showindex(){
                this.index = true
                this.good = false
                this.service =false
            },
            showask(){
                this.service = true
                this.index = false
                this.good = false
            },
            showgood(){
                this.good = true
                this.index = false
                this.service = false
            }
        },
        created(){
            this.showstoreinfo()
            this.getallgoods()
        },
    }
</script>

<style scoped>
*{padding: 0;margin: 0;font-family: '幼圆';}
.top{
    height: 63px;
    border-bottom: 0.1px solid yellowgreen;
    background-color: aquamarine;
}
.middle{
    height: 517px;
    background-color: blueviolet;
}
.name{
    font-size: 27px;
    position: relative;
    top: 28px;
    left: 5px;
}

.pa{
    border-left: 0.1px solid yellow;
    padding-left: 10px;
    font-size: 12px;
    position: relative;
    left: 100px;
    top: 6px;
    line-height: 10px;
}
.bottom{
    height: 78px;
    background-color: yellowgreen;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    font-size: 55px;
    text-align: center;
    color: yellow;
    padding-top: 13px;
}
.index{
    flex: 8;
}
.goods{
    flex: 8;
}
.ask{
    flex: 8;
}
.indexpage{
    text-align: center;
    font-size: 30px;
    color: rgb(134, 134, 75);
    padding: 30px;
}
.service{
    text-align: center;
    font-size: 30px;
    color: rgb(134, 134, 75);
    padding: 30px;
}
.goodspage{
    background-color: blue;
    height: 300px;
}
ul{
    width: 90px;
    height: 90px;
    background-color: thistle;
    float: left;
    margin: 5px;
}
li{
    list-style: none;
}
</style>