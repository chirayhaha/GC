<template>
    <div class="orderdetail">

    </div>
</template>

<script>
    export default {
        name:'orderdetail',
        data(){
            return{

            }
        },
        methods:{
            orderdetail(){
                let orderid = this.$route.params
                console.log(orderid)
                this.$api.user.orderdetail(orderid).then(res=>{

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