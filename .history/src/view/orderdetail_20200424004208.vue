<template>
    <div class="orderdetail">
        <div class="top">
            <back></back>
            <span class="title">订单详情</span>
        </div>
        <div class="middle" v-for="(order,index) in orderinfo" :key="index">
            <span class="sid">{{order.storeid}}</span>
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
}
.middle{
    height: 92%;
}
</style>