<template>
	<div>
		<el-card v-loading="loading">
			<div class="infoTitle"><div class="line"></div>查询条件</div>
			<el-form :inline="true" size="small" class="demo-form-inline">
				<el-form-item label="标签类别：">
					<el-select v-model="request.type" filterable placeholder="全部">
						<el-option v-for="item in labelType" :key="item.id" :label="item.label" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="状态：">
					<el-select v-model="keyword_status" filterable>
						<el-option v-for="item in keywordStatus" :key="item.id" :label="item.label" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="search">查询</el-button>
				</el-form-item>
			</el-form>
			<el-table :data="keywordList" border style="width: 100%" align="center" :header-cell-style="{'background':'#f4f4f4'}">
				<el-table-column prop="sort_id" label="序号" align="center">
				</el-table-column>
				<el-table-column prop="name" label="关键字" align="center">
				</el-table-column>
				<el-table-column prop="doc_count" label="关键字数量" align="center">
				</el-table-column>
				<el-table-column prop="tag" label="关键字代表的标签" align="center">
				</el-table-column>
				<el-table-column label="操作" align="center" >
					<template slot-scope="scope">
						<el-button type="text" @click="setting(scope.row)">{{scope.row.status == 2?'停用':"启用"}}</el-button>
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
					type:0,
					pagesize:10,
					page:1
				},
				keyword_status:1,
				total:0,				//列表总条数
				labelType:[{
					label:"全部",
					id:0
				},{
					label:"收货地址",
					id:1
				},{
					label:"商品标题",
					id:2
				},{
					label:"颜色规格",
					id:3
				}],						//标签类别
				keywordStatus:[{
					label:"已启用",
					id:1
				},{
					label:"已停用",
					id:2
				}],						//关键字状态
				keywordList:[],			//关键词列表	
				loading:false		
			}
		},
		created(){
			//获取关键词列表（已启用）
			this.keyWord();
		},
		methods:{
			//获取关键词列表（已启用）
			keyWord(){
				this.loading = true;
				resource.keyWord(this.request).then(res => {
					this.loading = false;
					if(res.data.code == 1){
						this.keywordList = res.data.data.data;
						this.total = res.data.data.total;
					}else{	
						this.$message.warning(res.data.msg);
					}
				})
			},
			//获取关键词列表（已停用）
			stopKeyWord(){
				this.loading = true;
				resource.stopKeyWord(this.request).then(res => {
					this.loading = false;
					if(res.data.code == 1){
						this.keywordList = res.data.data.data;
						this.total = res.data.data.total;
					}else{	
						this.$message.warning(res.data.msg);
					}
				})
			},
			//点击查询
			search(){
				this.request.page = 1;
				//判断请求
				this.req();
			},
			//判断请求
			req(){
				if(this.keyword_status == 1){
					//获取关键词列表（已启用）
					this.keyWord();
				}else if(this.keyword_status == 2){
					//获取关键词列表（已停用）
					this.stopKeyWord();
				}
			},
			//分页
			handleSizeChange(val) {
				this.request.pagesize = val;
				this.request.page = 1;
				//判断请求
				this.req();
			},
			handleCurrentChange(val) {
				this.request.page = val;
				//判断请求
				this.req();
			},
			//操作
			setting(row){
				let str = row.status == 2?"停":"启";
				this.$confirm(`确认${str}用该关键字?`, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let obj = {
						word:row.name,
						type:row.status
					}
					resource.settigKeyWord(obj).then(res => {
						if(res.data.code == 1){
							this.$message.success(`已${str}用`);
							//判断请求
							this.req();
						}else{
							this.$message.warning(res.data.msg);
						}
					})
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




