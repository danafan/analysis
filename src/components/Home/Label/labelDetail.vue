<template>
	<div>
		<el-card>
			<div class="infoTitle"><div class="line"></div>标签详情</div>
			<el-card>
				<div class="labelContent">标签：{{tagDetailObjInfo.tag_name}}</div>
				<div class="labelContent">
					<div class="content">标签含义：</div>
					<div class="desc">{{tagDetailObjInfo.tag_descr}}</div>
				</div>
			</el-card>
			<div class="infoTitle"><div class="line"></div>用户列表</div>
			<div class="but">
				<el-button type="primary" icon="el-icon-download" size="small" @click="dialogVisible = true">导出</el-button>
			</div>
			<el-table :data="tagDetailObj.data" border style="width: 100%" align="center" :header-cell-style="{'background':'#f4f4f4'}" :default-sort = "{prop: 'completeTime'}">
				<el-table-column prop="nickname" label="用户昵称" align="center">
				</el-table-column>
				<el-table-column prop="total_amount" label="订单总金额（元）" align="center">
				</el-table-column>
				<el-table-column prop="paytime" sortable label="上次下单时间" align="center" width="200">
				</el-table-column>
				<el-table-column prop="address" label="地址" align="center" :show-overflow-tooltip="true" width="300">
				</el-table-column>
				<el-table-column prop="tags" label="标签" align="center" :show-overflow-tooltip="true">
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
				<el-checkbox style="width: 25%;margin-bottom: 10px;" label="nickname_column">用户昵称</el-checkbox>
				<el-checkbox style="width: 25%" label="order_num_column">订单数</el-checkbox>
				<el-checkbox style="width: 25%;margin-bottom: 10px;" label="order_total_money_column">订单总金额（元）</el-checkbox>
				<el-checkbox style="width: 25%" label="pay_date_column">上次下单时间</el-checkbox>
				<el-checkbox style="width: 25%" label="address_column">最近下单地址</el-checkbox>
				<el-checkbox style="width: 25%;margin-bottom: 10px;" label="label_column">标签</el-checkbox>
			</el-checkbox-group>
			<el-form :inline="true" size="small" class="demo-form-inline">
				<el-form-item label="标签：">
					<el-select v-model="label_id" filterable placeholder="请选择">
						<el-option v-for="(item,index) in labelList" :key="index" :label="item.tag_name" :value="item.tag_name">
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
	import resource from '../../../api/resource.js'
	export default{
		data(){
			return{
				request:{
					pagesize:10,
					page:1,
					id:"",				//选中的导出的标签id
				},
				tagDetailObj:{},		//标签详情
				tagDetailObjInfo:{},	//顶部详情
				total:0,
				labelList:[],			//标签列表
				dialogVisible:false,
				checkList: [],			//选中的导出条件列表
				label_id:"",
			}
		},
		created(){
			this.request.id = this.$route.query.id;
			//获取标签详情
			this.tagDetail();
			//获取标签列表
			this.getTags();
		},
		methods:{
			//获取标签详情
			tagDetail(){
				resource.tagDetail(this.request).then(res => {
					if(res.data.code == 1){
						this.tagDetailObj = res.data.data;
						this.tagDetailObjInfo = this.tagDetailObj.info;
						this.total = res.data.data.total;
					}else{	
						this.$message.warning(res.data.msg);
					}
				})
			},
			//获取标签列表
			getTags(){
				resource.getTags().then(res => {
					if(res.data.code == 1){
						this.labelList = res.data.data;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//点击导出
			downLoad(){
				let obj = {
					nickname_column:false,
					order_num_column:false,
					order_total_money_column:false,
					pay_date_column:false,
					address_column:false,
					label_column:false,
					label:this.label_id
				}
				for (var key in obj) {
					for (var i = 0; i < this.checkList.length; i++) {
						if(key == this.checkList[i]){
							obj[key] = true;
						}
					}
				}
				//预约导出
				this.asyncExport(obj);
			},
			//预约导出
			asyncExport(obj){
				resource.asyncExport(obj).then(res => {
					if(res.data.code == 1){
						this.$message.success("已预约导出，注意查看消息列表");
						this.dialogVisible = false;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//分页
			handleSizeChange(val) {
				this.request.pagesize = val;
				this.request.page = 1;
				//获取标签详情
				this.tagDetail();
			},
			handleCurrentChange(val) {
				this.request.page = val;
				//获取标签详情
				this.tagDetail();
			},
			//点击查看
			look(row){
				console.log(row);
				this.$router.push('/userInfo?nickname=' + row.nickname);
			}
		}
	}
</script>





