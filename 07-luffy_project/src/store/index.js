import Vue from 'vue'
import Vuex from 'vuex'
import VueCookies from 'vue-cookies'
Vue.use(Vuex);

let store = new Vuex.Store({
	// 三大将
	state:{
		userInfo:{},
		num: 0
	},
	// 修改state的唯一方法 是提交mutations
	mutations:{
		getUserInfo(state,user){
			state.userInfo = user;
			console.log(state.userInfo);
		},
		shopcart_num(state,num){
			state.num = num;
		}
	},
	actions:{
		getUserInfo({commit},user){
			commit('getUserInfo',user);
		},
		shopcart_num({commit},num){
			commit('shopcart_num',num)
		}
	}
});
export default store;