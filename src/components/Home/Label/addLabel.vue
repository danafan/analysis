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
							<el-radio :label="item.item_start" v-for="item in tradeNumList">{{item.item_value}}</el-radio>
						</el-radio-group>
						<el-input :disabled="tradeNum !== null" style="margin-left: 20px;width: 100px" v-model="trade_num_start" type="number" placeholder="请输入数字"></el-input>&nbsp～&nbsp
						<el-input :disabled="tradeNum !== null" style="width: 100px" v-model="trade_num_end" type="number" placeholder="请输入数字"></el-input>
						<el-checkbox style="margin-left: 20px" v-model="trade_num_date">不限时间</el-checkbox>
					</div>
				</el-form-item>
				<el-form-item label="平均客单价：">
					<div style="display:flex;align-items: center">
						<el-radio-group v-model="customer">
							<el-radio :label="`${item.item_start}~${item.item_end}`" v-for="item in kedanPrice">{{item.item_value}}</el-radio>
						</el-radio-group>
						<el-input :disabled="customer != 'null~null'" style="margin-left: 20px;width: 100px" v-model="customer_start" type="number" placeholder="请输入数字"></el-input>&nbsp～&nbsp 
						<el-input :disabled="customer != 'null~null'" style="width: 100px" v-model="customer_end" type="number" placeholder="请输入数字"></el-input>
						<el-checkbox style="margin-left: 20px" v-model="kedan_price_date">不限时间</el-checkbox>
					</div>
				</el-form-item>
				<el-form-item label="当从收货地址中检索到：">
					<el-input style="width: 300px" v-model="address" placeholder="请输入收获地址检索"></el-input>
					<el-checkbox style="margin-left: 20px" v-model="address_date">不限时间</el-checkbox>
				</el-form-item>
				<el-form-item label="当从商品标题中检索到：">
					<el-input style="width: 300px" v-model="request.goods_name" placeholder="请输入商品标题检索"></el-input>
					<el-checkbox style="margin-left: 20px" v-model="request.goods_name_unlimited">不限时间</el-checkbox>
				</el-form-item>
				<el-form-item label="当从颜色规格中检索到：">
					<el-input style="width: 300px" v-model="request.colour" placeholder="请输入颜色规格检索"></el-input>
					<el-checkbox style="margin-left: 20px" v-model="request.colour_unlimited">不限时间</el-checkbox>
				</el-form-item>
				<el-form-item label="当从姓氏中检索到：">
					<el-input style="width: 300px" v-model="request.surname" placeholder="请输入姓氏检索"></el-input>
					<el-checkbox style="margin-left: 20px" v-model="request.surname_unlimited">不限时间</el-checkbox>
				</el-form-item>
				<el-form-item label="当从名字中检索到：">
					<el-input style="width: 300px" v-model="request.name" placeholder="请输入地址检索"></el-input>
					<el-checkbox style="margin-left: 20px" v-model="request.name_unlimited">不限时间</el-checkbox>
				</el-form-item>
				<el-form-item>
					<div style="display:flex">
						当用户下单&nbsp<el-input type="number" style="width: 100px" v-model="request.percentage" placeholder="请输入数字"></el-input>&nbsp%在&nbsp<el-input type="number" style="width: 100px" v-model="request.discount" placeholder="请输入数字"></el-input>&nbsp折以下购买的
						<el-checkbox style="margin-left: 20px" v-model="request.discount_unlimited">不限时间</el-checkbox>
					</div>
				</el-form-item>
				<el-form-item>
					<div style="display:flex">
						当用户下单数在&nbsp<el-input type="number" style="width: 100px" v-model="request.goods_num_day" placeholder="请输入数字"></el-input>&nbsp天内购买商品数量在&nbsp<el-input type="number" style="width: 100px" v-model="request.goods_num_day_start" placeholder="请输入数字"></el-input>&nbsp～&nbsp<el-input type="number" style="width: 100px" v-model="request.goods_num_day_end" placeholder="请输入数字"></el-input>&nbsp件
						<el-checkbox style="margin-left: 20px" v-model="request.goods_num_day_unlimited">不限时间</el-checkbox>
					</div>
				</el-form-item>
				<el-form-item>
					<div style="display:flex">
						当用户下单数在&nbsp<el-input type="number" style="width: 100px" v-model="request.goods_amount_day" placeholder="请输入数字"></el-input>&nbsp天内购买商品金额在&nbsp<el-input type="number" style="width: 100px" v-model="request.goods_amount_day_start" placeholder="请输入数字"></el-input>&nbsp～&nbsp<el-input type="number" style="width: 100px" v-model="request.goods_amount_day_end" placeholder="请输入数字"></el-input>&nbsp元
						<el-checkbox style="margin-left: 20px" v-model="request.goods_amount_day_unlimited">不限时间</el-checkbox>
					</div>
				</el-form-item>
				<el-form-item label="地区：">
					<el-cascader
					v-model="city"
					:options="options"
					:props="props"
					></el-cascader>
					<el-checkbox style="margin-left: 20px" v-model="request.city_unlimited">不限时间</el-checkbox>
				</el-form-item>
				<el-form-item>
					<div style="display:flex">
						定义为&nbsp<el-input type="number" style="width: 300px" v-model="request.tag_name" placeholder="请输入标签"></el-input>&nbsp标签
					</div>
				</el-form-item>
				<el-form-item label="标签含义：">
					<el-input style="width: 500px" type="textarea" :rows="5" placeholder="请输入标签含义，方便理解" v-model="request.tag_descr">
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
					tag_descr:""
				},								//所有条件（传递）
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


				goods_name:"",
				goods_name_unlimited:0,
				colour:"",
				colour_unlimited:0,
				surname:"",
				surname_unlimited:0,
				name:"",
				name_unlimited:0,
				percentage:"",
				discount:"",
				discount_unlimited:0,
				goods_num_day:"",
				goods_num_day_start:"",
				goods_num_day_end:"",
				goods_num_day_unlimited:0,
				goods_amount_day:"",
				goods_amount_day_start:"",
				goods_amount_day_end:"",
				goods_amount_day_unlimited:0,
				address:"",
				city_unlimited:0,
				options: require('../../../../public/data.json'), //地址列表
				props:{
					value:"label"
				},
				city:[],						//选中的地区
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


				//判断x%在x折下购买，不能只填写一个
				if((this.request.percentage != '' && this.request.discount == '') || (this.request.percentage == '' && this.request.discount != '')){
					this.$message.warning("请完善下单数量百分比和折扣信息");
					return;
				}
				//判断购买商品数量
				if(!(this.request.goods_num_day != '' && this.request.goods_num_day_start != '' && this.request.goods_num_day_end != '') && !(this.request.goods_num_day == '' && this.request.goods_num_day_start == '' && this.request.goods_num_day_end == '')){
					this.$message.warning("请完善下单数在规定天数内的购买数量");
					return;
				}
				//判断购买商品金额
				if(!(this.request.goods_amount_day != '' && this.request.goods_amount_day_start != '' && this.request.goods_amount_day_end != '') && !(this.request.goods_amount_day == '' && this.request.goods_amount_day_start == '' && this.request.goods_amount_day_end == '')){
					this.$message.warning("请完善下单数在规定天数内的购买金额");
					return;
				}
				//标签名验证
				// if(this.request.tag_name == ''){
				// 	this.$message.warning("请输入标签名");
				// 	return;
				// }
				// if(this.request.tag_descr == ''){
				// 	this.$message.warning("请输入标签含义");
				// 	return;
				// }
				for (const key in this.request) {              
					if (this.request[key] === '') {
						delete this.request[key]
					}
				}
				console.log(this.request);
			}
		}
	}
</script>






