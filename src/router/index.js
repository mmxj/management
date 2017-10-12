import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Message from '../components/Message'
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
import HealthStation from '../components/HealthStation' //卫生站管理
import HealthStationAdd from '../components/HealthStationAdd' //添加卫生站卫生站
import DoctorAdd from '../components/DoctorAdd'//添加村医
import DoctorManage from '../components/DoctorManage'//添加村医
import MerchantChannel from '../components/MerchantChannel' //导入商户信息
import BusinessIssue from '../components/BusinessIssue' //业务专区发布
import InformationUp from '../components/InformationUp'//信息专区发布
import PayData from '../components/PayData'//支付流水数据
import DataAdministration from '../components/DataAdministration'//绑卡数据管理
import Terminal from '../components/Terminal'//社保受理终端管理平台
import DataReport from '../components/DataReport' //数据报表
import UserDetails from '../components/UserDetails' //用户详情
import UserInformation from '../components/UserInformation' //基本信息
import Social from '../components/Social'//社保卡信息
import UserBank from '../components/UserBank' //银行卡信息
import UserFamily from '../components/UserFamily' //家人关系
import UserRecord from '../components/UserRecord' //使用记录
import UserTownship from '../components/UserTownship'//用户乡银宝
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/message',
      name: 'Message',
      component: Message
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
    },
    {
      path: '/healthstation',
      name: 'HealthStation',
      component: HealthStation
    },
    {
      path: '/healthstationadd',
      name: 'HealthStationAdd',
      component: HealthStationAdd
    },
    {
      path: '/doctoradd',
      name: 'DoctorAdd',
      component: DoctorAdd
    },
    {
      path: '/doctormanage',
      name: 'DoctorManage',
      component: DoctorManage
    },
    {
      path: '/merchantchannel',
      name: 'MerchantChannel',
      component: MerchantChannel
    },
    {
      path: '/businessissue',
      name: 'BusinessIssue',
      component: BusinessIssue
    },
    {
      path: '/informationup',
      name: 'InformationUp',
      component: InformationUp
    },
    {
      path: '/paydata',
      name: 'PayData',
      component: PayData
    },
    {
      path: '/dataadministration',
      name: 'DataAdministration',
      component: DataAdministration
    },
    {
      path: '/terminal',
      name: 'Terminal',
      component: Terminal
    },
    {
      path: '/datareport',
      name: 'DataReport',
      component: DataReport
    },
    {
      path: '/userdetails',
      component: UserDetails,
      children: [
        {
          path: '',
          name: 'UserInformation',
          component: UserInformation
        },
        {
          path: '/userdetails/social',
          name: 'Social',
          component: Social
        },
        {
          path: '/userdetails/bank',
          name: 'UserBank',
          component: UserBank
        },
        {
          path: '/userdetails/family',
          name: 'UserFamily',
          component: UserFamily
        },
        {
          path: '/userdetails/userrecord',
          name: 'UserRecord',
          component: UserRecord
        },
        {
          path: '/userdetails/usertownship',
          name: 'UserTownship',
          component: UserTownship
        }
      ]
    }
  ]
})
