const {getMatchData, getEventData, map2file} = require('./util.js')
const path = require('path')

const cfg = {
  wd: ".",
  url: "http://www.hltv.org/download/demo/73220",
}

const getMatches = async () => {
  // 设定路径
  const dirMatch = path.join(cfg.wd, 'matches')
  const dirMatchRaw = path.join(cfg.wd, 'matches_raw')

  try {
    let id = 2377507
    const resp = await getMatchData(id)
  
    map2file(resp.data, dirMatch, id+'.json')
    map2file(resp.raw, dirMatchRaw, id+'.json')
    
  } catch (error) {
    
  }
}

const getEvents = async () => {
  // 设定路径
  const dirEvent = path.join(cfg.wd, 'events')
  const dirEventRaw = path.join(cfg.wd, 'events_raw')
  // const dirEventLogo = path.join(cfg.wd, 'events_logo')

  try {
    let id = 6337
    const resp = await getEventData(id)

    map2file(resp.data, dirEvent, id+'.json')
    map2file(resp.raw, dirEventRaw, id+'.json')

  } catch (error) {
  
  }
}

// 入口函数
const main = async () => {
  await getMatches()
  await getEvents()

  console.log('end')
}

main()