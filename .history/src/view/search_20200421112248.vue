<template>
    <div class="search">
        <!-- <back></back> -->
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click="show = true">食谱</el-dropdown-item>
            <el-dropdown-item @click="show = false">商品</el-dropdown-item>
        </el-dropdown-menu>
        <!-- <searchbook v-if="show"></searchbook>
        <searchgoods v-if="!show"></searchgoods> -->
    </div>
</template>

<script>
import searchbook from '../components/searchbook';
import searchgoods from '../components/searchgoods'
import back from '../components/back'

    export default {
        name:'search',
        components:{searchbook,back,searchgoods},
        data(){
            return{
                show:true
            }
        }
    }
</script>

<style scoped>
*{margin: 0;padding: 0;}
.back{margin-top: 12px;}
</style>