<template>
    <div class="searchbook">
        <div class="">
            <el-input v-model="bookname" label-width="100px"></el-input>
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
        }
    }
</script>

<style scoped>

</style>