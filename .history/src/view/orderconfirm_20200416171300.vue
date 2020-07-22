<template>
    <div class="orderconfirm">
        <div class="top">
            <back></back>
        </div>
        <div class="middle">
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
*{margin: 0;padding: 0;overflow: hidden;font-family: '幼圆';}
.orderconfirm{
    display: flex;
    flex-direction: column;
    height: 100%;
}
.top{
    flex: 4;
    height: 50px;
    border-bottom: 0.5px solid yellow;
}
.middle{
    flex: 16;
    height: 538px;
}
.bottom{
    flex: 4;
    height: 70px;
    border-top: 0.5px solid yellow;
    width: 100%;
}
.goodslist{
    height: 300px;
    margin: auto 20px;
}
.good{
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 70px;
    background-color: rgb(255, 255, 234);
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
    color: yellow;
}
.price{
    flex: 11;
    position: relative;
    left: 45px;
    top: 18px;
    font-size: 13px;
    color: rgb(233, 233, 157);
    font-weight: lighter;
}
.num{
    position: relative;
    right: 10px;
    top: 45px;
    font-size: 13px;
    color: rgb(233, 233, 157);
    font-weight: lighter;
}
.goodtotal{
    position: relative;
    top: 45px;
    right: 5px;
}

.total{
    position: relative;
    top: 27px;
    left: 10px;
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
    color:rgb(255, 255, 238);
    background-color: rgb(197, 197, 151);
}
</style>