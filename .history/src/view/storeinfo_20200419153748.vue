<template>
    <div class="storeinfo">
        <div class="top">
            <div>
                <span class="name">{{storeinfo.storename}}</span>
                <div class="pa">
                    <p class="phone">{{storeinfo.storephone}}</p>
                    <p class="add">{{storeinfo.storeadd}}</p>
                </div>
                
            </div>
        </div>
        <div class="middle">
            <div class="indexpage" v-if="index">欢迎选购商品！</div>
            <div class="service" v-if="service">待完善……</div>
        </div>
        <div class="bottom">
            <div class="index"><i class="el-icon-house"></i></div>
            <div class="goods"><i class="el-icon-food"></i></div>
            <div class="ask"><i class="el-icon-service"></i></div><!--  -->
        </div>
    </div>
</template>

<script>
import {getLocalStorage} from "@/utils/localStorage";
import { Message } from "element-ui";
import { toMoney } from "../moneyFilter";
import back from "../components/back";

    export default {
        name:'storeinfo',
        data(){
            return{
                storeinfo:[],
                index:true,
                good:false,
                service:false
            }
        },
        components:{back},
        methods:{
            showstoreinfo(){
                let data = this.$route.params
                this.storeinfo = data.data
                console.log(JSON.stringify(this.storeinfo))
            }
        },
        created(){
            this.showstoreinfo()
        },
    }
</script>

<style scoped>
*{padding: 0;margin: 0;font-family: '幼圆';}
.top{
    height: 61px;
    border-bottom: 0.1px solid yellowgreen;
    background-color: aquamarine;
}
.middle{
    height: 520px;
    background-color: blueviolet;
}
.name{
    font-size: 27px;
    position: relative;
    top: 28px;
    left: 5px;
}

.pa{
    border-left: 0.1px solid yellow;
    padding-left: 10px;
    font-size: 12px;
    position: relative;
    left: 100px;
    top: 6px;
    line-height: 10px;
}
.bottom{
    height: 78px;
    background-color: yellowgreen;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    font-size: 55px;
    text-align: center;
    color: yellow;
    padding-top: 13px;
}
.index{
    flex: 8;
}
.goods{
    flex: 8;
}
.ask{
    flex: 8;
}
</style>