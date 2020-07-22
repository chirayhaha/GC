<template>
    <div class="searchbook">
        <div class="">
            <el-input v-model="bookname" prefix-icon="el-icon-search"></el-input>
            <i class="el-icon-search"></i>
        </div>
    </div>
</template>

<script>
    export default {
        name:'searchbook',
        data(){
            return{
                bookname:''
            }
        },
        methods:{
            searchbook(){
                let bookname = this.bookname
                this.$api.user.searchbook(bookname).then(res=>{
                    console.log(res.data)
                })
            }
        }
    }
</script>

<style scoped>

</style>