const { HLTV } = require('hltv')
const fs = require('fs')

// 设置
let config = {
  note: "1月2日 ~ 6月6日 IEM Dallas 决赛 C9 > ENCE",
  target_dir: "./Matches",
  start: "2353897",
  end: "2356303",
  current: "",
  matches: [],
  // events: [],
}

// 事件
let events = new Map()

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

// 读取设置
const readSetting = () => {
  if (fs.existsSync("./MatchConfig/config.json")) {
    let data = fs.readFileSync("./MatchConfig/config.json")
    config = JSON.parse(data)
  }

  // if (fs.existsSync("./MatchConfig/events.json")) {
  //   let data = fs.readFileSync("./MatchConfig/events.json")
  //   events = JSON.parse(data)
  // }
}

const _strMapToObj = (strMap) => {
  let obj= Object.create(null);
  for (let[k,v] of strMap) {
    obj[k] = v;
  }
  return obj;
}

// 保存设置
const writeSetting = () => {
  let data = JSON.stringify(config)
  fs.writeFileSync("./MatchConfig/config.json", data)

  let ev = JSON.stringify(_strMapToObj(events))
  fs.writeFileSync("./MatchConfig/events.json", ev)
}

// 搬砖主函数
const worker = async () => {
  readSetting()

  // setInterval(writeSetting, 60000) // 1min保存一次

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

worker()

exit(0)