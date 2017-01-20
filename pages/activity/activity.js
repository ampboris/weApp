// pages/activity/activity.js
let Api=require('../../utils/api.js').activityList;
Page({
  // 这边初始page就是第一页，pageCount设为2时为了第一次loadMore时后执行else那里，反正之后每次res里都会覆盖掉pageCount
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
  fetchData:function(){
    var that=this;
    wx.request({
      url: Api,
      data:{
         pageSize:this.data.pageSize,
         page:this.data.page
      },
      success: function(res){
        console.log(res)
        let count=res.data.retData.dataCount
        that.data.pageCount=Math.ceil(count/that.data.pageSize)
        let list=res.data.retData.dataList;
        list.forEach(x=>{
          const item={}
          item.src=x.objCoverPic;
          item.address=x.provinceName.substring(0,2);
          item.title=x.title;
          item.type=x.memberLevelStr;
					item.time=x.actDateZone.substring(5,7)+"."+x.actDateZone.substring(8,10);
          // 为了能实现数组连接，将对象放入这个新数组首项，另外这个每次循环都创建了item空对象和box空数组，会不会有性能浪费的问题；另外需要验证直接设置data里的数是可以的，但数组不行，而且数组的push方法也不可用。
          const box=[];
          box[0]=item;
          // that.data.lists=that.data.lists.concat(box)
          that.setData({
            lists:that.data.lists.concat(box)
          })
        })
      }
    })
  },
  onReady:function(){
    console.log('嘻嘻')
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