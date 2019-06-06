<template>
	<div>
		<el-card v-loading="loading">
			<div class="infoTitle"><div class="line"></div>查询条件</div>
			<div class="searchBox">
				<el-form :inline="true" size="small" class="demo-form-inline">
					<el-form-item label="商品名称：">
						<el-input v-model="request.goods_name" placeholder="商品名称"></el-input>
					</el-form-item>
					<el-form-item label="下单时间：">
						<el-date-picker v-model="dateRange" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期" size="small" value-format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptions">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="SKU：">
						<el-input v-model="request.sku_id" placeholder="请输入sku"></el-input>
					</el-form-item>
					<el-form-item label="订单编号：">
						<el-input v-model="request.order_num" placeholder="订单编号"></el-input>
					</el-form-item>
					<el-form-item label="买家：">
						<el-input v-model="request.nickname_or_id" placeholder="买家昵称或ID"></el-input>
					</el-form-item>
					<el-form-item label="地区：">
						<el-cascader clearable v-model="addressList" :options="options" :props="props" ></el-cascader>
					</el-form-item>
					<el-form-item label="标签：">
						<el-select clearable v-model="request.label" filterable placeholder="请选择">
							<el-option v-for="(item,index) in labelList" :key="index" :label="item.tag_name" :value="item.tag_name">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="店铺：">
						<el-select clearable v-model="request.store" filterable placeholder="请选择">
							<el-option v-for="item in shopList" :key="item.shop_id" :label="item.shop_name" :value="item.shop_id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="search">查询</el-button>
					</el-form-item>
				</el-form>
			</div>
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
				<el-table-column prop="last_date" sortable label="上次下单时间" align="center" width="200">
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
				:current-page="page"
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

</style>
<script>
	import resource from '../../../api/resource.js'
	import axios from 'axios'
	export default{
		name:"userList",
		data(){
			return{
				request:{
					goods_name:"",
					sku_id:"",
					order_num:"",
					nickname_or_id:"",
					address:"",
					label:"",
					store:""
				},						//可传递的对象
				size:10,
				page:1,
				total:100,
				dateRange:[],			//选中的下单时间区间
				addressList:[],			//选中的地区列表
				options: require('../../../../public/data.json'), //地址列表
				pickerOptions: {
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
				},
				props:{
					value:"label"
				},
				labelList:[],			//标签列表
				shopList:[],			//店铺列表
				userList:[],			//用户列表
				dialogVisible: false,	//默认导出列表不显示
				checkList: [],			//选中的导出条件列表
				label_id:"",			//选中的导出条件的标签id
				loading:false
			}
		},
		created(){
			//获取用户列表
			this.getUserList();
			//获取标签列表
			this.getTags();
			//获取店铺列表
			this.getStore();
		},
		methods:{
			//点击查询
			search(){
				this.page = 1;
				//获取用户列表
				this.getUserList();
			},
			//判断请求类型和参数整理
			judge(){
				this.request.order_date_start = this.dateRange && this.dateRange.length > 0?this.dateRange[0]:"";
				this.request.order_date_end = this.dateRange && this.dateRange.length > 0?this.dateRange[1]:"";
				this.request.address = this.addressList.join('');
				let newArr = [];
				for (const key in this.request) {              
					if (this.request[key]) {
						newArr.push(this.request[key]); 
					}
					if (!this.request[key]) {
						this.request[key] = ""; 
					}
				}
				if(newArr.length > 0){
					return true;
				}else{
					return false;
				};
			},
			//获取用户列表
			getUserList(){
				let obj = {
					page:this.page,
					size:this.size
				};
				this.loading = true
				if(this.judge() == true){
					obj = {...obj,...this.request};
					resource.postUserList(obj).then(res => {
						this.loading = false;
						if(res.data.code == 1){
							this.userList = res.data.data;
							this.total = res.data.count;
						}else{
							this.$message.warning(res.data.msg);
						}
					})
				}else{
					resource.getUserList(obj).then(res => {
						this.loading = false;
						if(res.data.code == 1){
							this.userList = res.data.data;
							this.total = res.data.count;
						}else{
							this.$message.warning(res.data.msg);
						}
					})
				}
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
			//获取店铺列表
			getStore(){
				resource.getStore().then(res => {
					if(res.data.code == 1){
						this.shopList = res.data.data.area;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//分页
			handleSizeChange(val) {
				this.size = val;
				this.page = 1;
				//获取用户列表
				this.getUserList();
			},
			handleCurrentChange(val) {
				this.page = val;
				//获取用户列表
				this.getUserList();
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
			//点击查看
			look(row){
				this.$router.push('/userInfo?nickname=' + row.nickname);
			}
			
		}
	}
</script>





