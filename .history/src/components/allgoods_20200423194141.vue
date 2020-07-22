<template>
    <div class="allgoods">

    </div>
</template>

<script>
import { getLocalStorage } from "@/utils/localStorage";


    export default {
        name:'allgoods',
        data(){
            return{
                goodsinfo:[]
            }
        },
        methods:{
            getalgoods(){
                let userid = JSON.parse(getLocalStorage('userid'))
                this.$api.user.getallgoods(userid).then(res=>{
                    this.goodsinfo = res.data
                    console.log(this.goodsinfo)
                })
            }
        }
    }
</script>

<style scoped>

</style>