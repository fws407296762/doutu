Page({
  data:{
    imageUrls:[
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    newsList:[],
		page:1
  },
	onReady:function(){
		var self = this;
		this.requestNews();
	},
	requestNews:function(){
		var self = this;
		wx.showToast({
			title:"正在加载...",
			icon:"loading",
			success:function(res){
				console.log(res);
			}
		})
		wx.request({
			url: 'https://route.showapi.com/109-35',
			data: {
				showapi_appid:19547,
				showapi_sign:"8e9d0070ab994b17b8536f94435aa31f",
				page:self.data.page,
				needHtml:"1"
			},
			method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
			// header: {}, // 设置请求的 header
			success: function(res){
				// success
				wx.hideToast();
				wx.stopPullDownRefresh()
				var data = res.data,
						contentlist = data.showapi_res_body.pagebean.contentlist;
				var tempAry = self.data.newsList;
				var newTempAry = tempAry.concat(contentlist);
				self.setData({
					newsList:newTempAry
				});
				
			},
			fail: function() {
				// fail
			},
			complete: function() {
				// complete
			}
		})
	},
	onReachBottom:function(){
		var self = this;
		self.data.page++;
		this.requestNews();
	},
	onPullDownRefresh:function(){
		var self = this;
		self.data.page = 1;
		self.data.newsList = [];
		this.requestNews();
	}
});