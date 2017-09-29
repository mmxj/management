/**
 * Created by 银信数据科技 on 2017/9/27.
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import mutations from './mutations'
import actions from './actions'
export default new Vuex.Store({
  modules:{
    mutations
  },
  actions
})
