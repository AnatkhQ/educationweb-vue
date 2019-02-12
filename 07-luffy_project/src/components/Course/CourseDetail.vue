<template>
  <div class="courseitem">
    <div class="head-wrap">
      <div class="head-video">
        <div class="videos">
          <div class="singles-video" id="singlesVideo"></div>
        </div>
        <div class="item">
          <p class="name">{{courseTop.name}}</p>
          <p class="data">{{courseTop.learn_number}}人在学&nbsp;&nbsp;&nbsp;&nbsp;课程总时长：{{courseTop.numbers}}课时/{{courseTop.hours}}小时&nbsp;&nbsp;&nbsp;&nbsp;难度：{{courseTop.level}}</p>
          <div class="preferential"  v-if = 'paymentInfo.is_promotion'>
            <p>{{ paymentInfo.price }}</p>
            <p>距离结束：仅剩 20天 10小时 21分 <span>23</span> 秒</p>
          </div>
          <p class="price"><span>价格</span><span class="sp1" v-if = '!paymentInfo.promotion_price '>¥{{ paymentInfo.price }}</span><span class="sp2" v-else>{{ paymentInfo.promotion_price}}</span></p>
          <div class="bottom">
            <p class="btns">
              <button   class="btn1">立即购买</button>
              <button   class="btn2">免费试学</button>
            </p>
            <p class="add" v-if = 'paymentInfo.has_price' @click='addShop(paymentInfo.valid_period)'>
              <img src="../../../static/images/shop.svg" alt="">
                <transition name="bounce"  v-on:after-enter="afterEnter">
                <p v-if="show" class='active'>+1</p>
              </transition>
            </p>
          
          </div>
        </div>
      </div>
    </div>
    <div class="tab">
      <ul>
        <li >详情介绍</li>
        <li>课程章节 <span>(试学)</span></li>
        <li>用户评论 (20)</li>
        <li>常见问题</li>
      </ul>
    </div>
    <router-view></router-view>
  </div>

</template>

<script>
export default {
  name:'CourseDetail',
  data(){
    return {
        courseTop:{},
        paymentInfo:{},
        show:false
    }
  },
  methods:{
    afterEnter(){
      this.show = false;
    },
    // 添加购物车按钮事件
    addShop(validPeriodId){
        if (this.$cookies.isKey('access_token')) {
          //用户已登录  买东西
          let param = {
            courseId:this.$route.params.detailId,
            validPeriodId:validPeriodId
          }
          this.$http.shopCart(param)
          .then(res=>{
            console.log(res);
            if (res.error_no ===10) {
              this.$message('购物车套餐更新成功')
            }
            if (res.error_no === 0) {
              this.show = !this.show;
              var num = parseInt(this.$cookies.get('shop_cart_num'));
              num++;
                  //分发actions中声明的shopcart_num方法，让购物车的数量+1
              this.$store.dispatch('shopcart_num',num);

              //同时保存cookie中存储的购物车数量
              this.$cookies.set('shop_cart_num',num)
            }
            
          })
          .catch(err=>{
            console.log(err);
          })
        }else{
          //用户未登陆
          // 跳转登录页面 
          // 使用编程式导航来跳转
          this.$router.push({
            name:'Login',
            query:{
              return_url:window.location.href
            }
          })

        }

    },
    getCourseTop(){
      this.$http.courseTop(this.$route.params.detailId)
      .then(res=>{
        console.log(res)
        if (res.error_no === 0) {
          this.courseTop = res.data;
        }
      })

    },
    getCoursePaymentInfo(){
      this.$http.coursePaymentInfo(this.$route.params.detailId)
      .then(res=>{
        console.log(res);
        this.paymentInfo = res.data;
      })
    }
  },
  created(){
      this.getCourseTop();
      this.getCoursePaymentInfo()
  }
}
</script>

<style>
button{
  border: 0;
  outline: 0;
}
  .singles-video .prism-info-display {
    z-index: 1 !important;
  }
  .singles-video .prism-big-play-btn {
    position: absolute;
    left: 50% !important;
    bottom: 50% !important;
    margin-left: -31.5px !important;
    margin-bottom: -31.5px !important;
    cursor: pointer !important;
    z-index: 2 !important;
  }
  .courseitem {
    width: 100%;
    height: auto;
    background: #FAFAFA
}

.courseitem .head-wrap {
    width: 100%;
    height: auto;
    background: #fff;
    padding-top: 30px
}

.courseitem .head-wrap .head-video {
    width: 1200px;
    height: auto;
    display: flex;
    margin: 0 auto
}

.courseitem .head-wrap .head-video .videos {
    width: 690px;
    height: 388px;
    background: #000
}

.courseitem .head-wrap .head-video .videos div {
    width: 100%;
    height: 100%
}

.courseitem .head-wrap .head-video .item {
    flex: 1;
    background: #fff;
    position: relative
}

.courseitem .head-wrap .head-video .item .name {
    font-family: PingFangSC-Medium;
    font-size: 20px;
    color: #333333;
    padding: 10px 23px;
    letter-spacing: 0.45px
}

.courseitem .head-wrap .head-video .item .data {
    padding-left: 23px;
    padding-right: 23px;
    padding-bottom: 16px;
    font-size: 14px;
    color: #9B9B9B;
    font-family: PingFangSC-Light
}

.courseitem .head-wrap .head-video .item .preferential {
    width: 100%;
    height: auto;
    background: #FA6240;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #4A4A4A;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 23px
}

.courseitem .head-wrap .head-video .item .preferential p:nth-of-type(1) {
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #FFFFFF;
    letter-spacing: 0.36px
}

.courseitem .head-wrap .head-video .item .preferential p:nth-of-type(2) {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #FFFFFF
}

.courseitem .head-wrap .head-video .item .preferential p:nth-of-type(2) span {
    width: 24px;
    height: auto;
    display: inline-block;
    background: #FAFAFA;
    color: #5E5E5E;
    padding: 6px 0;
    text-align: center
}

.courseitem .head-wrap .head-video .item .price {
    width: 100%;
    height: auto;
    background: #F9F1E7;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #4A4A4A;
    display: flex;
    align-items: flex-end;
    padding: 5px 23px
}

.courseitem .head-wrap .head-video .item .price .sp1 {
    font-size: 26px;
    color: #FA6240;
    margin-left: 10px;
    display: inline-block;
    margin-bottom: -5px
}

.courseitem .head-wrap .head-video .item .price .sp2 {
    font-size: 14px;
    color: #9b9b9b;
    margin-left: 10px;
    text-decoration: line-through
}

.courseitem .head-wrap .head-video .item .bac {
    background: #fff
}

.courseitem .head-wrap .head-video .item .bottom {
    position: absolute;
    left: 0;
    bottom: 20px;
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 23px;
    padding-right: 23px
}

.courseitem .head-wrap .head-video .item .bottom .btns {
    display: flex;
    align-items: center
}

.courseitem .head-wrap .head-video .item .bottom .btns button {
    width: 125px;
    height: 40px;
    background: #F5A623;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
    margin-right: 15px
}

.courseitem .head-wrap .head-video .item .bottom .btns .btn2 {
    background: #fff;
    color: #F3A536;
    border: 1px solid #F3A536
}

.courseitem .head-wrap .head-video .item .bottom .add img {
    width: 20px;
    height: auto;
    cursor: pointer
}

.courseitem .tab {
    width: 100%;
    height: auto;
    background: #fff;
    margin-bottom: 30px;
    box-shadow: 0 2px 4px 0 #F0F0F0
}

.courseitem .tab ul {
    width: 1200px;
    height: auto;
    display: flex;
    align-items: center;
    margin: 0 auto;
    color: #4A4A4A;
    font-family: PingFangSC-Regular
}

.courseitem .tab ul li {
    margin-right: 15px;
    padding-top: 26px;
    padding-bottom: 16px;
    padding-left: 20px;
    padding-right: 20px;
    font-size: 17px;
    cursor: pointer
}
.courseitem .tab ul li span {
    color: #FB7C55
}

.courseitem .this {
    color: #F5A623;
    border-bottom: 2px solid #F5A623
}

.courseitem .this span {
    color: #F5A623 !important
}
.bounce-enter-active {
  animation: bounce-in .5s;
}
/*.bounce-leave-active {
  animation: bounce-in .5s reverse;
}*/
@keyframes bounce-in {
  0% {
    transform: translate(0,0);
  }
  100% {
    transform: translate(0,-50px);
  }
}
p.add{
  position: relative;
}
p.active{
  color: #D38600;
  font-size: 20px;
  font-weight: 500;
  position: absolute;
  top: -5px;
  left: 0;
}
</style>

