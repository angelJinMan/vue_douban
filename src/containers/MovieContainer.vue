<template>
    <div class="container">
        <div class="menu">
            <router-link to='/movie/movieList/in_theaters'>正在热映</router-link>
            <router-link to='/movie/movieList/coming_soon'>即将上映</router-link>
            <router-link to='/movie/movieList/top250'>Top250</router-link>
        </div>
        <div class="right">
            <div class="search">
                <input>
                <button>搜索</button>
            </div>
            <div class="content">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .container{
        height: 100%;
        display: flex;
    }

    .menu{
        background-color: orangered;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }

    .menu a{
        color: white;
        padding-top: 2rem;
    }

    .menu a:hover{
        color: gold;
        font-weight: 700;
    }

    .right{
        background-color: skyblue;
        flex: 3.5;
    }

    .search{
        background-color: #00B83F;
        height: 7%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .search input{
        width: 80%;
        border-radius: 10px 0 0 10px;
        text-indent: .5em;
    }

    .content{
        height: 93%;

    }

    a.current{
        color:gold;
        font-weight: 700;
    }

</style>
<script>
    export default{
        data(){
            return {}
        }
    }
</script>