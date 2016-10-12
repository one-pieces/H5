<template>
  <div>
    <header-component></header-component>
    <div class="container">
      <div class="row">
        <router-view
          class="view"
          transition
          transition-mode="out-in">
        </router-view>
      </div>
    </div>
    <footer-component></footer-component>
  </div>
</template>
<style lang="scss" rel="stylesheet/scss">
  @import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
  body {
    background: url('./images/bg.png') repeat-y;
    @media (max-width: 450px) {
      .col-ps-12 {
        width: 100%;
      }
      .col-ps-width100 {
        width: 100%;
      }
    }
  }
</style>
<script type="text/ecmascript-6" lang="babel">
  import HeaderComponent from './components/Header.vue';
  import FooterComponent from './components/Footer.vue';
  export default {
    components: {
      HeaderComponent,
      FooterComponent
    }
  };
</script>