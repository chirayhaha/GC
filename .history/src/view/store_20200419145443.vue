<template>
    <div class="store">

    </div>
</template>

<script>
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage
} from "@/utils/localStorage";
import { Message } from "element-ui";
import { toMoney } from "../moneyFilter";
import back from "../components/back";

    export default {
        name:'store',
        components:{},
        methods:{},
        created(){},
    }
</script>

<style scoped>

</style>