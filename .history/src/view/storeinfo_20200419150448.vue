<template>
    <div class="storeinfo">
        {{}}
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
        components:{},
        methods:{
            showstoreinfo(){
                let data = this.$route.params
                this.storeinfo = data
                console.log(JSON.stringify(data))
            }
        },
        created(){
            this.showstoreinfo()
        },
    }
</script>

<style scoped>

</style>