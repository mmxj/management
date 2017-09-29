/**
 * Created by 银信数据科技 on 2017/9/27.
 */
import {INCREMENT,SAVEDATA} from './types'
import getters from './getters'
const state={
  show:false,
  getData:null
}
const mutations = {
  [INCREMENT](state){
    state.show=true
  },
  [SAVEDATA](state,getData){//处理数据的方法
    state.getData=getData
  }
}
export default{
  state,
  mutations,
  getters
}
