<template>
    <div class="orderconfirm">
        <div class="top">
            <back></back>
        </div>
        <div class="middle">
            <div class="address">
                <span class="pca">{{addresslist[0].province}}&nbsp;
                    {{addresslist[0].city}}&nbsp;{{addresslist[0].area}}
                    &nbsp;{{addresslist[0].add}}<br>{{addresslist[0].conphone}}</span>
                    <i class="el-icon-arrow-right"></i>
            </div>
            <div class="goodslist">
                <ul v-for="(good,index) in goodslist" :key="index">
                    <li class="good">
                        <img class="img">
                        <span class="name">{{good.good.goodname}}</span>
                        <span class="price">
                            ￥{{good.good.goodprice}}
                        </span>
                            <span class="num">x{{good.goodnum}}</span>
                        
                    </li>
                </ul>
            </div>
            
        </div>
        <div class="bottom">
            <button class="pay">提交订单</button>
            <span class="total">合计：￥{{total}}</span>
        </div>
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
                goodslist:[],
                addresslist:[],
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
                    /* console.log(this.goodslist) */
                })
            },
            getaddress(){
                let userid = JSON.parse(getLocalStorage('userid'))
                this.$api.user.getaddress(userid).then(res=>{
                    this.addresslist =res.data
                    console.log(this.addresslist)
                })
            }
        },
        created(){
            this.getorder()
            this.getaddress()
        },
        computed:{
            total:function(){
                let total=0
                for(let i=0;i<this.goodslist.length;i++){
                    let price = this.goodslist[i].good.goodprice
                    let num = this.goodslist[i].goodnum
                    total+=price*num
                }
                console.log(total)
                return total
            }
        }
    }
</script>

<style scoped>
*{margin: 0;padding: 0;overflow-x: hidden;font-family: '幼圆';}
.orderconfirm{
    display: flex;
    flex-direction: column;
    height: 100%;
}
.top{
    flex: 4;
    height: 50px;
    border-bottom: 0.1px solid rgb(233, 233, 217);
}
.address{
    display: flex;
    flex-direction: row;
}
.pca{
    flex: 22;
    font-size: 14px;
}
.el-icon-arrow-right{
    flex: 2;
    font-size: 40px;
    margin-right: 8px;
}
.middle{
    flex: 16;
    height: 518px;
    margin-top: 20px;
}
.bottom{
    flex: 4;
    height: 70px;
    border-top: 0.1px solid rgb(233, 233, 217);
    width: 100%;
    overflow-y: auto;
}
.goodslist{
    height: 300px;
    margin-left: 20px;
}
.good{
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 70px;
    border-bottom: 0.1px solid rgb(238, 238, 217);
    margin-bottom: 10px;
    padding-bottom: 10px;
}
.img{
    flex: 8;
    margin: 3px;
}
.name{
    flex: 5;
    position: relative;
    top: 15px;
    left: 10px;
    font-weight: bolder;
    color: rgb(184, 184, 113);
    letter-spacing: 5px;
}
.price{
    flex: 11;
    position: relative;
    left: 45px;
    top: 15px;
    font-size: 15px;
    color: rgb(218, 218, 137);
    font-weight: lighter;
}
.num{
    position: relative;
    right: 10px;
    top: 45px;
    font-size: 14px;
    color: rgb(216, 216, 147);
    font-weight: lighter;
}
.total{
    position: relative;
    top: 25px;
    left: 20px;
    color: rgb(224, 207, 47);
    font-weight: bolder;
}
.pay{
    border:none;
    width: 90px;
    height: 40px;
    border-radius: 20px;
    position: absolute;
    right: 10px;
    bottom: 15px;
    font-weight: bolder;
    color:#fffff7;
    background-color: rgb(197, 197, 151);
}
</style>