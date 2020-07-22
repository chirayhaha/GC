<template>
  <div id="index">
    <img class="logo"  src="../assets/images/logo.png">
    
    <el-dropdown trigger="click" style="float:right">
      <span class="el-dropdown-link">
        <p class="plus">+</p>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item><a href="/share">发布食谱</a></el-dropdown-item>
        <el-dropdown-item><a href="/search">搜索</a></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <div class="cook">
      <!-- <div class="cookitem" v-bind:key="index"
      v-for="(art,index) in artlist" @click="open(artlist[index])"><h3>{{art.title}}</h3>
      <h5>作者：{{art.user.username}}</h5>
      </div> -->
      <div class="cookitem" v-bind:key="index"
      v-for="(art,index) in artlist">
      <router-link :to="'/cookbooks/'+artlist[index].title+'/'+artlist[index].userid">
      <p class="arttitle">{{art.title}}</p>
      </router-link>
      <p class="author">作者：{{art.user.username}}</p>
      </div>
    </div>
    <bottom></bottom>
  </div>
</template>

<script>
import axios from 'axios'
import {getLocalStorage} from '@/utils/localStorage'
import bottom from '../components/bottom'

export default {
  name: 'index',
  components:{bottom},
  data(){
    return {
      artlist:[],
      title:''
    }
  },
  methods:{
    /* open(art){
      let item = qs.stringify(art.title)    //work
      console.log(item)
      this.$api.user.readdetail(item).then(res=>{//前端无传参所以requestbodynull
        console.log('res'+res)
        this.$router.push({path:'/cookbooks',data:res.data})
      })
    } */
  },
  created(){ 
    this.$api.user.readcookbook().then(res =>{
      //console.log(res.data)//work
      this.artlist = res.data 
      this.title = res.data.title
    }).catch(error=>{}
    ) 
  },
  
}
</script>

<style scoped>
*{padding: 0;margin: 0;}
.logo{
  width: 100px;
  height: 50px;
  margin-top: 3px;
  margin-left: 3px;
}
.plus{
  font-size: 30px;
  margin-right: 25px;
  margin-top: 5px;
  color: rgb(121, 116, 95);
  font-weight: bolder;
}
.cook{
  width: 100%;
  margin-top: 4%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 32.1rem;
}
.cookitem{
  width: 100%;
  border-bottom: 0.1px solid rgb(255, 245, 151);
  line-height: 40px;
  margin-left: 3%;
  padding: 3px;
}
a{
  text-decoration: none;
  color: rgb(124, 123, 55);
  font-family: '幼圆';
  font-weight: bolder;
}
.author{font-size: 12px;color: rgb(212, 209, 161);}
.arttitle{font-size: 20px;}
</style>


