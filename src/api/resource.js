import http from './request.js'
let path = {	
	loginCheck:"/login",											//验证是否登录／登录
	loginout:"/loginout",											//退出登录
	getUserList: 'user/userlist',		   							//用户列表
	getUserDetail:"user/userinfo",									//用户详情
	getTagInfo:"tag/addtag",										//新增标签原始信息
	getStore:"tag/store",											//获取店铺列表
	addTag:"tag/addtag",											//新增标签
	getTagList:"tag/taglist",										//标签列表
	settingTag:"tag/edit",											//标签操作
	tagDetail:"tag/onetaglist",										//标签详情
	asyncExport:"async/exportcsv",									//预约导出
	getAsyncMessage:"async/msglist",								//获取消息列表
	downCsv:"async/downcsv",										//下载
	keyWord:"word/list",											//关键词列表（已启用）
	stopKeyWord:"word/stoplist",									//关键词列表（已停用）
	settigKeyWord:"word/edit",										//关键字操作
	getTags:"tag/tags",												//获取所有标签
}
export default{
	//验证是否登录
	loginCheck(params){
		return http.get(path.loginCheck, params)
	},
	//登录
	login(params){
		return http.post(path.loginCheck, params)
	},
	//退出登录
	loginout(params){
		return http.get(path.loginout, params)
	},
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
	},
	//新增标签
	addTag(params){
		return http.post(path.addTag, params)
	},
	//标签列表
	getTagList(params){
		return http.get(path.getTagList, params)
	},
	//标签操作
	settingTag(params){
		return http.post(path.settingTag, params)
	},
	//标签详情
	tagDetail(params){
		return http.get(path.tagDetail, params)
	},
	//预约导出
	asyncExport(params){
		return http.post(path.asyncExport, params)
	},
	//获取消息列表
	getAsyncMessage(params){
		return http.get(path.getAsyncMessage, params)
	},
	//下载
	downCsv(params){
		return http.get(path.downCsv, params)
	},
	//关键词列表（已启用）
	keyWord(params){
		return http.get(path.keyWord, params)
	},
	//关键词列表（已停用）
	stopKeyWord(params){
		return http.get(path.stopKeyWord, params)
	},
	//关键字操作
	settigKeyWord(params){
		return http.post(path.settigKeyWord, params)
	},
	//获取所有标签
	getTags(params){
		return http.get(path.getTags, params)
	}
}









