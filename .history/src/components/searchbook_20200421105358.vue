<template>
    <div class="searchbook">
        <div class="">
            <el-input v-model="bookname" prefix-icon="el-icon-search" 
            placeholder="请输入关键字" class="sinput"></el-input>
            <i class="el-icon-search" @click="searchbook"></i>
        </div>
        <div class="result"></div>
        <div class="none" v-if="none">暂无相关食谱，欢迎补充噢！</div>
    </div>
</template>

<script>
    export default {
        name:'searchbook',
        data(){
            return{
                bookname:'',
                books:[],
                none:false,
            }
        },
        methods:{
            searchbook(){
                let bookname = this.bookname
                this.$api.user.searchbook(bookname).then(res=>{
                    if(res.data.length>0){
                        this.books = res.data
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
    margin-left: 75px;
    width: 260px;
    margin-right: 10px;
}
</style>