Page({
    data:{
        content:""
    },
    onLoad: function (e) {
        wx.setNavigationBarTitle({
            title: e.title
        })
        this.setData({
            content:e.content
        });
    }
})