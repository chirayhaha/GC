<template>
    <div class="searchbook">
        <div class="">
            <el-input v-model="bookname"></el-input>1<i class="el-icon-search"></i>
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
        }
    }
</script>

<style scoped>

</style>