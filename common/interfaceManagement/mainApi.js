//首页相关接口
import http from '@/common/http'
module.exports={
	//检测App版本并更新接口
	appUpdate:function(callBack){
		http.get('Values/CheckVerInfo?Type=CRMSysVerID').then((res)=>{
			callBack(res);
		})
	},
	
	//登录接口
	login:function(param,callBack){
		http.post('Values/UserLogin',param).then((res)=>{
			callBack(res);
		})
	}
	
}