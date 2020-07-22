<template>
    <div class="search">
        <back></back>
        <el-dropdown trigger="click">
            <span  class="el-dropdown-link">食谱<i class="el-icon-arrow-down el-icon--right"></i></span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click="show = true">食谱</el-dropdown-item>
                <el-dropdown-item @click="show = false">商品</el-dropdown-item>
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
.el-dropdown-link{
    border: 0.1px solid rgb(187, 179, 71);
    position: relative;
    left: 60px;
    top: 15px;
    color: rgb(133, 133, 72);
}
</style>