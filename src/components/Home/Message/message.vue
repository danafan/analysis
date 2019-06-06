<template>
	<div>
		<el-card>
			<div class="infoTitle"><div class="line"></div>消息列表</div>
			<el-table :data="messageList" border style="width: 100%" align="center" :header-cell-style="{'background':'#f4f4f4'}">
				<el-table-column prop="message" label="消息内容" align="center" :show-overflow-tooltip="true" width="500">
				</el-table-column>
				<el-table-column prop="create_time" label="时间" align="center">
				</el-table-column>
				<el-table-column label="操作" align="center" >
					<template slot-scope="scope">
						<el-button v-if="scope.row.status == 1" type="text" @click="downLoad(scope.row.id)">下载</el-button>
						<p style="color:#ccc" v-if="scope.row.status == 0">正在下载...</p>
					</template>
				</el-table-column>
			</el-table>
			<div class="page">
				<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="page"
				:pager-count="11"
				:page-sizes="[5, 10, 15, 20]"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total">
			</el-pagination>
		</div>
	</el-card>
</div>
</template>
<style lang="less" scoped>

</style>
<script>
	import resource from '../../../api/resource.js'
	export default{
		data(){
			return{
				messageList:[],				//消息列表
				size:10,
				page:1,
				total:0,
			}
		},
		created(){
			//获取消息列表
			this.getMessageList();
		},
		methods:{
			//分页
			handleSizeChange(val) {
				this.size = val;
				this.page = 1;
				//获取消息列表
				this.getMessageList();
			},
			handleCurrentChange(val) {
				this.page = val;
				//获取消息列表
				this.getMessageList();
			},
			//获取消息列表
			getMessageList(){
				let obj = {
					page:this.page,
					size:this.size
				}
				resource.getAsyncMessage(obj).then(res => {
					if(res.data.code == 1){
						this.messageList = res.data.data;
						this.total = res.data.count;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//点击下载
			downLoad(id){
				this.$confirm('确认下载?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					// let downUrl = "http://crmcs.gxk8090.com/admin/async/downcsv?id=" + id;
					let downUrl = `${location.origin}/admin/async/downcsv?id=${id}`;
					window.open(downUrl);
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消'
					});          
				});
			}
		}
	}
</script>



