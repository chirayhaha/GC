<template>
    <div class="bottom">
      <router-link to="/"><div><img src="../assets/images/index.png"></div></router-link>
      <router-link to="/shopping"><div><img src="../assets/images/gwc.png"></div></router-link>
      <router-link to="/userinfo"><div><img src="../assets/images/wd.png"></div></router-link>
    </div> 
</template>

<script>
    export default {
        name:'bottom'
    }
</script>

<style scoped>
*{padding: 0;margin: 0;}
.bottom{
  border-top: 0.1px solid rgb(243, 243, 243);
  width: 100%;
  background-color: white;
  position: fixed;
  bottom: 0px;
}
.bottom div{
  width: 33%;
  float: left;
}
img{
  width: 70px;
  height: 70px;
  margin-left: 20%;
  margin-right: 20%;
}/*  */
</style>