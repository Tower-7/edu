import { USER_INFO,USER_LIST } from '../mutation-types.js'
import { apiUser } from '@/config'

const state = {
   userInfo:{},
   userList: [],
   photoList: {}
}
const mutations = {
	[USER_INFO](state,data){
		state.userInfo = data
		uni.removeStorage({
		    key: 'userInfo',
		    success: function (res) {
		    }
		});
		uni.setStorage({
		    key: 'userInfo',
		    data: data,
		    success: function (data) {
		        console.log('success');
		    }
		});
		
	},
	updateOpenid(state,res){
		state.userInfo.openid = res
		uni.setStorage({
		    key: 'userInfo',
		    data: state.userInfo,
		    success: function (data) {
		        // console.log(data);
		    }
		});
	},
	updateCoures(state,data){
		state.userInfo.course = data
		uni.setStorage({
		    key: 'userInfo',
		    data: state.userInfo,
		    success: function (data) {
		        // console.log(data);
		    }
		});
	},
	[USER_LIST](state,data){
		state.userList = data
	}
		
}
const actions = {
	getOpenId({ state,commit,rootState },o){
		return new Promise((resolve, reject) => {
			 uni.request({
				url: o,
				method: 'GET',
				success: (res) => {
					let data = JSON.parse(res.data.data)
					resolve(data.openid)
				}
			 })
		})
	},
	login({commit},o){
		return new Promise((resolve,reject)=>{
			apiUser.login(o).then((res)=>{
				commit(USER_INFO,res.data[0])
				resolve(res)
			})
			
		})
	},
	updateUser({ state,commit },payload){
			delete payload.userInfo.meta
			delete payload.userInfo.__v
			return new Promise((resolve,reject)=>{
				uni.request({
				    url: payload.url,
					method: 'POST',
				    data: payload.userInfo,
				    success: (res) => {
						if(res.statusCode===200){
							commit(USER_INFO,payload.userInfo)
							resolve(res)
						}
				    }
				});
			})
		
	},
	chrole({ state,commit },o){
		apiUser.userSubmit(o).then((res)=>{
			commit(USER_INFO,o)
		})
	},
	getUserList({ commit },o){
		apiUser.getUserList(o).then((res)=>{
			commit(USER_LIST,res.data)
		})
	},
	getQiniuToken({ commit,dispatch }, o){
		return new Promise((resolve,reject)=>{
			apiUser.getToken().then((res)=>{
				resolve(res)
			})
		})
		.then((res)=>{
			return new Promise((resolve,reject)=>{
				apiUser.upload(o,res.data.uploadToken).then((res)=>{
					resolve(res)
					
				}).catch((res)=>{
					let err = JSON.stringify(res)
					uni.showToast({
					title: err,
					icon: 'none',
					position: 'top',
					   duration: 5000
					})
				})
			})
		})
		
	}
}

export default {
    state,
    mutations,
	actions
}