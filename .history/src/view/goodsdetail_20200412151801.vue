<template>
    <div class="goodsdetail">
        <back></back>
        <div class="img"><img :src="imgurl"></div>
        <div class="info">
            <div class="name"><span>{{detailinfo.goodname}}</span></div>
            <div class="num">剩余库存：<span>{{detailinfo.goodnum}}</span></div>
            <div class="price"><span>￥{{detailinfo.goodprice}}</span></div>
        </div>
        
        <div class="btns">
            <button class="car">加入购物车</button>
            <button class="buy">直接购买</button>
        </div>
    </div>
</template>

<script>
import back from '@/components/back';
    export default {
        name:'goodsdetail',
        components:{back},
        data(){
            return{
                imgurl:'',
                detailinfo:[]
            }
        },
        methods:{
            getgoodinfo(){
                let id = this.$route.params
                /* console.log(id) */
                this.$api.user.getgoodinfo(id).then(res=>{
                    this.detailinfo = res.data
                })
            }
            
        },
        created(){
            this.imgurl = this.$route.params.imgurl
            console.log(this.imgurl)
            this.getgoodinfo()
        }
    }
</script>

<style scoped>
*{margin: 0;padding: 0;}
.goodsdetail{
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    width: 100%;
}
img{
    width: 100%;
    height: 30%;
    border-bottom: 0.1px solid black;
    border-top: 0.1px solid black;
}
.info{
    flex: 4;
    line-height: 1.5rem;
    height: 95px;
    margin-top: 30px;
}
.name{
    letter-spacing: 1rem;
    font-size: 23px;
    font-family: '幼圆';
    font-weight: bolder;
    color: rgb(212, 193, 85);
    text-indent: 1rem;
}
.num{
    float: right;
    font-size: 13px;
    color: rgb(209, 209, 173);
    margin-right: 10px;
}
.price{
    margin-top: 20px;
    text-indent: 1rem;
    color: rgb(212, 153, 85);
    font-weight: lighter;
}
.img{
    flex:18;
    margin-top: 40px;
}
.btns{
    width: 100%;
    display:inline-flex;
    flex-direction: row;
    flex: 2;
    position: fixed;
    bottom: 10px;
}
.car{
    flex:12;
    height: 50px;
    margin-left: 8px;
    margin-right: 4px;
    background-color: rgb(229, 229, 194);
    border: 0;
    font-family: '幼圆';
    font-weight: bolder;
    font-size: 16px;
    letter-spacing: 0.5rem;
    border-radius: 12px;
}
.buy{
    flex:12;
    height: 50px;
    margin-right: 8px;
    margin-left: 4px;
    font-family: '幼圆';
    font-weight: bolder;
    font-size: 16px;
    letter-spacing: 0.5rem;
    border-radius: 12px;
    background-color: rgb(224, 207, 169);
    border: 0;
}
</style>