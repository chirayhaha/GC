<template>
    <div class="search">
        <back></back>
        <el-select v-model="value" placeholder="请选择">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
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
                show:true,
                options:[{value:'食谱',label:'食谱'},{value:'商品',label:'商品'}]
            }
        }
    }
</script>

<style scoped>
*{margin: 0;padding: 0;}
.back{margin-top: 12px;}
.el-dropdown{
    position: relative;
    left: 60px;
    top: 15px;
    color: rgb(173, 173, 68);
    padding: 4px 7px;
    font-size: 13px;
}
.el-dropdown-menu{
    border: 0.1px solid rgb(187, 179, 71);
    border-radius: 0px;
}
</style>