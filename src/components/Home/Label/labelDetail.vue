<template>
	<div>
		<el-card>
			<div class="infoTitle"><div class="line"></div>标签详情</div>
			<el-card>
				<div class="labelContent">标签：青年、小伙子</div>
				<div class="labelContent">
					<div class="content">标签含义：</div>
					<div class="desc">地址中带有学校地址中带有学校地址中带有学校地址中带有学校地址中带有学校地址中带有学校地址中带有学校</div>
				</div>
			</el-card>
			<div class="infoTitle"><div class="line"></div>用户列表</div>
			<div class="but">
				<el-button type="primary" icon="el-icon-download" size="small" @click="dialogVisible = true">导出</el-button>
			</div>
			<el-table :data="userList" border style="width: 100%" align="center" :header-cell-style="{'background':'#f4f4f4'}" :default-sort = "{prop: 'completeTime'}">
				<el-table-column prop="id" label="用户ID" align="center">
				</el-table-column>
				<el-table-column prop="nickname" label="账号" align="center">
				</el-table-column>
				<el-table-column prop="order_num" label="订单数" align="center">
				</el-table-column>
				<el-table-column prop="order_amount" label="订单总金额（元）" align="center">
				</el-table-column>
				<el-table-column prop="last_data" sortable label="上次下单时间" align="center" width="200">
				</el-table-column>
				<el-table-column prop="address" label="最近下单地址" align="center" :show-overflow-tooltip="true" width="300">
				</el-table-column>
				<el-table-column prop="label" label="标签" align="center" :show-overflow-tooltip="true">
				</el-table-column>
				<el-table-column label="操作" align="center" >
					<template slot-scope="scope">
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
	<el-dialog title="导出信息" :show-close="false" :visible.sync="dialogVisible" width="40%">
		<div>
			<el-checkbox-group v-model="checkList">
				<el-checkbox style="width: 25%;margin-bottom: 10px;" label="id">用户ID</el-checkbox>
				<el-checkbox style="width: 25%" label="nickname">账号</el-checkbox>
				<el-checkbox style="width: 25%" label="order_num">订单数</el-checkbox>
				<el-checkbox style="width: 25%;margin-bottom: 10px;" label="order_amount">订单总金额（元）</el-checkbox>
				<el-checkbox style="width: 25%" label="last_data">上次下单时间</el-checkbox>
				<el-checkbox style="width: 25%" label="address">最近下单地址</el-checkbox>
				<el-checkbox style="width: 25%;margin-bottom: 10px;" label="label">标签</el-checkbox>
			</el-checkbox-group>
			<el-form :inline="true" size="small" class="demo-form-inline">
				<el-form-item label="标签：">
					<el-select v-model="label_id" filterable placeholder="请选择">
						<el-option v-for="item in labelList" :key="item.id" :label="item.label" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>
		</div>
		<span slot="footer" class="dialog-footer">
			<el-button size="small" @click="dialogVisible = false">取消</el-button>
			<el-button size="small" type="primary" @click="downLoad">确认导出</el-button>
		</span>
	</el-dialog>
</div>
</template>
<style scoped lang="less">
.labelContent{
	display: flex;
	margin-bottom: 10px;
	.desc{
		width: 500px;
		word-wrap: break-word; 
		word-break: normal;
	}
}
</style>
<script>
	export default{
		data(){
			return{
				request:{
					pagesize:10,
					page:1
				},
				total:100,
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
				dialogVisible:false,
				checkList: [],			//选中的导出条件列表
				label_id:"",			//选中的导出的标签id
				userList:[
				{
					id:1,
					nickname:12346152,
					order_num:18,
					order_amount:300,
					last_data:"2019-04-02 13:48:52",
					address:"河南省焦作市山阳区文苑街道河南省焦作市山阳区碧莲路801号",
					label:"学生、青年",
				}
				],						//用户下单的列表
			}
		},
		methods:{
			//点击导出
			downLoad(){
				console.log(this.checkList);
				console.log(this.label_id);
			},
			//分页
			handleSizeChange(val) {
				this.request.pagesize = val;
			},
			handleCurrentChange(val) {
				this.request.page = val;
			},
			//点击查看
			look(row){
				console.log(row);
				this.$router.push('/userInfo');
			}
		}
	}
</script>





