import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import PageForm from './views/PageForm'
import PageCountry from './views/PageCountry'
import PageCountryChart from './views/PageCountryChart'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/pageform',
            name: 'PageForm',
            component: PageForm,
            props: true
        },
        {
            path: '/pagecountry',
            name: 'PageCountry',
            component: PageCountry,
            props: true
        },
        {
            path: '/pagecountrychart',
            name: 'PageCountryChart',
            component: PageCountryChart,
            props: true
        }
    ]
})