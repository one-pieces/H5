<template>
  <div class="grid-item col-md-3 col-sm-4 col-xs-6 col-ps-12">
    <div class="grid-item-bg" v-el:grid-item>
      <div class="img-wrap">
        <img v-bind:src="imgUrl" v-on:mouseover="hoverImg(true)" v-on:mouseout="hoverImg(false)">
      </div>
      <div class="info">
        <div class="name">{{item.name}}</div>
        <div class="price">{{item.price | currency '¥' 0}}</div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" rel="stylesheet/scss">
  .grid-item {
    @media (max-width: 450px) {
      &.col-ps-12 {
        width: 100%;
      }
    }
    margin-bottom: 20px;
    .grid-item-bg {
      position: relative;
      min-width: 240px;
      height: 375px;
      background: url('../images/detailbg.png') no-repeat;
      background-size: cover;
      .img-wrap {
        width: 80%;
        margin: auto;
        padding-top: 11%;
        img {
          width: 100%;
          height: 80%;
          cursor: pointer;
          &[lazy=error] {
            background: url('../images/panda_loding.png') no-repeat;
          }
        }
      }
      .info {
        width: 80%;
        margin: auto;
        font-size: 12px;
        .name {
          color: #ffffff;
          float: left;
          width: 70%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .price {
          color: #ff9c00;
          float: right;
        }
      }
    }
  }
</style>
<script type="text/ecmascript-6" lang="babel">
  export default {
    data() {
      return {
        imgUrl: this.item.postUrl
      };
    },
    props: ['item'],
    methods: {
      hoverImg(isHover) {
        this.item.gifUrl && (this.imgUrl = isHover ? this.item.gifUrl : this.item.postUrl);
      }
    },
    ready() {
      // 当设备的方向变化（设备横向持或纵向持）此事件被触发。
      // 绑定此事件时，注意现在当浏览器不支持orientationchange事件的时候我们绑定了resize事件。
      // 总的来说就是监听当前窗口的变化，一旦有变化就需要重新设置根字体的值
      let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
      let recalc = () => {
        this.$els.gridItem.style.height = this.$els.gridItem.offsetWidth / 240 * 376 + 'px';
      };
      // 绑定浏览器缩放与加载时间
      window.addEventListener(resizeEvt, recalc, false);
      document.addEventListener('DOMContentLoaded', recalc, false);
    }
  };
</script>