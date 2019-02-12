
import Axios  from 'axios'
// 设置公共的url
Axios.defaults.baseURL = 'https://www.luffycity.com/api/v1/';
import QS from 'qs'
import VueCookies from 'vue-cookies'

// 添加请求拦截器
Axios.interceptors.request.use(function (config) {
    console.log(VueCookies.get('access_token'))
    // 在发送请求之前做些什么
    if (VueCookies.get('access_token')) {
        //用户登录完成之后 ，每次请求都携带请求头的token值，
    	config.headers.Authorization = VueCookies.get('access_token')
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
// 分类列表api
export const categoryList =  ()=> {
	return Axios.get('course_sub/category/list/').then(res=>res.data);
}
// https://www.luffycity.com/api/v1/courses/?sub_category=0
export const  courseList = (categoryId,order)=>{
	return Axios.get(`courses/?sub_category=${categoryId}&ordering=${order}`).then(res=>res.data);
}
// 课程详情顶部数据
export const courseTop = (courseid)=>{
	return Axios.get(`/course/${courseid}/top/`).then(res=>res.data);
}
// 课程概述
export const coursePaymentInfo = (courseid)=>{
	return Axios.get(`course/${courseid}/payment_info/`).then(res=>res.data);
}

// geetest接口
export const geetest = ()=>{
	return Axios.get(`captcha_check/`).then(res=>res.data);
}

// 登录
export const  userLogin = (params)=>{
	// 这个参数至少有五个字段 username password  验证的三个字段
	return Axios.post('account/login/',params).then(res=>res.data);
}
// 加入购物车的接口
export const shopCart = (params)=>{
    console.log(params)
	return Axios.post('user/shop_cart/create/',params).then(res=>res.data);
}
// 购物车的数据
export const shopCartList = ()=>{
	return Axios.get(`user/shop_cart/list/`).then(res=>res.data);
}
export const removeCourse = (params)=>{
    // params = QS.stringify(params);
    // console.log(params);
    // 如果服务端将参数当做 java对象来封装接收则 参数格式为：{data: param}
    return Axios.delete(`user/shop_cart/remove/`,{data: params}).then(res=>res.data);
}

//更新购物车套餐数据
export const shopCartUpdate = (params)=>{
    return Axios.put(`user/shop_cart/update/`,params).then(res=>res.data);
}
export const order_confirm = (params)=>{
    return Axios.post('/order/confirm/',params).then(res=>res.data)
}