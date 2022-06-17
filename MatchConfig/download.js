// 2022年的第一个match id 开始 示例 match.json
let config = {
  target_dir: ".",
  start: "2353897", // 1月2日
  end: "2356303", // 6月6日 IEM Dallas 决赛 C9 > ENCE
  current: "",
  matches: [],
  // events: [],
  note: "1月2日 ~ 6月6日 IEM Dallas 决赛 C9 > ENCE"
}

// 下载
const down = (url, target_dir) => {
  var cp = require("child_process");
  cp.exec(`wget --content-disposition -P ${target_dir} ${url}`, function(err, stdout, stderr) {
      if (err) {
          console.error(err)
          return false
      }

      return true
  });
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

  // let ev = JSON.stringify(_strMapToObj(events))
  // fs.writeFileSync("./MatchConfig/events.json", ev)
}

// 搬砖主函数
const worker = async () => {
  readSetting()

  setInterval(writeSetting, 60000) // 1min保存一次

  console.log("当前设置\n", config.target_dir, config.start, config.end, config.note)

  config.matches.forEach(match => {
    if (!match.done) {
      down(match.url, config.target_dir + "/Matches" + match.event_name.replace(' ', '-'))
    }
  });
}

worker()