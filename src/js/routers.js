import HomeContainer from '../containers/HomeContainer.vue'
import MovieContainer from '../containers/MovieContainer.vue'
import MovieListContainer from '../containers/MovieListContainer.vue'
import MovieDetailContainer from '../containers/MovieDetailContainer.vue'
import MovieSearchContainer from '../containers/MovieSearchContainer.vue'
import AboutContainer from '../containers/AboutContainer.vue'
import NotFoundContainer from '../containers/NotFoundContainer.vue'

export default [
    {path: '/home', component: HomeContainer},
    {
        path: '/movie',
        component: MovieContainer,
        beforeEnter: (to, from, next) => {
            next()
        },
        children: [
            {path: '', component: MovieListContainer},
            {path: 'movieList/:movieType', component: MovieListContainer},
            {path: 'movieDetail/:id', component: MovieDetailContainer},
            {path: 'movieSearch/:keyword', components: MovieSearchContainer}
        ]
    },
    {path: '/about', component: AboutContainer},
    {path: '/', redirect: '/home'},
    {path: '*', component: NotFoundContainer},
]