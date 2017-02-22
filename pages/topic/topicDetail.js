// pages/topic/topicDetail.js
let Api=require('../../utils/api.js').topicDetail
var app = getApp()
Page({
  data:{
    lists:[],
    loadNotice:'正在加载中...',
    page:1,
    pageSize:7,
    pageCount:2,
    id:7
  },
  onLoad:function(options){
    wx.showNavigationBarLoading()
    this.setData({
     type:options.type,
     id:options.id
   })
  //  从全局变量中获取头图
   this.setData({
     headPic:app.globalData.topicHeadPic,
     headTitle:app.globalData.topicHeadTitle
   })
  //  设置当前页面title
  wx.setNavigationBarTitle({
    title: this.data.headTitle
  })
  wx.hideNavigationBarLoading()
    this.fetchData();
  },
  fetchData:function(){
    var that=this;
    wx.request({
      url: Api,
      data: {
          topicIndexId:this.data.id
       },
      success: function(res){
        let count=res.data.retData.dataCount
        that.data.pageCount=Math.ceil(count/that.data.pageSize)
        let list=res.data.retData.dataList;
        var lists=[];
          list.forEach(x=>{
            let item={}
            item.id=x.id
            item.title=x.title
            item.src=x.coverPic
            item.firstTag=x.rootTypeName
            let tag=x.rootTypeName
            switch(tag){
              case '活动':
              item.type='activity';
              break;
              case '服务':
              item.type="project";
              item.price="¥"+x.totalAmount
              break;
              case "资讯":
              item.type="news";
              break;
            }
            item.secondTag=x.subTypeName
            lists.push(item)
          })
          that.setData({
            lists:that.data.lists.concat(lists)
          })
          that.setData({
          loadNotice:'已经加载完成'
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
  turnTo:function(e){
     var type=e.currentTarget.dataset.type;
     var id=e.currentTarget.dataset.id;
     wx.navigateTo({
     url: "../detail/detail?type="+type+"&id="+id+""})
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