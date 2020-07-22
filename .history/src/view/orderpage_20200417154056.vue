<template>
  <div class="orderpage">
    <div class="top">
        <span>我的订单</span>
    </div>
    <div class="middle">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="待支付" name="paying">待支付</el-tab-pane>
        <el-tab-pane label="已支付" name="payed">已支付</el-tab-pane>
        <el-tab-pane label="已接单" name="taken">已接单</el-tab-pane>
        <el-tab-pane label="已完成" name="fiinished">已完成</el-tab-pane>
      </el-tabs>
    </div>
    <div class="bottom"></div>
  </div>
</template>

<script>
export default {
  name: "orderpage",
  data() {
    return {};
  },
  methods: {
    handleClick(tab, event) {
    }
  },
  created(){
      this.handleClick()
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  font-family: "幼圆";
}
.orderpage {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.top {
  flex: 4;
  height: 50px;
  border-bottom: 0.1px solid rgb(233, 233, 217);
  text-align: center;
  margin-top: 25px;
  font-size: 20px;
  font-family: "幼圆";
  font-weight: bolder;
  color: rgb(187, 187, 98);
}
</style>