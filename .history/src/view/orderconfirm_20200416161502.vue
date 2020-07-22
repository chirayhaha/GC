<template>
    <div class="orderconfirm">
        <div class="top"></div>
        <div class="middle"></div>
        <div class="bottom"></div>
    </div>
</template>

<script>
import { getLocalStorage } from "@/utils/localStorage";
import { Message } from "element-ui";
import { toMoney } from "../moneyFilter";

    export default {
        name:'orderconfirm',
        data(){
            return{}
        },
        components:{},
        methods:{
            getorder(){
                let userid = JSON.parse(getLocalStorage('userid'))
                this.$api.user.getorder(userid).then(res=>{
                    console.log(res.data)
                })
            }
        },
        created(){
            this.getorder()
        },
    }
</script>

<style scoped>

</style>