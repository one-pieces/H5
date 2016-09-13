<template>
  <div>
    <header-component></header-component>
    <div>this is template body</div>
  </div>
</template>
<style lang="scss" rel="stylesheet/scss">
  @import "./normalize.scss";
  body {
    background: url('./images/bg.png') repeat-y;
  }
</style>
<script type="text/ecmascript-6" lang="babel">
  import HeaderComponent from './components/header.vue';
  export default {
    components: {
      HeaderComponent
    }
  };
</script>