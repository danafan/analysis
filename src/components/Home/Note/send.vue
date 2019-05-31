<template>
	<div>
		<el-card>
			<div class="infoTitle"><div class="line"></div>发送短信</div>
			<el-form label-position="left" label-width="85px" :model="request" size="small">
				<el-form-item label="标签：">
					<el-select v-model="request.label_id" filterable placeholder="全部">
						<el-option v-for="item in labelList" :key="item.id" :label="item.label" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="短信内容：">
					<el-input style="width: 500px" type="textarea" :rows="5" placeholder="请输入内容" v-model="request.note_content">
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
	export default{
		data(){
			return{
				request:{
					label_id:"",
					note_content:""
				},
				labelList:[
				{
					label:"标签1",
					id:1
				},
				{
					label:"标签2",
					id:2
				}
				],						//标签列表
			}
		},
		methods:{
			//发送
			send(){
				this.$confirm('确认发送?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					console.log(this.request);
					this.$message({
						type: 'success',
						message: '已发送'
					}); 
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