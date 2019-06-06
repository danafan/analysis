<template>
	<div>
		<el-card>
			<div class="infoTitle"><div class="line"></div>新增标签</div>
			<el-form size="small" class="demo-form-inline">
				<el-form-item label="是否排除刷单订单：">
					<el-radio-group v-model="request.exclude_shuadan">
						<el-radio label="1">是</el-radio>
						<el-radio label="0">否</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="店铺：">
					<el-select v-model="selStore" filterable multiple placeholder="全部">
						<el-option v-for="item in storeList" :key="item.shop_id" :label="item.shop_name" :value="item.shop_id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="当用户下单在：">
					<el-date-picker v-model="dateRange" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期" size="small" value-format="yyyy-MM-dd HH:mm:ss" :default-time="['12:00:00']">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="交易次数：">
					<div style="display:flex;align-items: center">
						<el-radio-group v-model="tradeNum">
							<el-radio :label="item.item_start" v-for="(item,index) in tradeNumList" :key="index">{{item.item_value}}</el-radio>
						</el-radio-group>
						<el-input :disabled="tradeNum !== null" style="margin-left: 20px;width: 100px" v-model="trade_num_start" type="number" placeholder="请输入数字"></el-input>～
						<el-input :disabled="tradeNum !== null" style="width: 100px" v-model="trade_num_end" type="number" placeholder="请输入数字"></el-input>
						<el-checkbox style="margin-left: 20px" v-model="trade_num_date">不限时间</el-checkbox>
					</div>
				</el-form-item>
				<el-form-item label="平均客单价：">
					<div style="display:flex;align-items: center">
						<el-radio-group v-model="customer">
							<el-radio :label="`${item.item_start}~${item.item_end}`" v-for="(item,index) in kedanPrice" :key="index">{{item.item_value}}</el-radio>
						</el-radio-group>
						<el-input :disabled="customer != 'null~null'" style="margin-left: 20px;width: 100px" v-model="customer_start" type="number" placeholder="请输入数字"></el-input>～ 
						<el-input :disabled="customer != 'null~null'" style="width: 100px" v-model="customer_end" type="number" placeholder="请输入数字"></el-input>
						<el-checkbox style="margin-left: 20px" v-model="kedan_price_date">不限时间</el-checkbox>
					</div>
				</el-form-item>
				<el-form-item label="当从收货地址中检索到：">
					<el-input style="width: 300px" v-model="address" placeholder="请输入收获地址检索"></el-input>
					<el-checkbox style="margin-left: 20px" v-model="address_date">不限时间</el-checkbox>
				</el-form-item>
				<el-form-item label="当从商品标题中检索到：">
					<el-input style="width: 300px" v-model="goods_title" placeholder="请输入商品标题检索"></el-input>
					<el-checkbox style="margin-left: 20px" v-model="goods_title_date">不限时间</el-checkbox>
				</el-form-item>
				<el-form-item label="当从颜色规格中检索到：">
					<el-input style="width: 300px" v-model="specs" placeholder="请输入颜色规格检索"></el-input>
					<el-checkbox style="margin-left: 20px" v-model="specs_date">不限时间</el-checkbox>
				</el-form-item>
				<el-form-item label="当从姓氏中检索到：">
					<el-input style="width: 300px" v-model="first_name" placeholder="请输入姓氏检索"></el-input>
					<el-checkbox style="margin-left: 20px" v-model="first_name_date">不限时间</el-checkbox>
				</el-form-item>
				<el-form-item label="当从名字中检索到：">
					<el-input style="width: 300px" v-model="last_name" placeholder="请输入地址检索"></el-input>
					<el-checkbox style="margin-left: 20px" v-model="last_name_date">不限时间</el-checkbox>
				</el-form-item>
				<el-form-item>
					<div style="display:flex">
						当用户下单<el-input type="number" style="width: 100px" v-model="order_percentage" placeholder="请输入数字"></el-input>%在<el-input type="number" style="width: 100px" v-model="order_discount" placeholder="请输入数字"></el-input>折以下购买的
						<el-checkbox style="margin-left: 20px" v-model="sbtj1">不限时间</el-checkbox>
					</div>
				</el-form-item>
				<el-form-item>
					<div style="display:flex">
						当用户下单数在<el-input type="number" style="width: 100px" v-model="goods_num_day" placeholder="请输入数字"></el-input>天内购买商品数量在<el-input type="number" style="width: 100px" v-model="goods_num_day_start" placeholder="请输入数字"></el-input>～<el-input type="number" style="width: 100px" v-model="goods_num_day_end" placeholder="请输入数字"></el-input>件
						<el-checkbox style="margin-left: 20px" v-model="sbtj2">不限时间</el-checkbox>
					</div>
				</el-form-item>
				<el-form-item>
					<div style="display:flex">
						当用户下单数在<el-input type="number" style="width: 100px" v-model="order_amount_day" placeholder="请输入数字"></el-input>天内购买商品金额在<el-input type="number" style="width: 100px" v-model="order_amount_day_start" placeholder="请输入数字"></el-input> ～ <el-input type="number" style="width: 100px" v-model="order_amount_day_end" placeholder="请输入数字"></el-input> 元
						<el-checkbox style="margin-left: 20px" v-model="sbtj3">不限时间</el-checkbox>
					</div>
				</el-form-item>
				<el-form-item label="地区：">
					<el-cascader
					@visible-change="changeAddress"
					change-on-select
					v-model="dq"
					:options="options"
					:props="props"
					:clearable="true"
					></el-cascader>
					<el-checkbox style="margin-left: 20px" v-model="city_date">不限时间</el-checkbox>
				</el-form-item>
				<div class="address" v-for="(item,index) in dqList" :key="index">
					<div class="content">{{item}}</div>
					<img src="../../../assets/closes.png" @click="deleteAddress(index)">
				</div>
				<el-form-item>
					<div style="display:flex">
						定义为<el-input style="width: 300px" v-model="request.tag_name" placeholder="请输入标签"></el-input>标签
					</div>
				</el-form-item>
				<el-form-item label="标签含义：">
					<el-input style="width: 500px" type="textarea" :rows="5" placeholder="请输入标签含义，方便理解" v-model="tag_descr">
					</el-input>
				</el-form-item>
			</el-form>
			<div class="buts">
				<el-button class="but" type="primary" @click="save">保存</el-button>
			</div>
		</el-card>
	</div>
</template>
<style scoped lang="less">
.address{
	margin-bottom: 10px;
	display:flex;
	align-items: center;
	border-radius: 5px;
	background: rgb(236,196,165);
	width: 220px;
	height: 28px;
	.content{
		width: 200px;
		text-align: center;
		font-size: 12px;
		color: #333;
	}
	img{
		width: 15px;
		height: 15px;
	}
}
.buts{
	margin-top: 20px;
	display: flex;
	justify-content: center;
	.but{
		width: 300px;
		height: 48px;
	}
}
</style>
<script>
	import resource from '../../../api/resource.js'
	export default{
		data(){
			return{
				request:{
					exclude_shuadan:'1',
					tag_name:"",
				},								//所有条件（传递）
				tag_descr:"",					//标签含义
				storeList:[],					//店铺列表（后台返回）
				selStore:[],					//选中的店铺
				dateRange:[],					//选中的时间区间
				tradeNumList:[],				//交易次数列表（后台返回）
				tradeNum:0,						//选中的交易次数(默认不限)
				trade_num_start:"",
				trade_num_end:"",
				trade_num_date:false,			
				kedanPrice:[],					//平均客单价列表（后台返回）
				customer:"0~null",				//选中的客单价
				customer_start:"",
				customer_end:"",
				kedan_price_date:false,
				address:"",						//收获地址检索
				address_date:false,
				goods_title:"",					//商品标题
				goods_title_date:false,
				specs:"",						//颜色规格
				specs_date:false,
				first_name:"",					//姓氏
				first_name_date:false,
				last_name:"",					//名字
				last_name_date:false,
				order_percentage:"",			//百分比
				order_discount:"",				//折扣
				sbtj1:false,					//公共不限时间
				goods_num_day:"",				
				goods_num_day_start:"",
				goods_num_day_end:"",
				sbtj2:false,
				order_amount_day:"",
				order_amount_day_start:"",
				order_amount_day_end:"",
				sbtj3:false,
				dq:[],							//选中当前的地区
				dqList:[],						//要传递的地区列表
				city_date:false,
				options: require('../../../../public/data.json'), //地址列表
				props:{
					value:"label"
				},
				
			}
		},
		created(){
			//获取原始信息
			this.getTagInfo();
			//获取店铺列表
			this.getStore();
		},
		watch:{
			tradeNum:function(n){
				if(n != null){
					this.trade_num_start = "";
					this.trade_num_end = "";
				}
			},
			customer:function(n){
				if(n != 'null~null'){
					this.customer_start = "";
					this.customer_end = "";
				}
			}
		},
		methods:{
			//获取原始信息
			getTagInfo(){
				resource.getTagInfo().then(res => {
					if(res.data.code == 1){
						this.tradeNumList = res.data.data.trade_num;
						this.tradeNum = this.tradeNumList[0].item_start;
						this.kedanPrice = res.data.data.kedan_price;
						this.customer = this.kedanPrice[0].item_start + '~' + this.kedanPrice[0].item_end;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//获取店铺列表
			getStore(){
				resource.getStore().then(res => {
					if(res.data.code == 1){
						this.storeList = res.data.data.area;
					}else{
						this.$message.warning(res.data.msg);
					}
				});
			},
			//判断数字大小
			contrast(start,end){
				if((!start && !end) || parseInt(start) > parseInt(end)){
					return false;
				}else if(!start && end){
					let obj = {
						startDate:0,
						endDate:end
					}
					return obj;
				}else if(start && !end){
					let obj = {
						startDate:start
					}
					return obj;
				}else if(start && end){
					let obj = {
						startDate:start,
						endDate:end
					}
					return obj;
				}
			},
			//监听地区选择
			changeAddress(v){
				if(!v){
					if(this.dq.length > 0){
						let selAddress = this.dq.join('');
						if(this.dqList.indexOf(selAddress) <= -1){
							this.dqList.push(selAddress);
						}
					}
				}
			},
			//点击删除某一个选中的地址
			deleteAddress(index){
				this.dqList.splice(index,1);
			},
			//保存
			save(){
				//店铺
				this.request.store_id = this.selStore.length > 0?this.selStore.join(','):"";
				//下单时间
				this.request.start_date = this.dateRange && this.dateRange.length > 0?this.dateRange[0]:"";
				this.request.end_date = this.dateRange && this.dateRange.length > 0?this.dateRange[1]:"";
				//交易次数
				if(this.tradeNum != 0 || this.trade_num_date != false){
					this.request.trade_num_date = this.trade_num_date;
					if(this.tradeNum == null){
						let obj = this.contrast(this.trade_num_start,this.trade_num_end);
						if(!obj){
							this.$message.warning("请填写正确的交易次数区间");
							return;
						}else{
							this.request.trade_num = obj.endDate?`${obj.startDate}~${obj.endDate}`:obj.startDate
						}
					}else{
						this.request.trade_num = this.tradeNum;
					}
				}else{
					this.request.trade_num = "";
					this.request.trade_num_date = "";
				}
				//判断平均客单价
				if(this.customer != '0~null' || this.kedan_price_date != false){
					this.request.kedan_price_date = this.kedan_price_date;
					if(this.customer == 'null~null'){
						let obj = this.contrast(this.customer_start,this.customer_end);
						if(!obj){
							this.$message.warning("请填写正确的平均客单价区间");
							return;
						}else{
							this.request.kedan_price = obj.endDate?`${obj.startDate}~${obj.endDate}`:obj.startDate
						}
					}else{
						this.request.kedan_price = this.customer == '0~null'?0:this.customer;
					}
				}else{
					this.request.kedan_price = "";
					this.request.kedan_price_date = "";
				}
				//判断收货地址检索
				if(this.address != ''){
					this.request.address = this.address;
					this.request.address_date = this.address_date;
				}else{
					this.request.address = "";
					this.request.address_date = "";
				}
				//判断商品标题检索
				if(this.goods_title != ''){
					this.request.goods_title = this.goods_title;
					this.request.goods_title_date = this.goods_title_date;
				}else{
					this.request.goods_title = "";
					this.request.goods_title_date = "";
				}
				//判断颜色规格检索
				if(this.specs != ''){
					this.request.specs = this.specs;
					this.request.specs_date = this.specs_date;
				}else{
					this.request.specs = "";
					this.request.specs_date = "";
				}
				//判断姓氏检索
				if(this.first_name != ''){
					this.request.first_name = this.first_name;
					this.request.first_name_date = this.first_name_date;
				}else{
					this.request.first_name = "";
					this.request.first_name_date = "";
				}
				//判断名字检索
				if(this.last_name != ''){
					this.request.last_name = this.last_name;
					this.request.last_name_date = this.last_name_date;
				}else{
					this.request.last_name = "";
					this.request.last_name_date = "";
				}
				//判断x%在x折下购买，不能只填写一个
				if(this.order_percentage == '' && this.order_discount == ''){
					this.request.order_percentage = "";
					this.request.order_discount = "";
					this.request.order_percentage_date = "";
					this.request.order_discount_date = "";
				}else if(this.order_percentage != '' && this.order_discount != ''){
					this.request.order_percentage = this.order_percentage;
					this.request.order_discount = this.order_discount;
					this.request.order_percentage_date = this.sbtj1;
					this.request.order_discount_date = this.sbtj1;
				}else{
					this.$message.warning("请完善下单数量百分比和折扣信息");
					return;
				}
				//判断购买商品数量
				if(this.goods_num_day != '' && this.goods_num_day_start != '' && this.goods_num_day_end != ''){
					this.request.goods_num_day = this.goods_num_day;
					this.request.goods_num_day_start = this.goods_num_day_start;
					this.request.goods_num_day_end = this.goods_num_day_end;
					this.request.goods_num_day_date = this.sbtj2;
					this.request.goods_num_day_start_date = this.sbtj2;
					this.request.goods_num_day_end_date = this.sbtj2;
				}else if(this.goods_num_day == '' && this.goods_num_day_start == '' && this.goods_num_day_end == ''){
					this.request.goods_num_day = "";
					this.request.goods_num_day_start = "";
					this.request.goods_num_day_end = "";
					this.request.goods_num_day_date = "";
					this.request.goods_num_day_start_date = "";
					this.request.goods_num_day_end_date = "";
				}else{
					this.$message.warning("请完善下单数在规定天数内购买的商品数量");
					return;
				}
				//判断购买商品金额
				if(this.order_amount_day != '' && this.order_amount_day_start != '' && this.order_amount_day_end != ''){
					this.request.order_amount_day = this.order_amount_day;
					this.request.order_amount_day_start = this.order_amount_day_start;
					this.request.order_amount_day_end = this.order_amount_day_end;
					this.request.order_amount_day_date = this.sbtj3;
					this.request.order_amount_day_start_date = this.sbtj3;
					this.request.order_amount_day_end_date = this.sbtj3;
				}else if(this.order_amount_day == '' && this.order_amount_day_start == '' && this.order_amount_day_end == ''){
					this.request.order_amount_day = "";
					this.request.order_amount_day_start = "";
					this.request.order_amount_day_end = "";
					this.request.order_amount_day_date = "";
					this.request.order_amount_day_start_date = "";
					this.request.order_amount_day_end_date = "";
				}else{
					this.$message.warning("请完善下单数在规定天数内的购买金额");
					return;
				}
				//地区
				if(this.dqList.length > 0){
					this.request.city = this.dqList.join(',');
					this.request.city_date = this.city_date;
				}else{
					this.request.city = "";
					this.request.city_date = "";
				}
				//标签名验证
				if(this.request.tag_name == ''){
					this.$message.warning("请输入标签名");
					return;
				}
				if(this.tag_descr != ''){
					this.request.tag_descr = this.tag_descr;
				}
				for (const key in this.request) {              
					if (this.request[key] === '') {
						delete this.request[key]
					}
					if(this.request[key] === true){
						this.request[key] = 0;
					}
					if(this.request[key] === false){
						this.request[key] = 1;
					}
				}
				//新增标签
				this.addTag(this.request);
			},
			//新增标签
			addTag(request){
				this.$confirm('确认新增该标签?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					resource.addTag(request).then(res => {
						if(res.data.code == 1){
							this.$message.success("新增成功");
							this.$router.go(-1);
						}else{
							this.$message.warning(res.data.msg)
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






