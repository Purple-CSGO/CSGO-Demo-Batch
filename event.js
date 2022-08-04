const {getEventData, map2file, readCFG, writeCFG} = require('./util.js')
const path = require('path')
const fs = require('fs')

let cfg = {
  note: "赛事 2012~2022.8.3",
  wd: ".",
  start: 939,
  end: 6705,
  current: 939
}

// 传入命令行参数 wd 工作路径
if (process.argv[2] !== null || process.argv[2] !== undefined) cfg.wd = process.argv[2]

// 获取赛事数据
const getEvents = async () => {
  // 设定路径
  const dirEvent = path.join(cfg.wd, 'events')
  const dirEventRaw = path.join(cfg.wd, 'events_raw')
  // const dirEventLogo = path.join(cfg.wd, 'events_logo')

  // 批量获取数据并写入文件
  let counter = 0
  for(var id = cfg.current>=0?cfg.current:cfg.start ; id <= cfg.end ; id++, counter++) {
    // 成功 保存设置
    if (counter % 10 === 0) {
      console.log('写设置')

      cfg.current = id
      counter = 0
      writeCFG(cfg, cfg.wd, 'cfg_event.json')
    }
    
    if (fs.existsSync(path.join(dirEvent, id+'.json'))) {
      console.log(id, id - cfg.start, '/', cfg.end - cfg.start, '✔️')
      continue
    }

    // 获取数据
    const resp = await getEventData(id) //.catch(err => console.log(err))

    // 获取失败时处理
    if (resp === null) {
      console.log(id, id - cfg.start, '/', cfg.end - cfg.start, '❌')
      continue
    }

    // 写入文件
    map2file(resp.data, dirEvent, id+'.json')
    map2file(resp.raw, dirEventRaw, id+'.json')

    console.log(id, id - cfg.start, '/', cfg.end - cfg.start, '👌')
  }
  
  return cfg
}

// 入口函数
const main = async () => {
  cfg = readCFG(cfg, cfg.wd, 'cfg_event.json')

  cfg = await getEvents(cfg)
  
  writeCFG(cfg, cfg.wd, 'cfg_event.json')

  console.log('end')
}

main()