<template>
  <div class="h5-detail">
    <div class="col-md-offset-1 op-breadcrumb">
      所在位置 > H5案例 >
      <span>{{h5Detail.name}}</span>
    </div>
    <div class="detail-container row">
      <div class="col-md-offset-3 col-md-4 col-xs-5 col-ps-12">
        <img class="col-ps-width100" :src="h5Detail.gifUrl">
      </div>
      <div class="col-md-5 col-xs-6 col-ps-12">
        <div class="name">{{h5Detail.name}}</div>
        <div class="from">by{{h5Detail.from}}</div>
        <div class="intro">{{h5Detail.intro}}</div>
        <div class="tags">
          <span>标签:</span>
          <span v-for="tag in h5Detail.tags">{{tag}}</span>
        </div>
        <div class="price-detail">
          <div class="col-xs-6">
            <img class="qr-code" :src="h5Detail.QRCode">
            <div class="scan">扫码查看H5详情</div>
          </div>
          <div class="col-xs-6">
            <div class="price">
              <span>价格:</span>
              <span>{{h5Detail.price | currency '¥' 0}}起</span>
            </div>
            <div class="call">
              <button class="btn btn-call">立刻定制</button>
              <div class="contact">
                <div class="qq">QQ:493433054</div>
                <div class="phone">或致电186-1685-4188</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" rel="stylesheet/scss">
  .h5-detail {
    .op-breadcrumb {
      color: #ffffff;
      font-size: 14px;
      padding: 0 20px;
    }
    .detail-container {
      margin: 20px 0;
      .name {
        color: #00deff;
        font-size: 25px;
        margin-bottom: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .from {
        font-size: 12px;
        color: #06a4c0;
      }
      .intro {
        color: #dedfe0;
        font-size: 12px;
        margin-top: 35px;
        line-height: 19px;
      }
      .tags {
        color: #06a4c0;
        font-size: 12px;
        margin-bottom: 30px;
        span {
          margin-right: 10px;
        }
      }
      .price-detail {
        .qr-code {
          background-color: #ffffff;
          padding: 5px;
        }
        .scan {
          color: #06a4c0;
          font-size: 12px;
          padding-left: 17px;
          margin-top: 8px;
        }
        .price {
          margin: 30px 0 15px;
          span {
            color: #fac502;
            font-weight: 600;
            font-size: 15px;
            &:first-child {
              color: #00deff;
            }
          }
        }
        .call {
          .btn-call {
            background-color: #cd0a0a;
            color: #fbeded;
            font-size: 14px;
            border: 0;
            border-radius: 5px;
            width: 120px;
            height: 37px;
          }
          .contact {
            font-size: 12px;
            margin-top: 8px;
            .qq {
              color: #b11013;
            }
            .phone {
              color: #06a4c0;
            }
          }
        }
      }
    }
  }
</style>
<script type="text/ecmascript-6" lang="babel">
  import Grids from '../../data/H5.json';
  export default {
    data() {
      return {
        h5Detail: {}
      };
    },
    route: {
      data({ to }) {
        this.h5Detail = Grids.filter((grid) => {
          return grid.id == to.params.id;
        })[0];
      }
    }
  };
</script>