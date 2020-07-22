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
  },
  mounted(){
      this.money()
  },
  
 methods: {
 money:function(){
 this.allprice=0;
 this.mylist.forEach(item1 =>{
  item1.newlist.forEach(item2 =>{
  if(item2.check_one==true){
   this.allprice+=item2.price;
  }
  })
 })
  
 },
 check_all:function(){
 this.mylist.forEach(item1 => {
  item1.this_all=this.checkall
  item1.newlist.forEach(item2 => {
  item2.check_one=this.checkall
  })
 });
 this.money();
 },
 abc:function(){
 var this = this;
  var aaa = this.mylist.filter(item2 =>{
  return item2.this_all==true
 })
 aaa.length==this.mylist.length ? this.checkall = true : this.checkall = false
 this.money();
 },
  
 check_list:function(i){
 var this = this;
 this.mylist[i].newlist.forEach(item1 =>{
  item1.check_one=this.mylist[i].this_all
 })
 this.abc();
  
 },
  
 click_input:function(i,j){
 var this = this;
 var checklist = this.mylist[i].newlist.filter(item1 =>{
  return item1.check_one==true
 })
  
 checklist.length==this.mylist[i].newlist.length ? this.mylist[i].this_all = true : this.mylist[i].this_all = false
 this.abc();
  
 },
 btn:function(){
 var this = this; 
  
  
 this.cpmylist=JSON.parse(JSON.stringify(this.mylist));
 this.cpmylist.filter(item1 =>{
  item1.newlist = item1.newlist.filter(item2 =>{
  return item2.check_one==true
  })
 })
 this.cpmylist=this.cpmylist.filter(item3 =>{
  return item3.newlist.length!=0
 })
  
 if(this.cpmylist.length==0){
  alert("请选择商品哦！")
 }else{
  
  console.log("★★★您购买的商品是：");
  this.cpmylist.forEach(item4 =>{
  console.log("----------"+item4.oname+"店铺----------");
  item4.newlist.forEach(item5 =>{
   console.log("——>："+item5.newname);
  })
  })
 }
 }
 },
};
</script>

<style scoped>
</style>