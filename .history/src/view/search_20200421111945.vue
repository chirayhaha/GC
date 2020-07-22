<template>
    <div class="search">
        <back></back>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>食谱</el-dropdown-item>
            <el-dropdown-item>商品</el-dropdown-item>
      </el-dropdown-menu>
        <searchbook></searchbook>
    </div>
</template>

<script>
import searchbook from '../components/searchbook';
import back from '../components/back'

    export default {
        name:'search',
        components:{searchbook,back}
    }
</script>

<style scoped>
*{margin: 0;padding: 0;}
.back{margin-top: 12px;}
</style>