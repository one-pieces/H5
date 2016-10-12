<template>
  <div class="h5-collection">
    <grid-item-component :item="grid" v-for="grid in grids"></grid-item-component>
  </div>
</template>
<style lang="scss" rel="stylesheet/scss">
  .h5-collection {
  }
</style>
<script type="text/ecmascript-6" lang="babel">
  import Grids from '../../data/H5.json';
  import GridItemComponent from '../components/GridItem.vue';
  export default {
    data() {
      return {
        grids: Grids
      };
    },
    components: {
      GridItemComponent
    }
  };
</script>