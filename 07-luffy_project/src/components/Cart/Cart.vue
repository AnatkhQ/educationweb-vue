<template>
	<div class="shopping-cart-wrap">
		<h3 class="shopping-cart-tit">我的购物车<small>共1门课程</small></h3>
		<div class="row">
			 <el-table
			    ref="multipleTable"
			    :data="shopCartList"
			    tooltip-effect="dark"
			    style="width: 100%"
			    @selection-change="handleSelectionChange">
			    <el-table-column
			      type="selection"
			      width="55">
			    </el-table-column>
			    <el-table-column
			      label="课程"
			      width="555" >
			      <template slot-scope="scope">
			      	<img :src="scope.row.courseImg" alt="">
			      	<a href="javascript:void(0);">{{ scope.row.courseName}}</a>
			      </template>
			    </el-table-column>
			    <el-table-column
			      prop="name"
			      label="有效期"
			      width="212">
			      <template slot-scope='scope'>
			      	<!-- 默认选中 select 中v-model的值 等于 option中value -->
			      	<select v-model = 'scope.row.validPeriodId' @change ='changeHandler(scope.row,scope.row.courseId,scope.row.validPeriodId)'>
			      		<option v-for = '(item,index) in scope.row.validPeriodChoices'  :value = 'item.validPeriodId' >
			      			有效期{{item.validPeriod}}      			
			      		</option>
			      	</select>
			      </template>

			    </el-table-column>
			    <el-table-column
			      prop="address"
			      label="单价"
			      show-overflow-tooltip>
			      <template slot-scope='scope'>
			      	¥{{scope.row.coursePrice}}
			      </template>
			    </el-table-column>
			 <el-table-column
			      fixed="right"
			      label="操作"
			      width="120">
			      <template slot-scope="scope">
			        <el-button
			          @click.native.prevent="deleteRow(scope.$index, shopCartList)"
			          type="text"
			          size="small">
			          删除
			        </el-button>
			      </template>
			    </el-table-column>
			  </el-table>
		</div>
		<div class="total">
			<el-button type="primary" @click='orderHandler'>去结算</el-button>
			<h3>总计: ¥{{totalPrice}}</h3>	
		</div>
	</div>
</template>

<script>
export default {
	name:'Cart',
	data(){
		return {
			 multipleSelection: [], //存放选中的当前数据
			 shopCartList:[],
			 currentVal:''
		}
	},
	computed:{
		totalPrice(){
			let total = 0;
			this.multipleSelection.forEach((item,index)=>{
				total += parseFloat(item.coursePrice)
			})
			return  total;
		}
	},
	methods:{
		orderHandler(){
			console.log(this.multipleSelection)
			if (this.multipleSelection.length) {
				this.$router.push({
					name:'course.buy'
				})
			}else{
				this.$message('请选择要购买的课程~')
			}
		},
		changeHandler(row,courseId,newValidPeriodId){
			let  oldValidPeriodId;
			row.validPeriodChoices.forEach((el,index)=>{
				if (el.default) {
					oldValidPeriodId = el.validPeriodId
				}
			})
			console.log(courseId);
			console.log(newValidPeriodId);
			console.log(oldValidPeriodId)
			
			let params = {
				courseId:courseId,
				newValidPeriodId:newValidPeriodId,
				oldValidPeriodId:oldValidPeriodId
			}
			console.log(params);
			this.$http.shopCartUpdate(params)
			.then(res=>{
				console.log(res);
				if (res.error_no ===0) {
					this.oldValidPeriodId = res.data.validPeriodId;
					this.shopCartList.forEach((el,index)=>{
						console.log(el);
						if (el.courseId == res.data.courseId) {
							this.shopCartList.splice(index,1,res.data)
						}
					})
					console.log(this.shopCartList)
				}
			})

		},
		// 删除课程
		deleteRow(index,rows){
			console.log(index);
			console.log(rows);
			console.log(rows[index].courseId)
			let params = {
				removeShopFromCart:[
					{
						course_id: rows[index].courseId,
						valid_period_id: rows[index].validPeriodId
					}
				]
			};
			this.$http.removeCourse(params)
			.then(res=>{
				console.log(res);
				if (res.error_no == 0) {
					this.$message('删除成功');
					this.getShopCartList();
				}
			})


		},
		getShopCartList(){
			this.$http.shopCartList()
			.then(res=>{
				console.log('=====',res);
				if (res.error_no ===0) {
					this.shopCartList = res.data.myShopCart;
					// 存储当前价格套餐的id
				}
			})
			.catch(err=>{
				console.log(err);
			})
		},
		handleSelectionChange(val) {
			console.log(val);
		        this.multipleSelection = val;
		}
	},
	created(){
		this.getShopCartList();
	}

};
</script>

<style lang="css" scoped>
.shopping-cart-wrap{
	width: 100%;
}
.shopping-cart-wrap h3,.row{
	width: 1200px;
	margin: 0 auto;
}
.shopping-cart-wrap h3{
	padding: 50px 0 ;
}
.el-table .warning-row {
	background: #22C8C5;
}
.cell img{
	vertical-align: middle;
	width: 170px;
}
.cell a{
	color: #000;
	margin-left: 30px;
}
select {
    border: 0;
    outline: none;
    font-size: 12px;
    color: #666;
    line-height: 18px;
    width: 117px;
    height: 28px;
    padding-left: 16px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
}
.total{
	width: 1200px;
	margin: 0 auto;
	/*display: flex;*/
	/*justify-content:flex-end;*/

}
.shopping-cart-wrap .total button{
	float: right;
	margin-top: 20px;
}

.shopping-cart-wrap .total h3{
	padding: 0;
	float: right;
	width: 100px;
	height: 30px;
	margin-top: 30px;
}

</style>
