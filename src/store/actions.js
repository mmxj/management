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
  },getData)=>{
    commit(types.SAVEDATA,getData)//getData来自state
  }
}
