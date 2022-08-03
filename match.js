const {getMatchData, map2file, readCFG, writeCFG} = require('./util.js')
const path = require('path')

let cfg = {
  note: "比赛 2012~2022.8.3",
  wd: ".",
  start: 2146342,
  end: 2357516,
  current: 2146342
}

// 传入命令行参数 wd 工作路径
if (process.argv[2] !== null || process.argv[2] !== undefined) cfg.wd = process.argv[2]

// 获取比赛数据
const getMatches = async (cfg) => {
  // 设定路径
  const dirMatch = path.join(cfg.wd, 'matches')
  const dirMatchRaw = path.join(cfg.wd, 'matches_raw')

  // 批量获取数据并写入文件
  let counter = 0
  for(var id = cfg.current>=0?cfg.current:cfg.start ; id <= cfg.end ; id++, counter++) {
    // 成功 保存设置
    if (counter % 10 === 0) {
      console.log('写设置')

      cfg.current = id
      counter = 0
      writeCFG(cfg, cfg.wd, 'cfg_match.json')
    }

    // 获取数据
    const resp = await getMatchData(id) //.catch(err => console.log(err))

    // 获取失败时处理
    if (resp === null) {
      console.log(id, id - cfg.start, '/', cfg.end - cfg.start, '❌')
      continue
    }

    // 写入文件
    map2file(resp.data, dirMatch, id+'.json')
    map2file(resp.raw, dirMatchRaw, id+'.json')


    console.log(id, id - cfg.start, '/', cfg.end - cfg.start, '👌')
  }
  
  return cfg
}

// 入口函数
const main = async () => {
  cfg = readCFG(cfg, cfg.wd, 'cfg_match.json')

  cfg = await getMatches(cfg)

  writeCFG(cfg, cfg.wd, 'cfg_match.json')

  console.log('end')
}

main()