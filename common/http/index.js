export default {
	config: {
		baseUrl: "",
		headers: {},
		dataType: "json",
		responseType: "text"
	},
	interceptor: {
		request: null,
		response: null
	},
	request(options) {
		return new Promise((resolve, reject) => {
			
			let _config = null
			options.url = this.config.baseUrl + options.url
			options.complete = (response) => {
				let statusCode = response.statusCode

				response.config = _config

				if (process.env.NODE_ENV === 'development') {
					if (statusCode === 200) {
						
						// console.log("【" + _config.requestId + "】 结果：" + JSON.stringify(response.data))
					}
				}

				if (this.interceptor.response) {
					let newResponse = this.interceptor.response(response)
					if (newResponse) {
						response = newResponse
					}
				}

				if (statusCode === 200) { //成功
						if(!response.Code){
							if(response.Msg instanceof Object ){
								resolve(response.Msg);
								
							}
							else{
// 								if(response.Msg){
// 									resolve(JSON.parse(response.Msg));
// 								}
// 								else{
// 									resolve(response.Msg);
// 								}
								resolve(response.Msg);
							}
						}
						else{
							uni.showToast({
								title:response.Msg,
								icon:'none'
							})
							reject(response);
						}
						
						
// 						
				} else {
					
					var showTitle='';
					switch(statusCode){
						case 307:
							showTitle = '临时重定向';
							break;
						case 400:
							showTitle = '错误请求';
							break;
						case 404:
							showTitle = '服务器找不到请求的网页';
							break;
						case 405:
							showTitle = '禁用请求中指定的方法';
							break;
						case 413:
							showTitle = '请求实体过大';
							break;
						case 414:
							showTitle = '请求的URL过长';
							break;
						case 415:
							showTitle='请求的格式不受请求页面的支持';
							break;
						case 500:
							showTitle='服务器内部错误';
							break;
						case 502:
							showTitle='错误网关';
							break;
						case 503:
							showTitle = '服务不可用';
							break;
						case 504:
							showTitle='网关超时';
							break;
						default:
							showTitle = '网络繁忙';
							break;
					}
					uni.showToast({
						title:showTitle,
						icon:'none'
					})
					reject(response)
				}
			}

			_config = Object.assign({}, this.config, options)
			_config.requestId = new Date().getTime()

			if (this.interceptor.request) {
				this.interceptor.request(_config)
			}

			if (process.env.NODE_ENV === 'development') {
				// console.log("【" + _config.requestId + "】 地址：" + _config.url)
				if (_config.data) {
					// console.log("【" + _config.requestId + "】 参数：" + JSON.stringify(_config.data))
				}
			}

			uni.request(_config);
		});
	},
	get(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		
		options.method = 'GET'
		return this.request(options)
	},
	post(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'POST'
		return this.request(options)
	},
	put(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'PUT'
		return this.request(options)
	},
	delete(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'DELETE'
		return this.request(options)
	}
}
