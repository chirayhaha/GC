<template>
    <div class="search">
        <!-- <back></back> -->
        <el-dropdown trigger="click" style="float:right">
      <span class="el-dropdown-link">
        <p class="plus">+</p>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item><a href="/share">发布食谱</a></el-dropdown-item>
        <el-dropdown-item>搜索</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
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