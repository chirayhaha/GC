<template>
  <div class="takeorder">
    <div class="top">
      <back></back>
      <span>店铺订单</span>
    </div>
    <div class="middle">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="待接单" name="paying">
          <div v-for="(pay, id) in payinginfo" :key="id" class="payinginfo">
            <div>{{pay.storeid}}</div>
            <div class="list">
              <img />
              <div class="goodinfo">
                <div class="n">
                  <span class="name">{{pay.foodname}}</span>
                  <span class="label">待支付</span>
                  <!-- <span>goodprice</span> -->
                  <span class="num">x{{pay.ordernum}}</span>
                </div>

                <div class="total">
                  <span>实付：￥{{pay.total}}</span>
                </div>
              </div>
            </div>
            <button class="topay" @click="topay">支付</button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已接单" name="payed">
          <div v-for="(bill, index) in billinfo" :key="index" class="billinfo">
            <div>{{bill.storeid}}</div>
            <div class="list">
              <img />
              <div class="goodinfo">
                <div class="n">
                  <span class="name">{{bill.foodname}}</span>
                  <span class="label">已支付</span>
                  <!-- <span>goodprice</span> -->
                  <span class="num">x{{bill.ordernum}}</span>
                </div>

                <div class="total">
                  <span>实付：￥{{bill.total}}</span>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="交易成功" name="taken">已接单</el-tab-pane>
      </el-tabs>
    </div>
    <div class="bottom">
      <div class="paypage" v-for="(pay, id) in payinginfo" :key="id" v-if="paypage">
        <span style="font-size:20px;margin-left:10px" @click="closepay">x</span>
        <div class="money">共支付:{{pay.total}}</div>
        <button class="paybtn" @click="paybill(pay)">支付</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "takeorder"
};
</script>

<style scoped>
</style>