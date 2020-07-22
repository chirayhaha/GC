<template>
    <div class="search">
        <back></back>
        <searchbook></searchbook>
    </div>
</template>

<script>
import searchbook from '../components/searchbook';
import back from '../components/back'

    export default {
        name:'search',
        components:{searchbook,back}
    }
</script>

<style scoped>
*{margin: 0;padding: 0;}
.back{margin-top: 8px;}
</style>