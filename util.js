
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

module.exports= {
  sleep
}