<template>
    <div class="searchgoods">
<div class="input">
            <el-input v-model="goodname" prefix-icon="el-icon-search" 
            placeholder="请输入商品关键字" class="sinput" 
            @keyup.enter.native ="searchgood"></el-input>
            <i class="el-icon-search" @click="searchgood"></i>
        </div>
        <span class="sres" v-if="res">搜索到‘{{goodname}}’相关食谱{{goods.length}}条</span>
        <div class="middle" v-for="(good,index) in goods" :key="index">
            <div class="result">
                <p style="color: rgb(177, 177, 43);">{{good.goodname}}</p>
                <p style="color: rgb(175, 175, 135);">￥{{good.goodprice}}</p>
                <p style="color: rgb(175, 175, 135);font-size:12px">库存{{good.goodnum}}</p>
            </div>
        </div>
        <div class="none" v-if="none">暂无相关食谱，欢迎补充噢！</div>
    </div>
</template>

<script>
    export default {
        name:'searchgood',
        data(){
            return{
                goodname:'',
                goods:[],
                none:false,
                res:false
            }
        },
        methods:{
            searchgood(){
                let goodname = this.goodname
                this.$api.user.searchgood(goodname).then(res=>{
                    if(res.data.length>0){
                        this.goods = res.data
                        this.res = true
                    }
                    else{
                        this.none = true
                    }
                    
                    console.log(res.data)
                })
            }
        }
    }
</script>

<style scoped>
*{padding: 0;margin: 0;}
.sinput{
    width: 190px;
    margin-right: 10px;
}
.input{
    position: relative;
    left: 135px;
    bottom: 30px;
}
.middle{
    position: relative;
    top: -10px;
}
.result{
    float: left;
    height: 100px;
    width: 100px;
    padding: 3px 5px;
    margin: 5px 15px;
    border: 0.1px solid rgb(141, 141, 57);
}
p{
    overflow: hidden;
    line-height: 2rem;
    margin-left: 5px;
}
.sres{
    font-size: 12px;
    color: rgb(158, 158, 141);
    position: relative;
    top: -15px;
    margin-left: 18px;
}
</style>