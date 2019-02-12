<template>

	<div class="row">
			 <el-table
			    ref="multipleTable"
			    :data="shopCartList"
			    tooltip-effect="dark"
			    style="width: 100%"
			    @selection-change="handleSelectionChange">
			    <el-table-column
			      label="课程"
			      width="555" >
			      <template slot-scope="scope">
			      	<img src="" alt="">
			      	<a href="javascript:void(0);">Mysql数据库入门至进阶</a>
			      </template>
			    </el-table-column>
			       <el-table-column
			       label = '有效期'
			      width="100" >
			      <template slot-scope="scope">
			      	<p>3个月</p>
			      </template>
			    </el-table-column>
			         <el-table-column
			         label='原价'
			      width="100" >
			      <template slot-scope="scope">
			      	<p>¥299</p>
			      </template>
			    </el-table-column>
			    <el-table-column
			      prop="name"
			      label="优惠券"
			      width="100">
			      <template slot-scope='scope'>
			      	<!-- 默认选中 select 中v-model的值 等于 option中value -->
			      	<select >
			      		<option  value = '' >
			      			课程优惠券   			
			      		</option>
			      	</select>
			      </template>
			    </el-table-column>
			    <el-table-column
			      prop="address"
			      label="折后价"
			      show-overflow-tooltip>
			      <template slot-scope='scope'>
			      	¥255
			      </template>
			    </el-table-column>
			  </el-table>
		</div>
	</div>
</template>

<script>
// 课程购买页面 根据之前咱们的学习，大家根据接口的地址可以尝试着编写这个页面，上面使用的组件是element-ui中的表格组件，大家可以参考Cart.vue组件
export default {

  name: 'CourseBuy',

  data() {
    return {
    	shopCartList:[]
    };
  },
  methods:{
  	handleSelectionChange(val) {
		console.log(val);
		this.multipleSelection = val;
	}
  }
};
</script>

<style lang="css" scoped>
</style>
