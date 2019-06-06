<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
	import resource from './api/resource.js'
	export default {
		created(){
			resource.loginCheck().then(res => {
				if(res.data.code == 1){
					sessionStorage.setItem("admin_id",res.data.data.admin_id);	
					sessionStorage.setItem("admin_name",res.data.data.admin_name);
					if(this.$route.path == '/'){
						this.$router.push('/index');	
					}
				}else if(res.data.code == 0){
					this.$router.push('/login');
					this.$message.warning(res.data.msg);
				}else{
					this.$message.warning(res.data.msg);
				}
			})
		}

	}
</script>

