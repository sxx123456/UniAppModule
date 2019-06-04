<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show');
			// this.mainApi.appUpdate(function callBack(res){
			// 	console.log('接口请求成功');
			// })
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "./common/uni.css";
</style>
