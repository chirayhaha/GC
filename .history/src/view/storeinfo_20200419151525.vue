<template>
    <div class="storeinfo">
        <div class="top">
            <div><span class="name">{{storeinfo.storename}}</span></div>
        </div>
        <div class="middle">
            
            {{storeinfo.storephone}}
            {{storeinfo.storeadd}}
        </div>
        <div class="bottom"></div>
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
                storeinfo:[]
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
    height: 80px;
    background-color: aquamarine;
}
.middle{
    height: 500px;
    background-color: blueviolet;
}
.bottom{
    height: 78px;
    background-color: yellowgreen;
}
.name{
    font-size: 25px;
    position: relative;
    top: 30px;
    left: 5px;
}
</style>