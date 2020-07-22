<template>
    <div class="storeinfo">
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
        components:{},
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

</style>