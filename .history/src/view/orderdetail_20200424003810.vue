<template>
    <div class="orderdetail">

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

</style>