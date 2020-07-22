<template>
    <div class="searchbook">
        <div class="">
            <el-input v-model="bookname" prefix-icon="el-icon-search"></el-input>
            <i class="el-icon-search" @click="searchbook"></i>
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
                console.log(bookname)
                this.$api.user.searchbook(bookname).then(res=>{
                    console.log(res.data)
                })
            }
        }
    }
</script>

<style scoped>

</style>