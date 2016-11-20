Page({
    data: {
        thumbText: "请输入文字",
        selectedThumbText: "",
        defaultTexts: [
            "嘘寒问暖，不如打笔巨款",
            "小朋友，说话注意点，劳资脾气不太好",
            "什么？你吃翔噎住了？",
            "观乎天地间，弱智之极，非阁下莫属  "
        ],
        context: null
    },
    onReady: function () {
        this.initCanvas();
    },
    showMakeAction: function () {
        wx.showActionSheet({
            itemList: ["分享"],
            success: function (res) {
                console.log(res);
            }
        })
    },
    selectThumbText: function (e) {
        var currentTarget = e.currentTarget;
        var dataset = currentTarget.dataset;
        var text = dataset.text;
        this.setData({
            selectedThumbText: text
        });
        this.data.context.clearRect(0, 30, 500, 30);
        this.data.context.setFontSize(20);
        this.data.context.fillText(text, 0, 50);
        var actions = this.data.context.getActions();
        wx.drawCanvas({
            canvasId: 'thumbCanvas',
            actions: actions,
            reserve: true
        });
    },
    initCanvas: function () {
        this.data.context = wx.createContext();
        
        this.data.context.setFillStyle("#f0f0f0");
        this.data.context.rect(0, 0, 500, 500);
        this.data.context.fill();
        this.data.context.setFillStyle("#666666");
        var str = "点击选择图片";
        var strSize = 30;
        var self = this;
        wx.getSystemInfo({
            success:function(res){
                var windowWidth = res.windowWidth;
                var bl = windowWidth/750;
                var canvasHeight = 500 * bl;
                var pixelRatio = res.pixelRatio;
                var left = (windowWidth - str.length * strSize)/2;
                var top = canvasHeight/2;
                self.data.context.setFontSize(strSize);
                self.data.context.fillText(str,left,top);
                wx.drawCanvas({
                    canvasId: 'thumbCanvas',
                    actions: self.data.context.getActions()
                });
            }
        })
        
    },
    saveThumb:function(){
        wx.canvasToTempFilePath({
            canvasId:'thumbCanvas',
            success:function(res){
                console.log(res);
                var tempFilePath = res.tempFilePath;
                wx.saveFile({
                    tempFilePath:tempFilePath,
                    success:function(res){
                        console.log(res);
                        wx.getSavedFileInfo({
                            filePath:res.savedFilePath,
                            success:function(res){
                                console.log(res);
                            }
                        })
                    },
                    fail:function(res){
                        console.log(res);
                    },
                    complete:function(res){
                        console.log(res);
                    }
                })
            },
            fail:function(res){
                console.log(res);
            },
            complete:function(res){
                console.log(res);
            }
        })
    },
    selectImg:function(){
        var self = this;
        wx.chooseImage({
            count:1,
            success:function(res){
                console.log(res);
                var windowWidth = res.windowWidth;
                var tempFilePath = res.tempFilePaths[0];
                var bl = windowWidth/750;
                var canvasHeight = 500 * bl;
                self.data.context.drawImage(tempFilePath,0,0,windowWidth,canvasHeight-20);
                wx.drawCanvas({
                    canvasId: 'thumbCanvas',
                    actions: self.data.context.getActions()
                });
            },
            fail:function(res){
                console.log(res);
            },
            complete:function(res){
                console.log(res);
            }
        })
    }
})