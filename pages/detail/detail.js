// pages/detail/detail.js
var base64= require('../../utils/base64.js')
var WxParse = require('../../utils/wxParse/wxParse.js');
Page({
  data:{
    type:'news',
    id:222
  },
  onLoad:function(options){
  wx.showNavigationBarLoading()
   this.setData({
     type:options.type,
     id:options.id
   })
   var that=this;
   wx.request({
     url: 'https://m.camelliae.com/'+this.data.type,
     data: {objId:this.data.id},
     method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
     // header: {}, // 设置请求的 header
     success: function(res){
        if(that.data.type=='activity'){
          that.activity(res);
        }
        if(that.data.type=='project'){
          that.project(res);
        }
        if(that.data.type=='news'){
          that.news(res);
        }
        // 渲染正文以及推荐部分
        var items=[];
        var dataList=res.data.retData.recommList;
        dataList.forEach(x=>{
          var itemList={};
          itemList.coverPic=x.coverPicThumb;
          itemList.title=x.title;
          itemList.likeNum=x.likeNum;
          itemList.favNum=x.favNum;
          let type=x.rootTypeId;
          switch(type){
            case 1:
               itemList.linkType='news';
               break;
            case 2:
               itemList.linkType='activity';
               break;
            case 3:
               itemList.linkType='project';
               break;
          }
          itemList.linkId=x.id;
          items.push(itemList);
        })
        that.setData({
          recLists:items
        })
        var content=base64.decode(res.data.retData.content)
      WxParse.wxParse('content', 'html', content, that);
     },
     fail: function() {
       // fail
     },
     complete: function() {
       // complete
     }
   })
  },
  activity:function(res){
    let data=res.data.retData;
    this.setData({
      headPic:data.coverPic,
      title:data.title,
      colNum:data.favNum,
      watchNum:data.hitNum,
      color:data.memberLevelColor,
      actType:data.memberLevelStr,
      date:data.actDateZone,
      address:data.address,
      telephone:data.telephone
    })
    wx.setNavigationBarTitle({
      title: this.data.title
    })
    wx.hideNavigationBarLoading()
  },
  news:function(res){
     var data=res.data.retData;
     this.setData({
       title:data.title,
       favNum:data.favNum,
       hitNum:data.hitNum,
       time:data.publishTimeStr
     })
    wx.setNavigationBarTitle({
      title: this.data.title
    })     
    wx.hideNavigationBarLoading()
  },
  project:function(res){
     var data=res.data.retData;
     this.setData({
       coverPic:data.coverPic,
       title:data.title,
       subscription:data.subscription,
       favNum:data.favNum,
       hitNum:data.hitNum,
       typeName:data.parentTypeName,
       price:data.totalAmount,
      address:data.projectAddress,
      telephone:data.projectContact
     })
    wx.setNavigationBarTitle({
      title: this.data.title
    })     
    wx.hideNavigationBarLoading()
  },
  turnTo:function(e){
    var type=e.currentTarget.dataset.type;
    var id=e.currentTarget.dataset.id;
     wx.navigateTo({
     url: "detail?type="+type+"&id="+id+""
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