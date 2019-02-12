// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// elementUI 导入
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 调用插件
Vue.use(ElementUI);
// 导入自己编写的全局的css和滑动验证的js文件
import '../static/global/global.css'
import '../static/global/gt.js'

// 导入axios
import * as api from './restful/api'
Vue.prototype.$http = api;

// store的引入
import store from '../src/store'

//vue-cookies的使用
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

// 全局守卫  当导航栏的地址发生改变时，这个全局的路由钩子函数会调用
router.beforeEach((to, from, next) => {
if (VueCookies.get('access_token')) {
	console.log(VueCookies.get('shop_cart_num'));
	// 用户登录过
	let user = {
		access_token:VueCookies.get('access_token'),
		username:VueCookies.get('username'),
		avatar:VueCookies.get('avatar'),
		shop_cart_num:VueCookies.get('shop_cart_num')
	};
	//刷新页面  解决 用户信息存储和 购物车商品数量存储
	store.dispatch('getUserInfo',user);
	store.dispatch('shopcart_num',parseInt(user.shop_cart_num));
}
  next();
})

// 全局的过滤器     以后如果想处理相同的数据，对数据‘添油加醋’可以在这里声明全局的过滤器
Vue.filter('course_brief',function(brief){
	if (brief.length  > 20) {
		brief = brief.slice(0,35)
		console.log(brief)
		return  `${brief}...`
	}else{
		return brief
	}
})



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
