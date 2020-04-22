import { ESSAY_LIST } from '../mutation-types.js'

const state = {
   list:[]
}
const mutations = {
	[ESSAY_LIST](state,res){
		state.list = res.data.data
	}
}
const actions = {
	getEssayList({commit},payload){
		console.log(payload)
		return new Promise((resolve,reject)=>{
			uni.request({
			    url: payload.url,
				method: 'POST',
			    data: payload.data,
			    success: (res) => {
					console.log(res)
					commit(ESSAY_LIST,res)
					resolve(res)
			    },
				fail(err) {
					console.log(err)
				}
				
			});
		})
	}
}

export default {
    state,
    mutations,
    actions,
}