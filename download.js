const fs = require('fs');
const cp = require("child_process");
const { exit } = require('process');

// 2022年的第一个match id 开始 示例 match.json
let config = {
  note: "1月2日 ~ 3月31日",
  target_dir: "./Matches",
  start: "2353897", // 1月2日
  end: "2355496", // 6月6日 IEM Dallas 决赛 C9 > ENCE
  current: "",
  proxy: "", // -e \"http_proxy=127.0.0.1:7890\"
  matches: [],
  // events: [],
}

// 下载
const down = (url, target_dir) => {
  if (url === "") {
    console.log("skip")
    return
  }
  let link = "wget -nv -c -N --content-disposition --no-check-certificate -e \"https_proxy=http://127.0.0.1:7890\" -P " + target_dir + " " + url
  console.log(link)
  cp.execSync(link, function(err, stdout, stderr) {
      if (err) {
          console.error(err)
          console.log('error')
      }

      console.log(stdout, stderr)
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
  // console.log('hello save')
  let data = JSON.stringify(config)
  fs.writeFileSync("./MatchConfig/config.json", data)

  // let ev = JSON.stringify(_strMapToObj(events))
  // fs.writeFileSync("./MatchConfig/events.json", ev)
}

// 搬砖主函数
const worker = async () => {
  readSetting()

  console.log("当前设置\n", config.target_dir, config.start, config.end, config.note)

  let counter = 0
  config.matches.forEach((match, index, arr) => {
    if (match.done===false) {
      console.log(match.id, match.id-config.start, '/', config.end-config.start, match.event_name, "| url:", match.link)
      down(match.link, config.target_dir + "/" + match.event_name.replaceAll(' ', '-') )

      config.matches[index].done = true
    }
    
    // 保存
    counter++
    if (counter % 4 == 0) {
      writeSetting()
      counter = 0
    }
  });

  writeSetting()
}

worker()

exit(0)