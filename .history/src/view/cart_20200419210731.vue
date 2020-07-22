<template>
    <div class="cart">
        <div>
            <input type="checkbox" name="all" @click="chooseAll" v-model="selectArr.length==goodsList.length">
            <span>全选</span>
        </div>
        
    </div>
</template>

<script>
    export default {
        name:'cart'
    }
</script>

<style scoped>

</style>