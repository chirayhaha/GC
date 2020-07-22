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
            getallgoods(){
                let userid = JSON.parse(getLocalStorage('userid'))
                this.$api.user.getallgoods(userid).then(res=>{
                    this.goodsinfo = res.data
                    console.log(this.goodsinfo)
                })
            }
        },
        created(){
            this.getallgoods()
        }
    }
</script>

<style scoped>

</style>