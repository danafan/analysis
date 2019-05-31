<template>
	<div>
		<el-card>
			<div class="infoTitle"><div class="line"></div>已有标签</div>
			<div class="but">
				<el-button type="primary" icon="el-icon-edit" size="small" @click="$router.push('/send')">发送短信</el-button>
				<el-button type="primary" icon="el-icon-plus" size="small" @click="$router.push('/addLabel')">新增标签</el-button>
			</div>
			<el-table :data="labelList" border style="width: 100%" align="center" :header-cell-style="{'background':'#f4f4f4'}">
				<el-table-column prop="label_name" label="标签" align="center">
				</el-table-column>
				<el-table-column prop="user_num" label="该标签用户数量" align="center">
				</el-table-column>
				<el-table-column prop="label_desc" label="标签含义" align="center" :show-overflow-tooltip="true" width="420">
				</el-table-column>
				<el-table-column label="操作" align="center" >
					<template slot-scope="scope">
						<el-button type="text" @click="setting(scope.row)">{{scope.row.status == 1?'停用':'启用'}}</el-button>
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
	export default{
		data(){
			return{
				request:{
					pagesize:10,
					page:1
				},
				labelList:[
				{
					label_name:"学生",
					user_num:98000,
					label_desc:"这行表现的是字数超出了怎么显示这行表现的是字数超出了怎么显示这行表现",
					status:1
				},
				{
					label_name:"南方、青年",
					user_num:100000,
					label_desc:"这行表现的是字数超出了怎么显示这行表现的是字数超出了怎么显示这行表现",
					status:2
				}
				],
				total:100,
			}
		},
		methods:{
			//分页
			handleSizeChange(val) {
				this.request.pagesize = val;
			},
			handleCurrentChange(val) {
				this.request.page = val;
			},
			//操作
			setting(row){
				this.$confirm('确认停用?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					console.log(row);
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消'
					});          
				});
			},
			//删除
			deleteLabel(row){
				this.$confirm('确认删除?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					console.log(row);
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消'
					});          
				});
			},
			//查看
			look(row){
				console.log(row);
				this.$router.push('/labelDetail');
			}
		}
	}
</script>






