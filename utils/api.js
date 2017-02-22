let head='https://m.camelliae.com/'
let api={
    // 列表页
    activityList:head+'activity',
    newsList:head+'news',
    projectList:head+'project',
    memberList:head+'members',
    // 首页
    banner:head+'recomm/banner',
    recomm:head+'recomm',
    // 专题
    topicList:"https://mapi.camelliae.com/v2/topic/list",
    topicDetail:'https://mapi.camelliae.com//v2/topic/one',
    // 会员
    memberDetail:head+'members',
    timeLine:head+'members/time-line'
}
module.exports =api