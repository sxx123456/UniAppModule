import Vue from 'vue'
import App from './App'
import http from '@/common/http'
import mainApi from '@/common/interfaceManagement/mainApi'  //接口文件
Vue.config.productionTip = false

App.mpType = 'app'
http.config.baseUrl = 'http://192.168.10.201:8011/api/'

//设置请求前的拦截器
http.interceptor.request = (config) => {
	
	//添加通用参数
    config.header = {
        // "token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    }
}

//设置请求结束后拦截器
http.interceptor.response = (response) => {
	uni.hideLoading();
	 uni.stopPullDownRefresh();
    //判断返回状态 执行相应操作
	if(response.statusCode === 200){
		
	}
    
}
Vue.prototype.mainApi = mainApi;
const app = new Vue({
    ...App
})
app.$mount()
