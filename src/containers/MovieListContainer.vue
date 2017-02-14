<template>
    <div class="container">
        <div v-if="isLoading">
            正在请求数据。。。。
        </div>
        <div v-else>
            <div class="item" v-for="item in movieListData" @click="goDetail(item.id)">
                <img :src="item.images.small">
                <div>
                    <h1>{{item.title}}</h1>
                    <span>{{item.year}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .container{
        height: 100%;
        overflow-y: scroll;
    }
    .item{
        height: 12rem;
        width: 10rem;
        display: flex;
    }
    .item div{
        height: 5rem;
        display: flex;
        flex-direction: column;
    }

</style>
<script>
    import service from '../services/movieService.js'
    export default{
        data(){
            return {
                isLoading: true,
                movieListData:[],
                message:{
                    movieType:'in_theaters',
                    pageIndex:1,
                    start:0,
                    count:10
                }
            }
        },
        mounted(){
            this.fetch(this.message.movieType)
        },
        methods: {
            // 数据请求
            fetch(movieType) {
                const _this=this

                // 修改分页信息
                this.message.movieType=movieType
                this.message.start=(this.message.pageIndex-1)*this.message.count
                this.message.pageIndex++

                // 参数传递
                var message=JSON.stringify(this.message)
                const promise=service.getMovieListData(message)
                promise.then(
                        function (data) {
                            if(_this.movieListData.length>0){
                                _this.movieListData=_this.movieListData.concat(data.subjects)
                            }else{
                                _this.movieListData=data.subjects
                            }
                            _this.isLoading=false

                        },
                        function (err) {
                        }
                ).catch(function (err) {

                })
            },
            // 跳转详细
            goDetail(id){
                this.$router.push({path:`/movie/movieDetail/${id}`})
            }
        }
    }
</script>