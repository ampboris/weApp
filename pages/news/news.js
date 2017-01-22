// pages/news/news.js
let Api=require('../../utils/api.js').newsList
Page({
  data:{
    lists:[],
    loadNotice:'正在加载中...',
    page:1,
    pageSize:5,
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
  fetchData(){
    var that=this;
    wx.request({
      url: Api,
      data:{
         pageSize:this.data.pageSize,
         page:this.data.page
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
          item.src=x.objCoverPic
          item.brief=x.briefIntro
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
     wx.navigateTo({
     url: "../detail/detail?type=news&id="+id+""})
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