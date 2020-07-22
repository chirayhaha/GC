<template>
  <div class="cart">
    全选
    <input type="checkbox" v-model="checkall" @change="check_all()" />
    <div v-for="(item,index) in mylist" :key="index">
      <span>{{item.oname}}</span>
      <input type="checkbox" v-model="item.this_all" @change="check_list(index)" />
      <p v-for="(goods,nindex) in item.newlist" :key="nindex">
        <input type="checkbox" v-model="goods.check_one" @change="click_input(index,nindex)" />
        {{goods.newname}}--{{goods.price}}元
      </p>
    </div>
    <p>总价：{{allprice}}</p>
    <button @click="btn()">提交订单</button>
  </div>
</template>

<script>
export default {
  name: "cart",
  data() {
    return {
      goodsList: [{}, {}],
      selectArr: []
    };
  }
};
</script>

<style scoped>
</style>