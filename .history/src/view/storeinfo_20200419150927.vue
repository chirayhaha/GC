<template>
    <div class="storeinfo">
        <div class="top">
            <back></back>
        </div>
        <div class="middle"></div>
        <div class="bottom"></div>
        {{storeinfo.storename}}
        {{storeinfo.storephone}}
        {{storeinfo.storeadd}}
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
*{padding: 0;margin: 0;}
.bottom{
    height: 80px;
    background-color: yellowgreen;
    position: absolute;
    bottom: 0;
}
</style>