<template>
	<div class="loading">
		<div class="progress" v-bind:class="{animated: animated}">
			<div class="meter">
				<span></span>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6" lang="babel">
	export default {
		data() {
			return {
				show: true,
				animated: false
			}
		},
		init() {
			setTimeout(() => {
				this.animated = true;
			}, 3000);
		}
	}
</script>

<style lang="sass" rel="stylesheet/scss">
	.loading {
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		z-index: 999;
		background: #8c84fb;
		-webkit-transition: all .2s ease;
		-moz-transition: all .2s ease;
		-ms-transition: all .2s ease;
		-o-transition: all .2s ease;
		transition: all .2s ease;

		.progress {
			position: absolute;
			/*background: #000;*/
			width: 100%;
			/*height: 100px;*/
			top: 30%;
			-webkit-transform: scale(0);
			-moz-transform: scale(0);
			-ms-transform: scale(0);
			-o-transform: scale(0);
			transform: scale(0);
			-webkit-transform-origin: center center;
			-moz-transform-origin: center center;
			-ms-transform-origin: center center;
			-o-transform-origin: center center;
			transform-origin: center center;

			&.animated {
				-webkit-transition: all .3s ease;
				-webkit-transform: scale(1);
				-moz-transform: scale(1);
				-ms-transform: scale(1);
				-o-transform: scale(1);
				transform: scale(1);
				-webkit-transform-origin: center center;
				-moz-transform-origin: center center;
				-ms-transform-origin: center center;
				-o-transform-origin: center center;
				transform-origin: center center;
			}

			.meter {
				height: .34rem;
				position: relative;
				background: #665de6;
				-webkit-border-radius: 25px;
				border-radius: 25px;
				padding: .07rem;
				width: 3.8rem;
				margin: 0 auto;
				>span {
					display: block;
					width: 100%;
					height: 100%;
					-webkit-border-radius: .27rem;
					-moz-border-radius: .27rem;
					border-radius: .27rem;
					background-color: #fff;
					position: relative;
					overflow: hidden;
					-webkit-transition: width .7s ease;
					-moz-transition: width .7s ease;
					-ms-transition: width .7s ease;
					-o-transition: width .7s ease;
					transition: width .7s ease;
					&:after {
						content: '';
						position: absolute;
						top: 0;
						left: 0;
						right: 0;
						bottom: 0;
						background: url(../assets/img/process.jpg) repeat-x;
						-webkit-background-size: 1rem .34rem;
						background-size: 1rem .34rem;
						z-index: 1;
						-webkit-animation: move 3s linear infinite;
						animation: move 3s linear infinite;
						border-radius: .27rem;
						overflow: hidden;
					}
				}
			}
		}
	}
	@-webkit-keyframes move {
		0% {
			background-position: 0 0
		}
		100% {
			background-position: 30px 0
		}
	}
</style>