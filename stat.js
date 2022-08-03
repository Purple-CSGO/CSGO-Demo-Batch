const { HLTV } = require('hltv')
const fs = require('fs')

const {sleep} = require('./util.js')

// 设置
let config = {
  note: "7月6日~7月27日",
  target_dir: "./Matches",
  start: "2357198",
  end: "2357482",
  current: "",
  matches: [],
  // events: [],
}

// 事件
// let events = new Map()

const getMatchInfo = async (id) => {
  let match = {
    id: id,
    event_id: 0,
    event_name: "",
    link: "",
    done: false,
  }

  // 获取信息
  let resp = await HLTV.getMatch({ id: id, delayBetweenPageRequests: 250 })
  
  // 处理事件
  let ev = resp.event
  if (!events.has(ev.id)) events.set(ev.id, ev.name)

  match.event_id = ev.id
  match.event_name = ev.name

  // 处理下载链接
  if (resp.demos.length > 0)
    match.link = "https://www.hltv.org" + resp.demos[0].link
  else
    console.error(id, "无下载链接")
  
  // 转换成json字符串
  let res = JSON.stringify(resp)
  
    // 写入文件
  fs.writeFileSync("./MatchData/"+id+".json", res)

  // 加入比赛信息
  config.matches.push(match)
  config.current = id

  // 打印信息
  console.log(match.id, config.current - config.start, '/', config.end - config.start, match.event_name)
}


// id不断减小，>min，获取比赛信息，同时
const matches = async () => {
  // 获取比赛信息 每个ID保存相应的json文件
}

// 赛事包含哪些比赛 id 和赛事名称对应 方便筛选
const matchOfEvents = async () => {

}

// 赛事信息 
const events = async () => {
  // 比赛信息获取完成之后，根据matchOfEvents去单独获取 event 详细信息
  // 每个 ID 保存相应的 json 文件
}


// 搬砖主函数
const worker = async () => {
  // 建立文件夹
  if (fs.existsSync("./matches")===false)
    fs.mkdirSync("./matches")
  
  if (fs.existsSync("./events")===false)
    fs.mkdirSync("./events")

  HLTV.getEvent(6637).then((resp)=>{console.log(resp)})

  readSetting()
  console.log("当前设置\n", config.target_dir, config.start, config.end, config.note)

  let counter = 0
  for(var i = config.current? config.current+1 : config.start; i <= config.end ; i++) {
    await getMatchInfo(i)

    // 保存
    counter++
    if (counter % 60 == 0) {
      writeSetting()
      counter = 0
    }
  }

  writeSetting()
}

// worker()

// HLTV.getEvent({id:6637}).then((resp)=>{console.log(resp)})

// Error: Access denied | www.hltv.org used Cloudflare to restrict access
// HLTV.getMatchesStats({ startDate: '2022-07-10', endDate: '2022-07-18', delayBetweenPageRequests: 1500 }).then((res) => {
//   console.log(res)
// })

sleep(5000);

