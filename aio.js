const { HLTV } = require('hltv')
const {map2file, getMatchData} = require('./util.js')
const fs = require('fs')

const results = async () => {
  const resp = await HLTV.getResults({startDate: '2022-01-01', endDate: '2022-01-30', delayBetweenPageRequests: 100 }).catch(err => {console.log('❌', err)}) //console.log(id, '❌')
  map2file(resp, ".", "results.json")
}

const eventMatchList = async () => {
  // 读取所有events
  var files = fs.readdirSync("./events",{encoding:'utf8'})

  // 读取并获取每个event的信息
  var events = []
  var events_raw = []
  var i = 0
  for(var file of files) {

    // 遍历match_list获取match_list
    var f = fs.readFileSync("./events/"+file)
    var dat = JSON.parse(f)

    if (dat !== null && dat !== undefined) {
      const resp = await HLTV.getResults({eventIds: [dat.id], delayBetweenPageRequests: 100 }).catch(err => {console.log('event', dat.id, '❌', err)})
      if (resp !== null && resp !== undefined) {
        var matches = []
        var matches_raw = []

        // 遍历match_list获取详细信息
        for(var res of resp) {
          const resp = await getMatchData(res.id).catch(err => console.log('match', res.id, '❌', err))

          // 获取失败时处理
          if (resp === null) {
            console.log('match', res.id, '❌')
            continue
          }
          
          // push到详细的match_list
          matches.push(resp.data)
          matches_raw.push(resp.raw)
          
        }

        // push到详细的event_list
        events.push(matches)
        events_raw.push(matches_raw)

      }
      else console.log('file', file, '❌')
    }
    
    console.log('events', dat.id, ++i, '/', files.length, '✔️')
  }

  // 保存文件
  map2file(events, "./dist", "events.json")
  map2file(events_raw, "./dist", "events_raw.json")

}

// 入口函数
const main = async () => {
  await eventMatchList()
}

main()