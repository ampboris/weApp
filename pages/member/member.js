// pages/member/member.js
let Api=require('../../utils/api.js').memberList
Page({
  data:{
    lists:[],
    loadNotice:'正在加载中...',
    page:1,
    pageSize:5,
    pageCount:2
  },
  onLoad:function(options){
    this.fetchData()
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
         console.log(res)
          let count=res.data.retData.dataCount
          that.data.pageCount=Math.ceil(count/that.data.pageSize)
          let list=res.data.retData.dataList;
          list.forEach(x=>{
            const item={}
            item.avatar=x.gravatar;
            item.name=x.nickName;
            item.title=x.title;
            item.fanNum=x.relFansCount;
            item.followNum=x.relWatchCount;
            const box=[];
            box[0]=item;
            that.setData({
              lists:that.data.lists.concat(box)
            })
          })
       },
       complete: function() {
         // complete
       }
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