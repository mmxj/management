/**
 * Created by 银信数据科技 on 2017/9/27.
 */
import * as types from './types'
export default {
  change:({
    commit
  })=>{
    commit(types.INCREMENT)
  },
  saveData:({//处理传进来的数据
    commit
  },saveData)=>{
    commit(types.SAVEDATA,saveData)//getData来自state
  },
  saveSession:({
    commit
  },saveSession)=>{
    commit(types.SESSION,saveSession)//用户session信息
  },
  userData: ({commit}, userData) => {
    commit(types.USER, userData)
  },
  loginData: ({commit}, loginData) => {
    commit(types.USERNAME, loginData)
  }
}
