<template>
  <div class="header">
    <topbar-item :item="item" v-for="item in navItems"></topbar-item>
  </div>
</template>
<style lang="scss" rel="stylesheet/scss">
  .header {
    width: 80%;
    height: 146px;
    margin: auto auto 40px;
  }
</style>
<script type="text/ecmascript-6" lang="babel">
  import TopbarItemComponent from './TopbarItem.vue';
  export default {
    data() {
      return {
        navItems: [{
          label: 'H5案例',
          active: true,
          routerName: 'h5'
        }, {
          label: '流量推广',
          active: false,
          routerName: ''
        }, {
          label: '效果监测',
          active: false,
          routerName: ''
        }, {
          label: '案例解读',
          active: false,
          routerName: 'h5'
        }]
      };
    },
    components: {
      TopbarItem: TopbarItemComponent
    }
  };
</script>