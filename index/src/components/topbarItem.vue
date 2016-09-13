<template>
  <div class="topbar-item">
    <div class="public-rotate-circle1">
      <div class="rotate-circle3-bg"></div>
      <div class="rotate-circle4-bg"></div>
      <div class="rotate-circle6-bg"></div>
      <span>{{item.label}}</span>
    </div>
  </div>
</template>
<style lang="scss" rel="stylesheet/scss">
  .topbar-item {
    width: 25%;
    height: 146px;
    background: url('../images/item-down.png') no-repeat center 56px;
    font-size: 27px;
    color: #0888a3;
    float: left;
    .public-rotate-circle1 {
      overflow: hidden;
      position: relative;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      .rotate-circle3-bg {
        position: absolute;
        /*width: 146px;
        height: 147px;
        top: -62px;*/
        width: 100%;
        height: 100%;
        left: 0;
        z-index: 5;
        zoom: 1;
        background: url('../images/item-circle.png') no-repeat center center;
        background-size: contain;
      }
      .rotate-circle4-bg {
        position: absolute;
        /*width: 146px;
        height: 147px;
        top: -62px;*/
        width: 100%;
        height: 100%;
        left: 0;
        z-index: 3;
        zoom: 1;
        background: url('../images/item-circle1.png') no-repeat center center;
        background-size: contain;
      }
      .rotate-circle6-bg {
        position: absolute;
        /*width: 146px;
        height: 147px;
        top: -62px;*/
        width: 100%;
        height: 100%;
        left: 0;
        z-index: 3;
        zoom: 1;
        background: url('../images/item-circle2.png') no-repeat center center;
        background-size: contain;
      }
      span {
        position: absolute;
        z-index: 8;
        zoom: 1;
        top: 40%;
        left: 35%;
        font-size: 20px;
      }
    }
  }
</style>
<script type="text/ecmascript-6" lang="babel">
  export default {
    props: ['item']
  };
</script>