<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
import bottom from "./components/bottom";

export default {
  name: "App",
  components: { bottom },
  data(){
    return{
      isRouterAlive: true
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}
#app {
  position: absolute;
  left: 0;
  right: 0;
  font-family: '幼圆';
}
hr {
  border: 0.1px solid rgb(226, 191, 191);
}

a {
}
</style>


