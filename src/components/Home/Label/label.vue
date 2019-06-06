<template>
	<div>
		<el-card v-loading="loading">
			<div class="infoTitle"><div class="line"></div>已有标签</div>
			<div class="but">
				<el-button type="primary" icon="el-icon-edit" size="small" @click="$router.push('/send')">发送短信</el-button>
				<el-button type="primary" icon="el-icon-plus" size="small" @click="$router.push('/addLabel')">新增标签</el-button>
			</div>
			<el-table :data="labelList" border style="width: 100%" align="center" :header-cell-style="{'background':'#f4f4f4'}">
				<el-table-column prop="tag_name" label="标签" align="center">
				</el-table-column>
				<el-table-column prop="doc_count" label="该标签用户数量" align="center">
				</el-table-column>
				<el-table-column prop="tag_descr" label="标签含义" align="center" :show-overflow-tooltip="true" width="420">
				</el-table-column>
				<el-table-column label="操作" align="center" >
					<template slot-scope="scope">
						<el-button type="text" @click="setting(scope.row)">{{scope.row.status == 2?'启用':'停用'}}</el-button>
						<el-button type="text" @click="deleteLabel(scope.row)">删除</el-button>
						<el-button type="text" @click="look(scope.row)">查看</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="page">
				<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="request.page"
				:pager-count="11"
				:page-sizes="[5, 10, 15, 20]"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total">
			</el-pagination>
		</div>
	</el-card>
</div>
</template>
<style scoped lang="less">

</style>
<script>
	import resource from '../../../api/resource.js'
	export default{
		data(){
			return{
				request:{
					pagesize:10,
					page:1
				},
				labelList:[],				//标签列表
				total:0,
				loading:false
			}
		},
		created(){
			//获取标签列表
			this.getTagList();
		},
		methods:{
			//获取标签列表
			getTagList(){
				this.loading = true;
				resource.getTagList(this.request).then(res => {
					this.loading = false;
					if(res.data.code == 1){
						this.labelList = res.data.data.data;
						this.total = res.data.data.total;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//分页
			handleSizeChange(val) {
				this.request.pagesize = val;
				this.request.page = 1;
				//获取标签列表
				this.getTagList();
			},
			handleCurrentChange(val) {
				this.request.page = val;
				//获取标签列表
				this.getTagList();
			},
			//操作
			setting(row){
				let str = row.status == 1?"停":"启";
				this.$confirm(`确认${str}用该标签?`, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					//标签操作
					let obj = {
						id:row.tag_id,
						type:row.status == 1?2:1
					}
					this.settingTag(obj);
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消'
					});          
				});
			},
			//删除
			deleteLabel(row){
				this.$confirm('确认删除该标签?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					//标签操作
					let obj = {
						id:row.tag_id,
						type:3
					}
					this.settingTag(obj);
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消'
					});          
				});
			},
			//标签操作
			settingTag(obj){
				this.loading = true;
				resource.settingTag(obj).then(res => {
					this.loading = true;
					if(res.data.code == 1){
						this.$message.success("操作成功");
						//获取标签列表
						this.getTagList();
					}else{
						this.$message.waring(res.data.msg);
					}
				})
			},
			//查看
			look(row){
				this.$router.push('/labelDetail?id=' + row.tag_id);
			}
		}
	}
</script>






