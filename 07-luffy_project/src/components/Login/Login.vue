<template>
	<div class="box">
		<img src="https://www.luffycity.com/static/img/Loginbg.3377d0c.jpg" alt="">
		<div class="login">
			<div class="login-title">
				<img src="https://www.luffycity.com/static/img/Logotitle.1ba5466.png" alt="">
				<p>帮助有志向的年轻人通过努力学习获得体面的工作和生活!</p>
			</div>
			<div class="login_box">
				<div class="title">
					<span>密码登录</span>
					<span>短信登录</span>
				</div>
				<div class="inp">
					<input v-model = 'username' type="text"  placeholder="用户名 / 手机号码" class="user">
					<input v-model = 'password' type="password" name="" class="pwd" placeholder="密码">
					<div id="geetest"></div>
					<div class="rember">
						<p>
							<input type="checkbox" class="no" name="a"></input>
							<span>记住密码</span>
						</p>
						<p>忘记密码</p>
					</div>
					<button class="login_btn" @click = 'loginHandler'>登录</button>
					<p class="go_login" >没有账号 <span>立即注册</span></p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'Login',
  data(){
    return {
        username:"",
        password:"",
        validateResult:{},//验证成功之后返回的结果，它用于服务端sdk的二次验证
    }
  },

  methods:{
    loginHandler(){
        let params = {
            username:this.username,
            password:this.password,
            geetest_challenge:this.validateResult. geetest_challenge,
            geetest_validate:this.validateResult.geetest_validate,
            geetest_seccode:this.validateResult. geetest_seccode
        }
        this.$http.userLogin(params)
        .then(res=>{
            if (res.error_no === 0) {
            
                for(let key in res.data){
                    this.$cookies.set(key,res.data[key])
                }
                // 分发actions中getUserInfo方法  找store/index.js
                this.$store.dispatch('getUserInfo',res.data)
                //返回之前的前面
                this.$router.go(-1);
            }
        })
        .catch(err=>{
            console.log(err);
        })
    },
    getGeetest(){
        this.$http.geetest()
        .then(res=>{
                let data  = res.data;
                var _this = this;
                    //请检测data的数据结构， 保证data.gt, data.challenge, data.success有值
                initGeetest({
                    // 以下配置参数来自服务端 SDK
                    gt: data.gt,
                    challenge: data.challenge,
                    offline: !data.success,
                    new_captcha: true,
                    product: 'popup',
                    width:'100%'
                },  (captchaObj)=>{
                    // 这里可以调用验证实例 captchaObj 的实例方法
                       captchaObj.appendTo("#geetest"); //将验证按钮插入到宿主页面中captchaBox元素内
                        captchaObj.onReady(()=>{
                          //your code
                        }).onSuccess(()=>{
                            var result = captchaObj.getValidate();
                            // 将后端返回的 下次登录时候的字段保存起来
                            this.validateResult = result;
                        }).onError(()=>{

                        })
                })
        })
        .catch(err=>{
            console.log(err);
        })
    }
  },
  created(){
    this.getGeetest()
  }
};
</script>

<style lang="css" scoped>
.box{
	width: 100%;
	position: relative;

}
.box img{
	width: 100%;
}
.box .login {
	position: absolute;
	width: 500px;
	height: 400px;
	top: 50%;
	left: 50%;
	margin-left: -250px;
	margin-top: -300px;
}
.login .login-title{
     width: 100%;
    text-align: center;
}
.login-title img{
    width: 190px;
    height: auto;
}
.login-title p{
    font-family: PingFangSC-Regular;
    font-size: 18px;
    color: #fff;
    letter-spacing: .29px;
    padding-top: 10px;
    padding-bottom: 50px;
}
.login_box{
    width: 400px;
    height: auto;
    background: #fff;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.5);
    border-radius: 4px;
    margin: 0 auto;
    padding-bottom: 40px;
}
.login_box .title{
	font-size: 20px;
	color: #9b9b9b;
	letter-spacing: .32px;
	border-bottom: 1px solid #e6e6e6;
	 display: flex;
    	justify-content: space-around;
    	padding: 50px 60px 0 60px;
    	margin-bottom: 20px;
    	cursor: pointer;
}
.login_box .title span:nth-of-type(1){
	color: #4a4a4a;
    	border-bottom: 2px solid #84cc39;
}

.inp{
	width: 350px;
	margin: 0 auto;
}
.inp input{
    border: 0;
    outline: 0;
    width: 100%;
    height: 45px;
    border-radius: 4px;
    border: 1px solid #d9d9d9;
    text-indent: 20px;
    font-size: 14px;
    background: #fff !important;
}
.inp input.user{
    margin-bottom: 16px;
}
.inp .rember{
     display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    margin-top: 10px;
}
.inp .rember p:first-of-type{
    font-size: 12px;
    color: #4a4a4a;
    letter-spacing: .19px;
    margin-left: 22px;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    /*position: relative;*/
}
.inp .rember p:nth-of-type(2){
    font-size: 14px;
    color: #9b9b9b;
    letter-spacing: .19px;
    cursor: pointer;
}

.inp .rember input{
    outline: 0;
    width: 30px;
    height: 45px;
    border-radius: 4px;
    border: 1px solid #d9d9d9;
    text-indent: 20px;
    font-size: 14px;
    background: #fff !important;
}

.inp .rember p span{
    display: inline-block;
  font-size: 12px;
  width: 100px;
  /*position: absolute;*/
/*left: 20px;*/

}
#geetest{
	margin-top: 20px;
}
.login_btn{
     width: 100%;
    height: 45px;
    background: #84cc39;
    border-radius: 5px;
    font-size: 16px;
    color: #fff;
    letter-spacing: .26px;
    margin-top: 30px;
}
.inp .go_login{
    text-align: center;
    font-size: 14px;
    color: #9b9b9b;
    letter-spacing: .26px;
    padding-top: 20px;
}
.inp .go_login span{
    color: #84cc39;
    cursor: pointer;
}
</style>
