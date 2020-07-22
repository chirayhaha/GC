<template>
    <div class="store">

    </div>
</template>

<script>
import {getLocalStorage} from "@/utils/localStorage";
import { Message } from "element-ui";
import { toMoney } from "../moneyFilter";
import back from "../components/back";

    export default {
        name:'store',
        components:{},
        methods:{
            showstoreinfo(){
                let data = this.$route.params
                console.log(data)
            }
        },
        created(){
            this.showstoreinfo()
        },
    }
</script>

<style scoped>

</style>