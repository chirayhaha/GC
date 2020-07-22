<template>
  <div class="orderpage">
    <div class="top"></div>
    <div class="middle">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="first">待支付</el-tab-pane>
        <el-tab-pane label="配置管理" name="second">已支付</el-tab-pane>
        <el-tab-pane label="角色管理" name="third">已接单</el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth">已完成</el-tab-pane>
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