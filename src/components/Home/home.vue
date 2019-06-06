<template>
	<div class="box">
		<el-container style="height:100%">
			<el-aside style="background: #fff;border-right: 1px solid #eee">
				<div class="userInfo">
					用户数据分析系统
				</div>
				<el-menu :default-active="$rou" class="el-menu-vertical-demo" active-text-color="#ff5858" :unique-opened="true" :router="true" @select="handleSelect" >
					<el-menu-item index="/index">
						<i class="el-icon-menu"></i>
						<span slot="title">首页</span>
					</el-menu-item>
					<el-menu-item index="/userList">
						<i class="el-icon-user-solid"></i>
						<span slot="title">用户列表</span>
					</el-menu-item>
					<el-menu-item index="/label">
						<i class="el-icon-s-flag"></i>
						<span slot="title">标签</span>
					</el-menu-item>
					<el-menu-item index="/keyword">
						<i class="el-icon-s-help"></i>
						<span slot="title">关键字</span>
					</el-menu-item>
					<el-submenu index="/note">
						<template slot="title">
							<i class="el-icon-share"></i>
							<span>短信管理</span>
						</template>
						<el-menu-item-group>
							<el-menu-item index="/note">短信营销</el-menu-item>
							<el-menu-item index="/send">发送短信</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-menu-item index="/message">
						<i class="el-icon-s-comment"></i>
						<span slot="title">消息中心</span>
					</el-menu-item>
				</el-menu>
			</el-aside>
			<el-container>
				<el-header class="header">
					<div style="color: #ff5858">
						<div v-for="item in levelList">{{item.name}}</div>
					</div>
					<div class="headerRight">
						<div class="service">
							用户名称：<span>{{admin_name}}</span>
						</div>
						|
						<el-button style="margin-left: 20px" type="info" size="mini" round @click="exit">退出</el-button>
					</div>
				</el-header>
				<el-main>
					<keep-alive include="userList">
						<router-view></router-view>
					</keep-alive>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>
<style lang="less" scoped>
.box{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	.userInfo{
		background: #545c64;
		height: 120px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 22px;
		color: #fff;
	}
	.header{
		background: #fff;
		display:flex;
		justify-content: space-between;
		align-items: center;
		.headerRight{
			display:flex;
			align-items: center;
			.service{
				margin-right: 20px;
				display:flex;
				align-items: center;
				font-size: 14px;
				img{
					margin-right: 3px;
					width: 20px;
					height: 20px;
				}
				span{
					color: #ff5858;
				}
			}
		}
	}
}
</style>
<script>
	import resource from '../../api/resource.js'
	export default{
		data(){
			return{
				admin_name:"",
				activeIndex:"",
				levelList:[],
				rou:""
			}
		},
		created(){
			this.admin_name = sessionStorage.getItem("admin_name");
			//判断路由高亮
			this.rous();
			this.levelList = this.$route.matched.filter(item=>item.name);
		},
		watch:{
			$route(){
				//判断路由高亮
				this.rous();
				this.handleSelect(this.activeIndex);
				this.levelList = this.$route.matched.filter(item=>item.name)
			}
		},
		methods:{
			handleSelect(index){
				this.activeIndex = index;
			},
			//判断路由高亮
			rous(){
				if(this.$route.path == '/userInfo'){
					this.$rou = '/userList';
				}else if(this.$route.path == '/noteDetail'){
					this.$rou = '/note';
				}else if(this.$route.path == '/addLabel' || this.$route.path == '/labelDetail'){
					this.$rou = '/label';
				}else{
					this.$rou = this.$route.path;
				}
			},
			//点击退出
			exit(){
				this.$confirm('确认退出当前账户?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					resource.loginout().then(res => {
						if(res.data.code == 1){
							sessionStorage.clear();
							this.$message.success(res.data.msg)
							this.$router.push('/login');
						}else{
							this.$message.warning(res.data.msg)
						}
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消退出'
					});          
				});
			}
		}
	}
</script>









