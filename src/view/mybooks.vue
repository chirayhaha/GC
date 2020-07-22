<template>
    <div class="mybooks">
        <div class="top">
            <back></back>
            <span>我的食谱</span>
        </div>
        <div class="booklist">
            <ul>
                <li v-for="(item,index) in data" :key="index">
                    <router-link :to="'/cookbooks/'+data[index].title+'/'+data[index].userid">
                        {{item.title}}
                    </router-link>
                    </li>
            </ul>
        </div>
        
    </div>
</template>

<script>
import { getLocalStorage } from "@/utils/localStorage";
import back from '../components/back';

    export default {
        name:'mybooks',
        components:{back},
        data(){
            return{
                data:[]
            }
        },
        created(){
            let userid = JSON.parse(getLocalStorage('userid'))
            this.$api.user.mybooks(userid).then(res=>{
                this.data=res.data
            })
        },
    }
</script>

<style scoped>
*{margin: 0;padding: 0;}
.booklist{
    border-top: 0.4px dashed rgb(172, 172, 126);
    margin-top: 10px;
    padding-top: 20px;
    background: linear-gradient(to right,rgba(255, 255, 255),rgba(250, 250, 223, 0.5));
}
li{
    list-style-type:square;
    margin-left: 3rem;
    margin-bottom: 10px;
    width: 100%;
    color: rgb(119, 119, 102);
    letter-spacing: 1.05rem;
}
.top{
    height: 30px;
    text-align: center;
    margin-top: 25px;
    font-size: 20px;
    font-family: '幼圆';
    font-weight: bolder;
    color: rgb(187, 187, 98);
}
a{
    text-decoration: none;
    color: rgb(141, 141, 121);
}
a:active{
    color:rgb(241, 241, 189)
}
</style>