/**
 * Created by 银信数据科技 on 2017/9/27.
 */
import {INCREMENT,SAVEDATA,SESSION} from './types'
import getters from './getters'
const state={
  show:false,
  getData:null,
  saveSession:null
}
const mutations = {
  [INCREMENT](state){
    state.show=true
  },
  [SAVEDATA](state,saveData){//处理数据的方法
    state.getData=saveData
  },
  [SESSION](state,saveSession){
    state.saveSession=saveSession
  }
}
export default{
  state,
  mutations,
  getters
}
