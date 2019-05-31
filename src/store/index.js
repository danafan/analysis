import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {  // 初始化数据，只要有可能的用到的最好都初始化
  		taskNum: 1,			//计划任务总数
  	},
  	mutations: {
      // 任务总数
      receiveNum(state, payload) {
        state.taskNum = payload.num
      }
    },
    actions: {
        // 获取用户信息
        // saveForm (context) {
        //   axios.get('/admin/admin/get_admin_info').then(res => {  
        //     context.commit('changeData', res.data.data)  
        //   })
        // }
      }
    })
export default store;

