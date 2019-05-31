<template>
	<div>
		<el-card>
			<div class="infoTitle"><div class="line"></div>查询条件</div>
			<el-form :inline="true" size="small" class="demo-form-inline">
				<el-form-item label="标签类别：">
					<el-select v-model="request.label_type" filterable placeholder="全部">
						<el-option v-for="item in labelType" :key="item.id" :label="item.label" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="状态：">
					<el-select v-model="request.keyword_status" filterable placeholder="全部">
						<el-option v-for="item in keywordStatus" :key="item.id" :label="item.label" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="search">查询</el-button>
				</el-form-item>
			</el-form>
			<el-table :data="keywordList" border style="width: 100%" align="center" :header-cell-style="{'background':'#f4f4f4'}">
				<el-table-column prop="number" label="序号" align="center">
				</el-table-column>
				<el-table-column prop="keyword" label="关键字" align="center">
				</el-table-column>
				<el-table-column prop="amount" label="关键字数量" align="center">
				</el-table-column>
				<el-table-column prop="keyword_label" label="关键字代表的标签" align="center">
				</el-table-column>
				<el-table-column label="操作" align="center" >
					<template slot-scope="scope">
						<el-button type="text" @click="setting(scope.row)">{{scope.row.status == 1?'停用':"启用"}}</el-button>
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
					label_type:"",
					keyword_status:"",
					pagesize:10,
					page:1
				},
				total:100,				//列表总条数
				labelType:[{
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
				keywordList:[
					{
						number:1,
						keyword:"学校",
						amount:10000,
						keyword_label:"男生",
						status:1
					},
					{
						number:2,
						keyword:"青年",
						amount:8888,
						keyword_label:"学生",
						status:2
					}
				]
			}
		},
		methods:{
			//点击查询
			search(){
				console.log(this.request);
			},
			//分页
			handleSizeChange(val) {
				this.request.pagesize = val;
			},
			handleCurrentChange(val) {
				this.request.page = val;
			},
			//操作
			setting(row){
				console.log(row);
			}
		}
	}
</script>




