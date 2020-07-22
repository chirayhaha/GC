<template>
    <div class="orderconfirm">
        <div class="top">
            <back></back>
        </div>
        <div class="middle">
            <div class="goodslist">
                <ul v-for="(good,index) in goodslist" :key="index">
                    <li class="good">
                        <span class="name">{{good.good.goodname}}</span>
                        <span class="num">x{{good.goodnum}}</span>
                        <span class="price">￥{{good.good.goodprice}}</span>
                        <span class="goodtotal">￥{{good.good.goodprice*good.goodnum | moneyFilter}}</span>
                    </li>
                </ul>
            </div>
            
        </div>
        <div class="bottom"></div>
    </div>
</template>

<script>
import { getLocalStorage } from "@/utils/localStorage";
import { Message } from "element-ui";
import { toMoney } from "../moneyFilter";
import back from '../components/back';

    export default {
        name:'orderconfirm',
        data(){
            return{
                goodslist:[]
            }
        },
        components:{back},
        filters: {
            moneyFilter(money) {
            return toMoney(money);
            }
        },
        methods:{
            getorder(){
                let userid = JSON.parse(getLocalStorage('userid'))
                this.$api.user.getorder(userid).then(res=>{
                    this.goodslist =res.data
                    console.log(this.goodslist)
                })
            }
        },
        created(){
            this.getorder()
        },
    }
</script>

<style scoped>
*{margin: 0;padding: 0;}
.goodslist{
    width: 100%;
    height: 300px;
    background-color: aquamarine;
    margin: auto 10px;
    overflow: hidden;
}
.good{
    width: 100%;
    height: 80px;
    background-color: rgb(160, 103, 30);
}
</style>