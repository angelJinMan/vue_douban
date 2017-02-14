<template>
    <div>
        movieSearchContainer
    </div>
</template>
<style>
</style>
<script>
    export default{
        data(){
            return {
            }
        },
        mounted(){
            console.log(this.$route)
            console.log(this.$route.params.keyword)
        }
    }
</script>