<template>
	<div>
		<el-card>
			<div class="infoTitle"><div class="line"></div>详情</div>
			<el-card>
				<div class="note"><label>发送人：</label>王大锤</div>
				<div class="note"><label>选择标签：</label>学生</div>
				<div class="note">
					<label>短信内容：</label>
					<div class="note_content">阿斯顿发卡上的纠纷和空间的合法开始觉得很浪费了刷卡机回复卡加水淀粉啊就收到回复卡</div>
				</div>
				<div class="note"><label>发送时间：</label>2019-04-12 14:23:45</div>
			</el-card>
			<div class="infoTitle"><div class="line"></div>关键指标</div>
			<el-card>
				<div class="target">
					<div class="item">
						<div class="label">覆盖人数</div>
						<div class="value">256</div>
					</div>
					<div class="shu"></div>
					<div class="item">
						<div class="label">点击量</div>
						<div class="value value1">188</div>
					</div>
					<div class="shu"></div>
					<div class="item">
						<div class="label">转化人数</div>
						<div class="value value3">256</div>
					</div>
					<div class="shu"></div>
					<div class="item">
						<div class="label">转化金额（元）</div>
						<div class="value value2">32000</div>
					</div>
				</div>
			</el-card>
			<div class="infoTitle"><div class="line"></div>下单用户</div>
			<el-form :inline="true" size="small" class="demo-form-inline">
				<el-form-item label="时间区间：">
					<el-date-picker
					v-model="dateRange"
					type="daterange"
					align="right"
					unlink-panels
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
					value-format="yyyy-MM-dd"
					:picker-options="pickerOptions2"
					>
				</el-date-picker>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="search">查询</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="orderList" border style="width: 100%" align="center" :header-cell-style="{'background':'#f4f4f4'}">
			<el-table-column prop="create_time" label="下单时间" align="center">
			</el-table-column>
			<el-table-column prop="user_id" label="用户ID" align="center">
			</el-table-column>
			<el-table-column prop="goods_name" label="购买商品" align="center" :show-overflow-tooltip="true" width="350">
			</el-table-column>
			<el-table-column prop="total_money" label="下单总金额（元）" align="center">
			</el-table-column>
			<el-table-column prop="present_money" label="本次下单金额（元）" align="center">
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
.note{
	font-size: 15px;
	margin-bottom: 10px;
	display: flex;
	label{
		width: 80px;
	}
	.note_content{
		width: 500px;
		word-wrap: break-word; 
		word-break: normal;
	}
}
.target{
	display:flex;
	align-items: center;
	justify-content: space-around;
	.item{
		display:flex;
		flex-direction: column;
		align-items: center;
		.value{
			margin-top: 10px;
			font-size: 28px;
			font-weight: bold;
			color: green;
		}
		.value1{
			color: #ff5858;
		}
		.value2{
			color: #03abff;
		}
		.value3{
			color: #ffd04b;
		}
	}
	.shu{
		height: 40px;
		border-left: 1px solid #333;
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
				dateRange:[],				//选中的日期区间
				total:100,					//总条数
				pickerOptions2: {
					shortcuts: [{
						text: '最近一周',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近一个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近三个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
							picker.$emit('pick', [start, end]);
						}
					}]
				},							//时间区间配置
				orderList:[
				{
					create_time:'2019-04-12 15:23:45',
					user_id:12,
					goods_name:"秋装圆领男士青少年条纹长袖t恤男秋衣男修身韩版学生潮上衣薄款",
					total_money:"980",
					present_money:"200"
				}
				]
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
			//查询
			search(){
				this.request.start_time = this.dateRange && this.dateRange.length > 0?this.dateRange[0]:"";
				this.request.end_time = this.dateRange && this.dateRange.length > 0?this.dateRange[1]:"";
				console.log(this.request);
			}
		}
	}
</script>







