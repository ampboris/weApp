//index.js
//获取应用实例
var Api=require('../../utils/api.js');
var bannerApi=Api.banner;
var recApi=Api.recomm;
var app = getApp()
Page({
  data: {
    autoplay:false,
    lists:[],
    loadNotice:'正在加载中...',
    page:1,
    pageSize:6,
    pageCount:2   
  },
  onLoad: function () {
    var that=this;
    // banner部分
    wx.request({
      url: bannerApi,
      data: {},
      success: function(res){
        let lists=res.data.retData.dataList;
        var bannerImages=[];
        lists.forEach(x=>{
          // 去除外链的可能性
          if(x.dataType!=3){
						 let img={}
            //  如果是专题的话
             if(x.dataType==2){
               img.type='topic';
               img.topicHeadPic=x.coverPic;
               img.topicTitle=x.title
             }
            let objType=parseInt(x.objType);
             switch(objType){
               case 1:
                img.type='news';
                break;
               case 2:
                 img.type='activity';
                break;
               case 3:
                 img.type='project';
                break;
             }
             img.id=x.objId;
						 img.src=x.coverPic;
             bannerImages.push(img);
          }else{

          }
					 })
          that.setData({
          bannerImgUrls:bannerImages
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
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
       url: recApi,
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
          	let item={};
						let type=x.rootTypeId;
            item.rootType=type;
            item.title=x.title;
            switch(type){
              case 1:
                item.id=x.id;
                item.title=x.title;
                item.src=x.objCoverPic;
                item.brief=x.briefIntro;
                break;
              case 2:
                item.id=x.id;
                item.src=x.objCoverPic;
                item.address=x.provinceName.substring(0,2);
                item.title=x.title;
                item.type=x.memberLevelStr;
                item.time=x.actDateZone.substring(5,7)+"."+x.actDateZone.substring(8,10);break;
              case 3:
                  const images=[];
                  const imgArr=x.coverPicArr;
                  imgArr.forEach(i=>{
                    const image={}
                    image.src=i.coverPic
                    image.width=i.ratio*180
                    images.push(image)
                  })
                  item.images=images;
                  item.address=x.provinceName.substring(0,2);
                  item.id=x.id;
                  item.title=x.title;
                  item.price=x.totalAmount;
                  break;
            }
            lists.push(item);
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
    var type=e.currentTarget.dataset.type;
    var id=e.currentTarget.dataset.id;
    if(type=='topic'){
      // 获取图片
      var headPic=e.currentTarget.dataset.src;
       var title=e.currentTarget.dataset.title;
      // 全局变量里写入topic首图
      app.globalData.topicHeadPic=headPic;
      app.globalData.topicHeadTitle=title;
     wx.navigateTo({
     url: "../topic/topicDetail?type=topic&id="+id+""})
    }else{
     wx.navigateTo({
     url: "../detail/detail?type="+type+"&id="+id+""})
    }
  }
})
