// pages/topic/topic.js
let Api=require('../../utils/api.js').topicList
var app = getApp()
Page({
  data:{
    lists:[],
    loadNotice:'正在加载中...',
    page:1,
    pageSize:6,
    pageCount:2    
  },
  onLoad:function(options){
    this.fetchData();
  },
  loadMore:function(){   
     if(this.data.page>=this.data.pageCount){
      //  没有更多数据了
      // 貌似动态更新的数据最好都用setData，即那些需要反应在用户界面的数据。
      this.setData({
        loadNotice:'已经加载完成'
      })
      // this.data.loadNotice='已经加载完成'
     }else{
       this.data.page++;
       this.fetchData();
     }
  },
  fetchData:function(){
    var that=this;
    wx.request({
      url: Api,
       data: {
          page:this.data.page,
          pageSize:this.data.pageSize
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
            lists.push(item)
          })
          that.setData({
            lists:that.data.lists.concat(lists)
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
     var id=e.currentTarget.dataset.id;
    //  将所点击的专题头图写入全局变量，方便详情页调用;
     var topicHeadPic=e.currentTarget.dataset.src;
     var title=e.currentTarget.dataset.title;
     app.globalData.topicHeadPic=topicHeadPic;
     app.globalData.topicHeadTitle=title;
     wx.navigateTo({
     url: "topicDetail?type=topic&id="+id+""})
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