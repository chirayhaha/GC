<template>
    <div class="cookbooks">
        <!-- <p class="back" @click="back">返回</p> -->
        <back></back>
        <h2>{{data.title}}</h2>
        <div class="context">
            <p><span>食材：</span>{{data.context}}</p><br>
            <p><span>做法：</span>{{data.making}}</p>
            <!-- <p>{{data.context.split('、')}}</p> -->
            <br>
            <goodlist></goodlist>
        </div>
    </div>
</template>

<script>
import { getLocalStorage } from '@/utils/localStorage'
import back from '../components/back'
import goodlist from '@/components/goodlist';

export default {
    components:{back,goodlist},
    data(){
        return{
            data:'',
            book:{
                title:'',
                userid:'',
            }
        }
    },
    created(){
        /* console.log('params：'+ JSON.stringify(this.$route.params)) */
        this.$api.user.readdetail(this.$route.params).then(res=>{//前端无传参所以requestbodynull
            /* console.log('res:'+JSON.stringify(res.data)) */
            this.data = res.data
      })
    }
}
</script>

<style scoped>
*{margin: 0;padding: 0;}
.cookbooks{
    width: 90%;
    position: absolute;
    left: 0;
    top: 0;
    line-height: 1.5rem;
}
h2{
    text-align: center;
    margin-top: 15%;
    color: rgb(187, 187, 98);
}
.context{
    margin-top: 5%;
    margin-bottom: 25px;
    margin-left: 2em;
    overflow-y: auto;
    overflow-x: hidden;
    color:rgb(119, 119, 102);
}
span{
    font-weight: bolder;
    font-size: 18px;
    color: rgba(233, 233, 122, 0.753);
}
</style>