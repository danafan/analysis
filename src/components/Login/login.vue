<template>
	<div>
		<el-card class="cardBox">
			<div class="title">数据分析系统</div>
			<div class="loginForm">
				<el-input class="input" v-model="phone" placeholder="请输入用户名" @keyup.enter.native="login"></el-input>
				<el-input class="input" type="password" v-model="password" placeholder="请输入密码" @keyup.enter.native="login"></el-input>
				<div class="input">
					<el-input v-model="code" placeholder="请输入验证码" @keyup.enter.native="login"></el-input>
					<div class="codeBox"><img class="code" :src="codeUrl" @click="getCode"></div>
				</div>
				<el-checkbox v-model="remember">记住密码</el-checkbox>
			</div>
			<el-button class="login" type="primary" @click="login">登录</el-button>
		</el-card>
	</div>
</template>
<style lang="less" scoped>
.cardBox{
	margin: 200px auto;
	width:380px;
	height: 460px;
	display: flex;
	flex-direction: column;
	align-items: center;
	.title{
		padding-bottom: 10px;
		border-bottom: 2px solid #f5f5f5;
		text-align: center;
		margin-top: 10px;
		font-size: 22px;
		font-weight: bold;
	}
	.loginForm{
		width: 100%;
		margin-top: 20px;
		.input{
			margin-bottom: 20px;
			display:flex;
		}
		.codeBox{
			border-radius: 5px;
			margin-left: 10px;
			border:1px solid #f5f5f5;
			height: 40px;
			width: 150px;
			.code{
				border-radius: 5px;
				width: 100%;
				height: 100%;
			}
		}
	}
	.login{
		width: 100%;
		margin-top: 30px;
	}
}
</style>
<script>
	import resource from '../../api/resource.js'
	export default{
		data(){
			return{
				phone:"",
				password:"",
				code:"",
				remember:false,	
				codeUrl:"",
				i:0
			}
		},
		created(){
			this.codeUrl = `${location.origin}/admin/login/captcha`;
			let phone = localStorage.getItem('phone');
			let password = localStorage.getItem('password');
			if(phone && password){
				this.phone = phone;
				this.password = password;
			}
		},
		methods:{
			getCode(){
				this.i += 1;
				this.codeUrl = `${location.origin}/admin/login/captcha?i=${this.i}`;
			},
			//点击登录
			login(){
				if(this.phone == ''){
					this.$message.warning("请输入用户名");
				}else if(this.password == ''){
					this.$message.warning("请输入密码");
				}else if(this.code == ''){
					this.$message.warning("请输入验证码");
				}else{
					if(this.remember == true){
						localStorage.setItem('phone', this.phone);
						localStorage.setItem('password', this.password);
					}else{
						localStorage.removeItem('phone', this.phone);
						localStorage.removeItem('password', this.password);
					}
					let obj = {
						admin_name:this.phone,
						password:this.password,
						captcha:this.code
					}
					resource.login(obj).then(res => {
						if(res.data.code == 1){
							sessionStorage.setItem("admin_id",res.data.data.admin_id);	
							sessionStorage.setItem("admin_name",res.data.data.admin_name);
							this.$message.success("登录成功");
							this.$router.push('/home');
						}else{
							this.$message.warning(res.data.msg);
						}
					})
				}
			}
		}
	}
</script>