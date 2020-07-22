<template>
    <div class="cart">
        <div>
            <input type="checkbox" name="all" @click="chooseAll" v-model="selectArr.length==goodsList.length">
            <span>全选</span>
        </div>
        <div v-for="(index,item) in goodsList" :key="item">
            <a href="javascript:;" ref="external nofollow" rel="external nofollow" rel="external nofollow" rel="external nofollow" rel="external nofollow"></a>
        </div>
    </div>
</template>

<script>
    export default {
        name:'cart',
        data(){
            return{
                goodsList:[{},{}],
                selectArr:[]
            }
        }
    }
</script>

<style scoped>

</style>