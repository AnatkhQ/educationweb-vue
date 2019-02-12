import Vue from 'vue'
import Router from 'vue-router'
// @ 绝对路径 检索到 .....src/
// 如果我们Router当做局部模块使用 一定要Vue.use(Router)
// 以后在组件中  可以通过this.$router  获取Router实例化对象
// 路由信息对象 this.$routes
import Home from '@/components/Home/Home'
import Course from '@/components/Course/Course'
import LightCourse from '@/components/LightCourse/LightCourse'
import Micro from '@/components/Micro/Micro'
import CourseDetail from '@/components/Course/CourseDetail'
import Login from '@/components/Login/Login'
import Cart from '@/components/Cart/Cart'
import CourseBuy from '@/components/Cart/CourseBuy'
import CourseItem  from '@/components/Course/CourseItem'
Vue.use(Router)

// 配置路由规则
export default new Router({
   linkActiveClass:'is-active',
   mode: 'history',//改成history模式
  routes: [
    {
      path: '/',
      redirect:'/home'
      // component: HelloWorld
    },
    {
    	path:"/home",
    	name:'Home',
    	component:Home
    },
    {
    	path:"/course",
    	name:'Course',
    	component:Course
    },
    {
    	path:"/home/light-course",
    	name:'LightCourse',
    	component:LightCourse
    },
    {
    	path:"/micro",
    	name:'Micro',
    	component:Micro
    },
    // 课程详情
    {
      path:"/courses/:detailId",
      name:'courseDetail',
      component:CourseDetail,
      children:[
        {
          path:'details-introduce',
          component:CourseItem
        }
      ]
    },
    {
      path:'/login',
      name:'Login',
      component:Login
    },
    // 购物车的页面
    {
      path:"/purchase/shopping_cart",
      name:'purchase.shop',
      component:Cart
    },
    {
      path:'/course/buy',
      name:'course.buy',
      component:CourseBuy
    }
  ]
})
