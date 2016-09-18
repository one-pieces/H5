<template>
  <div>
    <header-component></header-component>
    <div class="container">
      <div class="row">
        <grid-item-component :item="grid" v-for="grid in grids"></grid-item-component>
      </div>
    </div>
  </div>
</template>
<style lang="scss" rel="stylesheet/scss">
  @import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
  body {
    background: url('./images/bg.png') repeat-y;
  }
</style>
<script type="text/ecmascript-6" lang="babel">
  import HeaderComponent from './components/Header.vue';
  import GridItemComponent from './components/GridItem.vue';
  import Grids from '../data/H5.json';
  export default {
    data() {
      return {
        grids: Grids
      };
    },
    components: {
      HeaderComponent,
      GridItemComponent
    }
  };
</script>