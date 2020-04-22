import * as localConfig from '../local/config'
let webUrl
// #ifdef H5
webUrl = `/api`
// #endif
// #ifndef H5
webUrl = localConfig.websiteUrl
// #endif

let login_url = `${webUrl}/m/login`
let userSubmit_url = `${webUrl}/m/user_submit`
let getUser_url = `${webUrl}/m/user_list`

function login(o){
	return new Promise((resolve, reject) => {
		uni.request({
		    url: login_url,
			method: 'POST',
		    data: o,
		    success: (res) => {
				resolve(res.data)
		    }
		});
	})
}

function userSubmit(o){
	return new Promise((resolve, reject) => {
		uni.request({
		    url: userSubmit_url,
			method: 'POST',
		    data: o,
		    success: (res) => {
				if(res.statusCode===200){
					resolve(res)
				}
		    }
		});
	})
}

function getUserList(o){
	return new Promise((resolve,reject)=>{
		uni.request({
			url: getUser_url,
			method: 'POST',
			data: o,
			success:(res)=> {
				resolve(res.data)
			}
		})
	})
}

function getUserOpenid(o){
	return new Promise((resolve,reject)=>{
		uni.request({
			url: o.url,
			method: 'POST',
			data: o.data,
			success:(res)=> {
				resolve(res.data)
			}
		})
	})
}

export default {
	userSubmit,
	getUserList,
	login
}