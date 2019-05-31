import http from './request.js'
let path = {	
	getUserList: 'user/userlist',		   							//用户列表
	getUserDetail:"user/userinfo",									//用户详情
	getTagInfo:"tag/addtag",										//新增标签原始信息
	getStore:"tag/store",											//获取店铺列表
}
export default{
	//获取用户列表(post)
	postUserList(params){
		return http.post(path.getUserList, params)
	},
	//获取用户列表(get)
	getUserList(params){
		return http.get(path.getUserList, params)
	},
	//用户详情
	getUserDetail(params){
		return http.get(path.getUserDetail, params)
	},
	//新增标签原始信息
	getTagInfo(params){
		return http.get(path.getTagInfo, params)
	},
	//获取店铺列表
	getStore(params){
		return http.get(path.getStore, params)
	}
}









