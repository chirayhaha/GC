<template>
    <div class="storeinfo">
        <div class="top">
            <div>
                <span class="name">{{storeinfo.storename}}</span>
                <span class="phone">{{storeinfo.storephone}}</span>
            </div>
        </div>
        <div class="middle">
            
            
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
    height: 61px;
    border-bottom: 0.1px solid yellowgreen;
    background-color: aquamarine;
}
.middle{
    height: 520px;
    background-color: blueviolet;
}
.bottom{
    height: 78px;
    background-color: yellowgreen;
}
.name{
    font-size: 25px;
    position: relative;
    top: 28px;
    left: 5px;
}
</style>