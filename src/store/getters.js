/**
 * Created by 银信数据科技 on 2017/9/27.
 */
export default{
  show: (state) => {
    return state.show;
  },
  getData: (state) => {
    return state.getData;//返回数据出去
  },
  saveSession: (state) => {
    return state.saveSession;
  },
  userData: (state) => {
    return state.userData;
  },
  loginData: (state) => {
    return state.loginData
  },
  saveHealthData: (state) => {
    return state.saveHealthData
  },
  readList: (state) => {
    return state.addList
  },
  getUrlArr: (state) => {
    return state.urlArr
  }
}

