<template>
    <div class="back">
        <p @click="back">返回</p>
    </div>
</template>

<script>
    export default {
        name:'back',
        methods:{
            back(){
                this.$router.go(-1)
            },
        }
    }
</script>

<style scoped>
*{margin: 0;padding: 0;}
    .back{
        font-size: 13px;
        position: absolute;
        left: 0px;
        top: 0;
        color: rgb(99, 100, 28);
        font-weight: bolder;
        font-family: '幼圆';
        background-color: rgb(216, 216, 170);
        width: 50px;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
    }
    p{
        margin: 5px auto;
        float: right;
        margin-right: 7px;
    }

</style>