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
      mylist:[
    {oname:"第一个",this_all:true,newlist:[{newname:"篮球",check_one:true,price:600},{newname:"足球",check_one:true,price:200},{newname:"滑雪",check_one:true,price:150}]},
    {oname:"第二个",this_all:true,newlist:[{newname:"西瓜",check_one:true,price:35},{newname:"桃子",check_one:true,price:20}]},
    {oname:"第三个",this_all:true,newlist:[{newname:"英雄联盟",check_one:true,price:200}]},
  
   ],
   checkall:true,
   allprice:0,
   cpmylist:[]
    };
  }
};
</script>

<style scoped>
</style>