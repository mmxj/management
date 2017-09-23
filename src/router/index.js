import Vue from 'vue'
import Router from 'vue-router'
import PageIndex from '../components/PageIndex.vue'
import User from '../components/User' //用户信息
import Merchant from '../components/Merchant' //商户信息
import MerchantAdd from '../components/MerchantAdd' //添加新商户
import MerchantCheck from '../components/MerchantCheck' //查阅商户证件
import Collaborate from '../components/Collaborate' //合作行业
import CollaborateAdd from '../components/CollaborateAdd' //新增合作行业
import CollaborateCheck from '../components/CollaborateCheck' //查看行业客户证件
import Order from '../components/Order' //订单管理
import Channel from '../components/Channel' //产品渠道管理
import UploadDir from '../components/UploadDir' //三大目录上传
import DirList from '../components/DirList' //三大目录列表
import DirManage from '../components/DirManage' //三大目录管理

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
      },
      {
        path: '/collaborateadd',
        name: 'CollaborateAdd',
        component: CollaborateAdd
      },
      {
        path: '/collaboratecheck',
        name: 'CollaborateCheck',
        component: CollaborateCheck
      },
      {
	      path: '/order',
        name: 'Order',
        component: Order
      },
      {
	      path: '/channel',
        name: 'Channel',
        component: Channel
      },
      {
        path: '/uploaddir',
        name: 'UploadDir',
        component: UploadDir
      },
      {
        path: '/dirlist',
        name: 'DirList',
        component: DirList
      },
      {
        path: '/dirmanage',
        name: 'DirManage',
        component: DirManage
      }

  	]
})
