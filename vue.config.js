module.exports = {	
	devServer: {
		proxy: {
			'/admin': {
				target: 'http://crmcs.gxk8090.com',
				ws: true,
				changOrigin: true,		//是否跨域
			}
		}
	}
}