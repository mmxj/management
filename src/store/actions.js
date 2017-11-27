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
  },
  saveHealthData: ({commit}, saveHealthData) => {
    commit(types.HEALTH, saveHealthData)
  },
  addList: ({commit}, addList) => {
    commit(types.LIST, addList)
  },
  urlArr: ({commit}, urlArr) => {
    commit(types.URL, urlArr)
  },
  saveCollaborate: ({commit}, saveCollaborate) => {
    commit(types.COLL, saveCollaborate)
  },
  saveTerminal: ({commit}, saveTerminal) => {
    commit(types.TERMINAL, saveTerminal)
  },
  saveFatherResource: ({commit}, saveFatherResource) => {
    commit(types.RESOURCE, saveFatherResource)
  },
  saveChangeResource: ({commit}, saveChangeResource) => {
    commit(types.CHANGERESOURCE, saveChangeResource)
  },
  saveRole: ({commit}, saveRole) => {
    commit(types.ROLE, saveRole)
  }
}
