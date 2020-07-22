<template>
    <div class="orderdetail">
        <div class="top">
            <back></back>
            <span class="title">订单详情</span>
        </div>
        <div class="middle" v-for="(order,index) in orderinfo" :key="index">
            <div class="sid"><span>{{order.storeid}}</span></div>
            <div class="add">
                <span>{{order.address}}</span>
                <span></span>
                <span class="phone">{{order.conphone}}</span>
            </div>
            <div class="good">
                <span class="name"> foodname:{{order.foodname}} </span>
                <span class="num"> x{{order.ordernum}}</span>
                <span class="total">合计：￥{{order.total}}</span>
            </div>
            <div>
                <span class="orderid">orderid:{{order.orderid}} </span>
            </div>
            
        </div>

    </div>
</template>

<script>
import back from '../components/back';

    export default {
        name:'orderdetail',
        data(){
            return{
                orderinfo:[]
            }
        },
        components:{back},
        methods:{
            orderdetail(){
                let orderid = this.$route.params
                console.log(orderid)
                this.$api.user.orderdetail(orderid).then(res=>{
                    this.orderinfo = res.data
                    console.log(this.orderinfo)
                })
            }
        },
        created(){
            this.orderdetail()
        }
    }
</script>

<style scoped>
*{padding: 0;margin: 0;}
.top{
    height: 70px;
    text-align: center;
}
.title{
    font-size: 25px;
    color: rgb(150, 150, 63);
}
.middle{
    height: 92%;
}
.add{
    background-color: aliceblue;
    height: 50px;
    padding: 10px 20px;
    line-height: 1.5rem;
}
.good{
    height: 80px;
    background-color: aquamarine;
}
.good .name{
    position: relative;top: 10px;
}
</style>