module.exports = {
	login: async (_this,url)=>{
		return new Promise((resolve,reject)=>{
			uni.getStorage({
			    key: 'userInfo',
			    success: function (res) {
					resolve(res)
			    },
				fail(err) {
					reject(err)
				}
			});
		})
		.then((res)=>{
			_this.$store.commit('updateUser',res.data)
		})
		.catch((err)=>{
			uni.showToast({
			    title: '请先登录',
				icon: 'none',
				position: 'bottom',
			    duration: 500
			});
			setTimeout(function(){
				console.log(url)
				uni.navigateTo({
					url: `../../pages/login/login?url=${url}`
				})
			},500)
			
		})
	}
}