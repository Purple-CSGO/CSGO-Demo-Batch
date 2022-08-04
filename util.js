const fs = require('fs')
const path = require('path')

// 异步sleep
const sleep = (timeountMS) => new Promise((resolve) => {
  setTimeout(resolve, timeountMS);
});

// 从下载链接获取文件名 || 路径最后元素
const parseFileName = (str) => {
  var re = /\/([^/]+$)/
  var res = str.match(re)
  
  return res !== null && res.length >= 1 ? res[1]: ''
}

// map解析json并保存文件
const map2file = (obj, dir, filename, space = 0) => {
  // 检查并生成目录
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }

  // 解析json并写入文件
  jsonData = space !== 0? JSON.stringify(obj, null, space): JSON.stringify(obj)
  fs.writeFileSync(path.join(dir, filename), jsonData)
}

// 字典->object
const _strMapToObj = (strMap) => {
  let obj= Object.create(null);
  for (let[k,v] of strMap) {
    obj[k] = v;
  }
  return obj;
}


// ================= 设置读写 ==================

// 读设置
const readCFG = (cfg, wd = '.', filename = 'config.json') => {
  // 文件不存在
  var file = path.join(wd, filename)
  if (!fs.existsSync(file)) return cfg

  // 读取设置文件
  const resp = fs.readFileSync(file)
  var temp = JSON.parse(resp)

  // 读取异常
  if (temp === null||temp === undefined||temp.wd === "")
    return cfg

  return temp
}

// 写设置
const writeCFG = (cfg, wd = '.', filename = 'config.json') => {
  map2file(cfg, wd, filename, 2)
}


// ================= 业务相关 ==================

// 通过原始链接获取实际下载链接
const getDownloadUrl = async (url) => {
  var cmd = `wget -nv -N --spider --no-check-certificate --content-disposition ${url}`

  const cp = require("child_process")
  return await new Promise((resolve, reject) => {
    cp.exec(cmd, (err, stdout, stderr) => {
      if (err) {
        reject(err)
      }
    
      resolve(parseDownloadUrl(stderr))
    })
  })
}

// 从 wget 输出中提取 demo 实际的下载链接
const parseDownloadUrl = (str) => {
  var re = /https:\/\/demos\.hltv\.org\S+/g
  var res = str.match(re)

  return res !== null && res.length === 1 ? res[0]: ''
}

// 获取比赛数据
const getMatchData = async (id) => {
  let match = {
    // name: '',
    id: '',
    download_id: '',
    download_url: '',
    filename: '',
    event_id: 0,
  }
  var url = ''

  const { HLTV } = require('hltv')
  const resp = await HLTV.getMatch({id: id, delayBetweenPageRequests: 100 }).catch(err => {console.log(id, '❌', err)}) //console.log(id, '❌')

  if (resp === null||resp === undefined) return null

  match.id = resp.id
  match.event_id = resp.event.id

  // 获取下载链接
  for (var i of resp.demos) {
    if (i.name === "GOTV Demo") {
      url = "https://www.hltv.org" + i.link
      break
    }
  }

  // 获取下载链接和url
  if (url !== '') {
    match.download_url = await getDownloadUrl(url)
    match.filename = parseFileName(match.download_url)
    match.download_id = Number(parseFileName(url))
  }

  return {data: match, raw: resp}
}

// 获取赛事数据
const getEventData = async (id) => {
  const { HLTV } = require('hltv')
  const resp = await HLTV.getEvent({id: id}).catch(err => {}) //console.log(id, '❌')

  if (resp === null||resp === undefined) return null

  let event = {
    id: id,
    name: resp.name,
    logo_url: resp.logo,
  }

  return {data: event, raw: resp}
}

// 合并生成赛事-比赛列表数据
const mergeEventMatchList = async () => {

  return
}

module.exports= {
  sleep, map2file,
  readCFG, writeCFG,
  getDownloadUrl, parseDownloadUrl, parseFileName,
  getMatchData, getEventData, mergeEventMatchList
}