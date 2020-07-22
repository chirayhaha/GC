<template>
    <div class="search">
        <back></back>
        <div v-for="item in options">
            <el-select v-model="value" placeholder="请选择" size="mini">
                <el-option
                
                :key="item.value"
                :label="item.label"
                :value="item.value" @click="change(item.value)">
                </el-option>
            </el-select>
        </div>
        
        <searchbook v-if="show"></searchbook>
        <searchgoods v-if="!show"></searchgoods>
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
        },
        methods:{
            change(item){
                console.log(item)
                if(item =='食谱'){
                    this.show = true
                }
                if(item == '商品'){
                    this.show = false
                }
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