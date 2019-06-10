<template>
	<div>
		<el-card>
			<div class="infoTitle"><div class="line"></div>发送短信</div>
			<el-form label-position="left" label-width="85px" :model="request" size="small">
				<el-form-item label="标签：">
					<el-select v-model="request.label" filterable clearable placeholder="请选择">
						<el-option v-for="(item,index) in labelList" :key="index" :label="item.tag_name" :value="item.tag_name">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="短信内容：">
					<el-input style="width: 500px" type="textarea" :rows="5" placeholder="请输入内容" v-model="request.content">
					</el-input>
				</el-form-item>
			</el-form>
			<div class="buts">
				<el-button class="but" type="primary" @click="send">发送</el-button>
			</div>
		</el-card>
	</div>
</template>
<style scoped lang="less">
.buts{
	margin-top: 20px;
	display: flex;
	justify-content: center;
	.but{
		width: 260px;
		height: 45px;
	}
}
</style>
<script>
	import resource from '../../../api/resource.js'
	export default{
		data(){
			return{
				request:{
					label:"",
					content:""
				},
				labelList:[],						//标签列表
			}
		},
		created(){
			//获取所有标签
			this.getTags();
		},
		methods:{
			//获取所有标签
			getTags(){
				resource.getTags().then(res => {
					if(res.data.code == 1){
						this.labelList = res.data.data;
					}else{	
						this.$message.warning(res.data.msg);
					}
				})
			},
			//发送
			send(){
				if(!this.request.label){
					this.$message.warning("请选择标签");
					return;
				}else if(this.request.content == ''){
					this.$message.warning("请输入短信内容");
					return;
				}
				this.$confirm('确认发送?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					resource.sendshortmessage(this.request).then(res => {
						if(res.data.code == 1){
							this.$message.success(res.data.msg); 
							this.request = {
								label:"",
								content:""
							}
						}else{
							this.$message.warning(res.data.msg);
						}
					}) 
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消发送'
					});          
				});
			}
		}
	}
</script>