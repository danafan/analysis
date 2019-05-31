<template>
	<div>
		<el-card>
			<div class="infoTitle"><div class="line"></div>用户信息</div>
			<el-card>
				<div class="threeLine">
					<div class="item">
						<span class="label">用户昵称：</span>
						<span class="value">{{userInfo.nickname}}</span>
					</div>
					<div class="item">
						<span class="label">真实姓名：</span>
						<span class="value">{{userInfo.username}}</span>
					</div>
					<div class="item">
						<span class="label">下单次数：</span>
						<span class="value">{{userInfo.order_num}}</span>
					</div>
				</div>
				<div class="threeLine">
					<div class="item">
						<span class="label">订单总金额（元）：</span>
						<span class="value">{{userInfo.order_total_money}}</span>
					</div>
					<div class="item">
						<span class="label">手机号：</span>
						<span class="value">{{userInfo.reveiver_mobile}}</span>
					</div>
				</div>
				<div class="threeLine">
					<div class="item">
						<span class="label">首次下单时间：</span>
						<span class="value">{{userInfo.order_first_time}}</span>
					</div>
					<div class="item">
						<span class="label">上次下单时间：</span>
						<span class="value">{{userInfo.order_end_time}}</span>
					</div>
				</div>
				<div class="warp">
					<div>用户标签：</div>
					<div class="overflow">{{userInfo.label}}</div>
				</div>
				<div class="warp">
					<div>收货地址：</div>
					<div class="overflow">{{userInfo.address}}</div>
				</div>
			</el-card>
			<div class="infoTitle"><div class="line"></div>下单商品及详细信息</div>
			<el-table :data="userInfo.data_end" border style="width: 100%" align="center" :header-cell-style="{'background':'#f4f4f4'}">
				<el-table-column prop="i_id" label="款式编码" align="center">
				</el-table-column>
				<el-table-column prop="sku" label="SKU" align="center">
				</el-table-column>
				<el-table-column prop="goods_name" label="商品名称" align="center" :show-overflow-tooltip="true" width="400">
				</el-table-column>
				<el-table-column prop="properties_value" label="商品规格" align="center">
				</el-table-column>
				<el-table-column prop="paid_amount" label="价格（元）" align="center">
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
<style scoped lang="less">
.threeLine{
	margin-bottom: 20px;
	font-size: 15px;
	display: flex;
	.item{
		width: 30%;
	}
}
.warp{
	margin-bottom: 20px;
	font-size: 15px;
	display: flex;
	.overflow{
		width: 320px;
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
				userInfo:{},				//用户信息
				pagesize:10,
				page:1,
				total:100,
				nickname:"",				//用户昵称
			}
		},
		created(){
			//获取用户信息
			this.getUserInfo();
		},
		methods:{
			//获取用户信息
			getUserInfo(){
				let obj = {
					nickname:this.$route.query.nickname,
					page:this.page,
					size:this.pagesize
				}
				resource.getUserDetail(obj).then(res => {
					if(res.data.code == 1){
						this.userInfo = res.data.data;
						this.total = res.data.count;
					}else{
						this.$message.warning(res.data.msg)
					}
				})
			},
			//分页
			handleSizeChange(val) {
				this.pagesize = val;
				this.page = 1;
				//获取用户信息
				this.getUserInfo();
			},
			handleCurrentChange(val) {
				this.page = val;
				//获取用户信息
				this.getUserInfo();
			},
		}
	}
</script>







