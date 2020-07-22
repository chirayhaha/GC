<template>
    <div class="searchbook">
        <div class="">
            <el-input v-model="bookname">
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