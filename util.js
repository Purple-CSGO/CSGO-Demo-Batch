
// 异步sleep
const sleep = (timeountMS) => new Promise((resolve) => {
  setTimeout(resolve, timeountMS);
});

// 读取设置
const readSetting = () => {
  if (fs.existsSync("./MatchConfig/config.json")) {
    let data = fs.readFileSync("./MatchConfig/config.json")
    config = JSON.parse(data)
  }
}

// 保存设置
const writeSetting = () => {
  let data = JSON.stringify(config)
  fs.writeFileSync("./MatchConfig/config.json", data)

  let ev = JSON.stringify(_strMapToObj(events))
  fs.writeFileSync("./MatchConfig/events.json", ev)
}

// 字典->object
const _strMapToObj = (strMap) => {
  let obj= Object.create(null);
  for (let[k,v] of strMap) {
    obj[k] = v;
  }
  return obj;
}

// 通过原始链接获取实际下载链接
const getDownloadUrl = (url) => {
  var cmd = `wget -nv -N --spider --content-disposition ${url}`

  const cp = require("child_process")
  cp.exec(cmd, (err, stdout, stderr) => {
    if (err) {
      console.error(err)
    }
    
    const downloadUrl = parseDownloadUrl(stderr)
    console.log(downloadUrl)

    return downloadUrl
  })

}

// 从 wget 输出中提取 demo 实际的下载链接
const parseDownloadUrl = (str) => {
  console.log('parse.str: ', str)
  var re = /https:\/\/demos\.hltv\.org\S+/g
  var res = str.match(re)

  return res.length === 1 ? res[0]: ''
}

// 从下载链接获取文件名
const parseFileName = (str) => {
  var re = /\/([^/]+$)/g
  var res = str.match(re)

  return res.length === 1 ? res[0]: ''
}

module.exports= {
  sleep, getDownloadUrl, parseDownloadUrl, parseFileName
}