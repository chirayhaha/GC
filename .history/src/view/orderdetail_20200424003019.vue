<template>
    <div class="orderdetail">

    </div>
</template>

<script>
    export default {
        name:'orderdetail',
        methods:{
            orderdetail(){
                let orderid = this.$route.params
                console.log(orderid)
            }
        },
        created(){
            this.orderdetail()
        }
    }
</script>

<style scoped>

</style>