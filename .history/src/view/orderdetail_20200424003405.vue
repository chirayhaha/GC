<template>
    <div class="orderdetail">

    </div>
</template>

<script>
    export default {
        name:'orderdetail',
        data(){
            return{
                orderinfo:[]
            }
        },
        methods:{
            orderdetail(){
                let orderid = JSON.parse(this.$route.params)
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