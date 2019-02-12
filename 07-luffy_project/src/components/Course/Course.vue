<template>
	<div class="course">
		<div class="main">
			<div class="header">
				<ul class="coursebox">
					  <li>课程分类:</li>
					  <li v-for = '(category,index) in categoryList' :key = "category.id" :class = '{active:index===currentIndex}' @click = 'categoryClick(index,category.id)' >
					  	{{category.name}}
					  </li>
				</ul>
				<div class="filter">
					<ul>
					    <li>筛&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;选:</li>
					    <li :class = '{active:myIndex===i,change1:filterIndex === 0,change2:filterIndex === 1}' v-for= '(item,i) in filterList' :key = 'item.id' @click = 'filterHandler(i,item.query)'>{{  item.title }}</li>
					</ul>
					<p>共{{courseDetail.length}}个课程</p>
				</div>
			</div>

			<div class="courseList" >
				<dl @click = 'courseHandler(course.id)' v-for = '(course,index) in courseDetail' :key = 'course.id'>
					<dt>
						<img :src="course.course_img" alt="">
					</dt>
					<dd>
						<div class="name">
							<!-- 课程标题 -->
							<p>{{ course.name}}</p>
							<p>
								<img src="../../../static/images/icon.svg" alt="">
								<!-- 学习人数 -->
								{{ course.learn_number}}人已加入学习
							</p>
						</div>
						<div class="teacher">
							<!-- 讲师描述 -->
							<p>{{ course.teacher_description}}</p>
							<p>
								共{{ course.numbers}}课时
								<span>/更新完成</span>
							</p>
						</div>
						<ul>
						    <li v-for = '(section,i) in course.free_sections' :key = 'section.id'>
						    	<img src="../../../static/images/play.svg" alt="">
						    	<!-- 模块课程名字 -->
						    	<p>{{ section.name }}</p>
						    	<span v-if = 'section.free_trail'>免费</span>
						    </li>
						</ul>
						<div class="price">
							<p>
								<span v-if = 'course.has_price'>
									¥   {{ course.price }}元
								</span>
							</p>
							<button>立即购买</button>
						</div>
					</dd>
				</dl>
			</div>
		</div>
		
		
	</div>
</template>

<script>
export default {

  name: 'Course',

  data() {
    return {
    	categoryList:[],
    	currentIndex:0,
    	myIndex:0,
    	filterList:[
    		{id:1,title:"默认",query:''},
    		{id:2,title:"人气",query:'-learn_number'},
    		{id:3,title:"价格",query:'price'},

    	],
    	categoryId:0,
    	query:'',
    	courseDetail:[],
    	count:0,
    	filterIndex:null
    };
  },
  methods:{
  	courseHandler(courseId){
  		console.log(courseId)
  		this.$router.push({
  			path:`/courses/${courseId}/details-introduce`,

  		})
  	},
    // 筛选排序处理事件
  	filterHandler(i,query){
  		this.myIndex = i;
  		this.query  = query;
  		if (this.myIndex ===0 ) {
  			this.filterIndex =  null;
  		}else if (this.myIndex === 1) {
  		}else if (this.myIndex === 2) {
  			if (this.count%2 == 0) {
  				this.filterIndex=0;
  			}else{
  				this.query = '-'+ this.query;
  				this.filterIndex=1;
  			}
  			this.count++;
  		}
  		this.getCourseList();
  	},
  	//课程分类事件操作
  	categoryClick(index,categoryId){
  		this.currentIndex = index;
  		this.categoryId = categoryId;
  		this.getCourseList();
  	},
  	// 获取全部的课程列表
  	getCourseList(){
  		this.$http.courseList(this.categoryId,this.query)
	  	.then(res=>{
	  		if (!res.error_no) {
	  			this.courseDetail = res.data;
	  		}
	  	})
	  	.catch(err=>{
	  		console.log(err);
	  	})
  	},
  	// 获取分类列表
  	getCategoryList(){
  		this.$http.categoryList()
	  	.then(res=>{
	  		if (!res.error_no) {
	  			this.categoryList = res.data;
	  			let category = {
	  				id:0,
	  				category:0,
	  				name:'全部'
	  			}
	  			this.categoryList.unshift(category);
	  			console.log(this.categoryList)


	  		}
	  	})
	  	.catch(err=>{
	  		console.log(err);
	  	});
  	},
  },
  created(){
  	this.getCategoryList();
  	this.getCourseList();
  }
};
</script>

<style lang="css" scoped>
.course{
	width: 100%;
	height: 1000px;
	background: #f3f3f3;
}
.main{
	width: 1100px;
	margin: 0 auto;
	padding-top: 35px;
}
.main .header{
    width: 100%;
    height: auto;
    margin-bottom: 35px;
    padding: 25px 30px 25px 20px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 4px 0 #f0f0f0;
}
.coursebox{
	display: flex;
	align-items: center;
	font-size: 16px;
    	color: #888;
   	 font-family: PingFangSC-Regular;
    	letter-spacing: .36px;
    	 border-bottom: 1px solid #333;
	 border-bottom-color: rgba(51,51,51,.05);
	 padding-bottom: 18px;
	 margin-bottom: 17px;
}
.coursebox li{
	padding: 6px 16px;
    line-height: 16px;
    margin-left: 14px;
    position: relative;
    transition: all .3s ease;
    cursor: pointer;
    border: 1px solid transparent;
    color: #4a4a4a;
}

.coursebox li.active{
	 color: #f5a623;
    	border: 1px solid #f5a623!important;
   	 border-radius: 30px;
}
.filter{
	    display: flex;
  	     align-items: center;
    	    justify-content: space-between;
}
.filter ul{
	display: flex;
	align-items: center;
	    font-size: 16px;
	    color: #888;
	    font-family: PingFangSC-Regular;
	    letter-spacing: .36px;
}
.filter ul li{
	    padding: 6px 16px;
	    line-height: 16px;
	    margin-left: 14px;
	    position: relative;
	    transition: all .3s ease;
	    cursor: pointer;
	    color: #4a4a4a;
}
.filter ul li.active{
	color:#f5a623;
}
dl{
	   list-style: none;
	    width: 100%;
	    height: auto;
	    background: #fff;
	    padding: 20px 30px 20px 20px;
	    display: flex;
	    margin-bottom: 35px;
	    border-radius: 2px;
	    cursor: pointer;
	    box-shadow: 2px 3px 16px rgba(0,0,0,.1);
	    transition: all .2s ease;
	    position: relative;
}
dl dt{
	    font-weight: 700;
	    width: 423px;
	    height: 210px;
	    margin-right: 30px
}
dl dt img{
	width: 100%;
	height: 100%;
}

dl dd{
	flex: 1;
	line-height: 1.42857143;
}
.courseList dl dd div{
	    display: flex;
 	   align-items: flex-end;
    	  justify-content: space-between;
    	  margin-bottom: 8px;
}
.courseList  dl dd  .name p{
	display: flex;
	 font-size: 14px;
	 font-weight: 500;
   	 color: #9b9b9b;
   	 font-family: PingFangSC-Light;
}
.courseList  dl dd .name p:first-child{
	font-size: 26px;
          color: #333;
}
.courseList  dl dd p img{
	width: 11px;
    	margin-right: 7px;
    	vertical-align: middle;
}
.teacher{
     display: flex;

    align-items: flex-end;
    justify-content: space-between;
    font-size: 14px;
    color: #9b9b9b;
    margin-bottom: 14px;
    padding-bottom: 14px;
    font-family: PingFangSC-Light;
    border-bottom: 1px solid #333;
    border-bottom-color: rgba(51,51,51,.05);
}
.courseList dl dd ul {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
}
.courseList dl dd ul li{
    width: 49%;
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #666;
    margin-bottom: 15px;
    cursor: pointer;
}
.courseList dl dd ul li img{
    width: 16px;
    height: 16px;
    margin-right: 6px;
}
.courseList dl dd ul li p{
     max-width: 227px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-family: PingFangSC-Regular;
}
.courseList dl dd ul li span{
    width: 34px;
    height: 20px;
    color: #fd7b4d;
    margin-left: 30px;
    border: 1px solid #fd7b4d;
    border-radius: 2px;
    text-align: center;
    font-size: 13px;
    white-space: nowrap;
}
.courseList dl dd ul li:hover{
	color: #f5a623;
}
.courseList dl dd .price{
    justify-content: space-between;
    font-family: PingFangSC-Medium;
    margin-top: 7px;
    display: flex;
    align-items: center;
}
.courseList dl dd .price span {
	    font-size: 24px;
   	 color: #fa6240;
}
.courseList dl dd .price button{
    cursor: pointer;
    outline: none;
    width: 120px;
    height: 38px;
    background: transparent;
    color: #fa6240;
    font-size: 16px;
    border: 1px solid #fd7b4d;
    border-radius: 3px;
    font-family: PingFangSC-Regular;
    transition: all .2s ease-in-out;
}
.filter ul li:nth-child(4):before{
    content: "";
    width: 0;
    border: 5px solid transparent;
     border-top-color: #d8d8d8;
    position: absolute;
    right: 0;
    bottom: 2.5px;
}
.filter ul li:nth-child(4):after{
    content: "";
    width: 0;
    border: 5px solid transparent;
    border-bottom-color: #d8d8d8;
    position: absolute;
    right: 0;
    top: 2.5px;
}
.filter ul li:nth-child(4).change1:after{
     content: "";
    width: 0;
    border: 5px solid transparent;
    border-bottom-color: #f3a536;
    position: absolute;
    right: 0;
    top: 2.5px;
}
.filter ul li:nth-child(4).change2:before{
    content: "";
    width: 0;
    border: 5px solid transparent;
     border-top-color: #f3a536;
    position: absolute;
    right: 0;
    bottom: 2.5px;
}
.filter p{
	font-family: PingFangSC-Light;
    font-size: 14px;
    color: #9b9b9b;
}


</style>
