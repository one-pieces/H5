<template>
	<div>
		<div class="container">
			<router-view
					class="tabbar-content"
					keep-alive
					transition
					transition-mode="out-in">
			</router-view>
			<loading></loading>
		</div>
	</div>
</template>

<script type="text/ecmascript-6" lang="babel">
	import loadingComponents from './components/loading.vue';
	export default {
		data() {
			return {
			}
		},
		components: {
			'loading': loadingComponents
		}
	}
</script>

<style lang="sass" rel="stylesheet/scss">
	@import "./assets/css/common.scss";
	@import "./assets/css/reset.scss";
	.container {
		background-color: #f8f8f8;
	}
</style>