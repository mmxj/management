import Vue from 'vue'
import Router from 'vue-router'
import PageIndex from '../components/PageIndex.vue'
import User from '../components/User' //用户信息
import Merchant from '../components/Merchant' //商户信息
import MerchantAdd from '../components/MerchantAdd' //添加新商户
import MerchantCheck from '../components/MerchantCheck' //查阅商户证件
import Collaborate from '../components/Collaborate' //合作行业

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
    	},
      {
        path: '/merchantcheck',
        name: 'MerchantCheck',
        component: MerchantCheck
      },
      {
        path: '/collaborate',
        name: 'Collaborate',
        component: Collaborate
      }
  	]
})
