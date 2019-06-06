import Vue from 'vue'
import Router from 'vue-router'

const login = resolve=>require(['@/components/Login/login'],resolve)
const home = resolve=>require(['@/components/Home/home'],resolve)
const message = resolve=>require(['@/components/Home/Message/message'],resolve)
const index = resolve=>require(['@/components/Home/Index/index'],resolve)
const userList = resolve=>require(['@/components/Home/UserList/userList'],resolve)
const userInfo = resolve=>require(['@/components/Home/UserList/userInfo'],resolve)
const label = resolve=>require(['@/components/Home/Label/label'],resolve)
const labelDetail = resolve=>require(['@/components/Home/Label/labelDetail'],resolve)
const addLabel = resolve=>require(['@/components/Home/Label/addLabel'],resolve)
const keyword = resolve=>require(['@/components/Home/Keyword/keyword'],resolve)
const note = resolve=>require(['@/components/Home/Note/note'],resolve)
const send = resolve=>require(['@/components/Home/Note/send'],resolve)
const noteDetail = resolve=>require(['@/components/Home/Note/noteDetail'],resolve)

Vue.use(Router)

const router = new Router({
  routes: [
  {
    path: '/login',
    component: login,
  },
  {
    path: '/home',
    component: home,
    children:[
    { path: '/message',name:"消息中心", component: message},
    { path: '/index',name:"首页", component: index},
    { path: '/userList',name:"用户列表", component: userList},
    { path: '/userInfo',name:"用户列表／用户信息", component: userInfo},
    { path: '/label',name:"标签", component: label},
    { path: '/labelDetail',name:"标签／标签详情", component: labelDetail},
    { path: '/addLabel',name:"标签／新增标签", component: addLabel},
    { path: '/keyword',name:"关键字", component: keyword},
    { path: '/note',name:"短信管理／短信营销", component: note},
    { path: '/send',name:"短信管理／发送短信", component: send},
    { path: '/noteDetail',name:"短信管理／短信详情", component: noteDetail},
    ]
  }
  ]
})

export default router;