import { COMMON_LOCATION } from '../mutation-types.js'

const state = {
	location: ''
}

const mutations = {
	[COMMON_LOCATION](state,res){
		state.location = res.data
	},
	location(state,res){
		state.location = res
	}
}

export default {
	state,
	mutations
}