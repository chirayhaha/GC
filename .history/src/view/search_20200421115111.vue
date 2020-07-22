<template>
    <div class="search">
        <back></back>
        <el-select v-model="value" placeholder="请选择" size="mini">
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
                options:[{value:'食谱',label:'食谱'},{value:'商品',label:'商品'}],
                value:'食谱'
            }
        }
    }
</script>

<style scoped>
*{margin: 0;padding: 0;}
.back{margin-top: 12px;}
.el-select{
    font-size: 13px;
    width: 70px;
    position: relative;
    left: 50px;
    top: 7px;
    padding: 4px 7px;
    font-size: 13px;
}
.el-select-dropdown__item{
    color: rgb(136, 136, 90);
    font-weight: lighter;
    font-size: 13px;
}
</style>