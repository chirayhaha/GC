<template>
    <div class="orderconfirm">
        <div class="top">
            <back></back>
        </div>
        <div class="middle">
            <div class="goods">
                <ul v-for="(good,index) in goodslist" :key="index">
                    <li>{{good.good.goodname}}</li>
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

</style>