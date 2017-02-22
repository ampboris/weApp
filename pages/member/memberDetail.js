// pages/member/memberDetail.js
let Api=require('../../utils/api.js')
let ApiDetail=Api.memberDetail;
let ApiTimeLine=Api.timeLine;
Page({
  data:{
    id:""
  },
  onLoad:function(options){
    wx.showNavigationBarLoading()
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      id:options.id
    })
    this.getDetail()
    this.getStory()
  },
  getStory:function(){
    var that=this;
    wx.request({
      url: ApiTimeLine,
      data: {
        userId:this.data.id
      },
      success: function(res){
        var datalist=res.data.retData.dataList;
        var date=new Date;
        var year=date.getFullYear();
      // 判断年份是否等于当前年份来判断是否显示，初始加个一
        var year_ad=year+1;  
        var stories=[];
        datalist.forEach(x=>{
          let sto={};
          if(x.year!=year_ad){
            sto.year=x.year;
            year_ad=sto.year;
            sto.hasyear=true;
          }
          sto.date=x.publishTimeStr;
          sto.saying=x.content;
          let pics=[];
          let gallery=x.coverPicArr;
          let set="";
          gallery.forEach(x=>{
            set=set+x.originPic+","
          })
          set=set.substring(0,set.length-1)
          gallery.forEach(x=>{
            let pic={};
            if(gallery.length==1){
                pic.width="420rpx";
                pic.height=420/x.ratio+'rpx';
            }
            pic.origin=x.originPic;
            pic.src=x.coverPicThumb;
            pic.set=set;
            pics.push(pic)
          })
          sto.gallerys=pics;
          stories.push(sto);
        })
        that.setData({
          lists:stories
        })      
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  getDetail:function(){
    var that=this;
     wx.request({
       url: ApiDetail,
       data: {userId:this.data.id},
       success: function(res){
         var user=res.data.retData.user;
         that.setData({
           userName:user.nickName,
           userTitle:user.title,
           avatar:user.gravatar,
           fanNum:user.relFansCount,
           followNum:user.relWatchCount
         })
        wx.setNavigationBarTitle({
          title: that.data.userName
        })
        wx.hideNavigationBarLoading()
       },
       fail: function() {
         // fail
       },
       complete: function() {
         // complete
       }
     })
  },
  openPreview:function(e){
     var src=e.currentTarget.dataset.src;
    //  从字符串转化到数组
     var urls=e.currentTarget.dataset.set.split(",");
      wx.previewImage({
        current: src, // 当前显示图片的http链接
        urls: urls // 需要预览的图片http链接列表
      })   
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})