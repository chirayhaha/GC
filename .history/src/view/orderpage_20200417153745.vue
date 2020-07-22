<template>
  <div class="orderpage">
    <div class="top"></div>
    <div class="middle">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="待支付" name="first">待支付</el-tab-pane>
        <el-tab-pane label="已支付" name="second">已支付</el-tab-pane>
        <el-tab-pane label="已接单" name="third">已接单</el-tab-pane>
        <el-tab-pane label="已完成" name="fourth">已完成</el-tab-pane>
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
      console.log(tab, event);
    }
  }
};
</script>

<style scoped>
</style>