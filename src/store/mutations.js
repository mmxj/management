/**
 * Created by 银信数据科技 on 2017/9/27.
 */
import {INCREMENT, SAVEDATA, SESSION, USER, USERNAME, HEALTH, LIST, URL} from './types'
import getters from './getters'
const state={
  show:false,
  getData:null,
  saveSession: null,
  userData: null,
  loginData: null,
  saveHealthData: null,
  addList: null,
  urlArr: null
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
  },
  [USER](state, userData){
    state.userData = userData
  },
  [USERNAME](state, loginData){
    state.loginData = loginData
  },
  [HEALTH](state, saveHealthData){
    state.saveHealthData = saveHealthData
  },
  [LIST](state, addList){
    state.addList = addList
  },
  [URL](state, urlArr){
    state.urlArr = urlArr
  }
}
export default{
  state,
  mutations,
  getters
}
