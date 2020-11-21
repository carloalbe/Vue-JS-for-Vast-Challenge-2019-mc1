import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './components/Dashboard.vue'
import TableauRace from './components/TableauRace.vue'


Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'dashboard',
            component: Dashboard,
            props: true,
        }       ,
        {
            path: '/race',
            name: 'tableaurace',
            component: TableauRace,

        }
    ]
})
