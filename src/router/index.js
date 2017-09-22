import Vue from 'vue'
import Router from 'vue-router'
import PageIndex from '../components/PageIndex.vue'
import User from '../components/User'
import Merchant from '../components/Merchant'
import MerchantAdd from '../components/MerchantAdd'
Vue.use(Router)

export default new Router({
	mode: 'history',
  	routes: [
    	{
	      	path: '/',
	      	name: 'PageIndex',
	      	component: PageIndex
    	},
    	{
    		path: '/user',
    		name: 'User',
    		component: User
    	},
    	{
    		path: '/merchant',
    		name: 'Merchant',
    		component: Merchant
    	},
    	{
    		path: '/merchantadd',
    		name: 'MerchantAdd',
    		component: MerchantAdd
    	}
  	]
})
