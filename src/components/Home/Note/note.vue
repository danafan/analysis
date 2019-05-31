<template>
	<div>
		<el-card>
			<div class="infoTitle"><div class="line"></div>记录</div>
			<el-table :data="noteList" border style="width: 100%" align="center" :header-cell-style="{'background':'#f4f4f4'}">
				<el-table-column prop="send_time" label="发送时间" align="center">
				</el-table-column>
				<el-table-column prop="select_label" label="选择的标签" align="center">
				</el-table-column>
				<el-table-column prop="note_content" label="短信内容" width="300" align="center" :show-overflow-tooltip="true">
				</el-table-column>
				<el-table-column prop="cover_number" label="覆盖人数" align="center">
				</el-table-column>
				<el-table-column prop="change_number" label="转化人数" align="center">
				</el-table-column>
				<el-table-column prop="change_money" label="转化金额" align="center">
				</el-table-column>
				<el-table-column label="操作" align="center" >
					<template slot-scope="scope">
						<el-button type="text" size="small" @click="look(scope.row)">查看</el-button>
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
				total:100,
				noteList:[
				{
					send_time:"2019-04-12 13:48:52",
					select_label:"学校",
					note_content:"这是短信内容啊都是粉红色的副科级啊还是看大家发贺卡决",
					cover_number:1000,
					change_number:200,
					change_money:5000
				}
				]
			}
		},
		methods:{
			//查看
			look(row){
				console.log(row);
				this.$router.push('/noteDetail');
			},
			//分页
			handleSizeChange(val) {
				this.request.pagesize = val;
			},
			handleCurrentChange(val) {
				this.request.page = val;
			},
		}
	}
</script>




