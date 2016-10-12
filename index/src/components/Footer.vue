<template>
  <div class="footer">
    <div class="row">
      <div class="col-xs-3 col-ps-12 item item-1">
        <img src="../images/footer/one-pieces.jpg">
        <div class="logo">一块应用</div>
        <div>您的移动端推广路上的智囊团</div>
      </div>
      <div class="col-xs-2 col-ps-12 item item-2">
        <div class="margin14">H5案例</div>
        <div class="margin14">流量推广</div>
        <div class="margin14">效果监测</div>
        <div class="margin14">案例解读</div>
      </div>
      <div class="col-xs-2 col-ps-12 item item-3">
        <div class="margin35">关于我们</div>
        <div class="margin35">联系我们</div>
      </div>
      <div class="col-xs-5 col-ps-12 item item-4">
        <div class="col-sm-6">
          <div class="margin14">联系电话: 18616854188</div>
          <div class="margin14">市场合作: linifftwe@163.com</div>
          <div class="margin14">简历投递: linifftwe@163.com</div>
        </div>
        <div class="col-sm-6">
          <img src="../images/footer/tail_erweima.png">
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div>沪ICP证110507号|沪ICP备10046444号</div>
        <div>Copyright 2016 by 上海稔二信息有限公司.All rights reserved</div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" rel="stylesheet/scss">
  .footer {
    width: 80%;
    margin: 40px auto;
    color: #b3b3b3;
    font-size: 14px;
    text-align: center;
    .row {
      &:not(:first-child) {
        margin-top: 20px;
        border-top: 1px solid #2a313a;
        font-size: 12px;
        div {
          margin-top: 6px;
        }
      }
    }
    .item {
      min-height: 146px;
      &:not(:first-child) {
        border-left: 1px solid #2a313a;
      }
    }
    .item-1 {
      font-size: 12px;
      .logo {
        font-size: 18px;
        margin: 5px 0;
      }
      img {
        margin-top: 15px;
        max-width: 80px;
      }
    }
    .margin14 {
      margin-top: 14px;
    }
    .margin35 {
      margin-top: 35px;
    }
  }
</style>
<script type="text/ecmascript-6" lang="babel">
  export default {
  };
</script>