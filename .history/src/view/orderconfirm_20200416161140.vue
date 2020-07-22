<template>
    <div class="orderconfirm">

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
            }
        },
        created(){},
    }
</script>

<style scoped>

</style>