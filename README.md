# CSGO Demo Batch

批量收集CSGO比赛、赛事等信息。 

> Match Results, Events, etc

## 说明

利用 node `hltv` 库获取 Match 和 Event 的信息，保存 raw json 文件，另保存 Match: id - download_id - download_url - filename 和 Event: id - name - logo_url - match_list。

> 下载好信息后的汇总（如event.match_list）待完成

### 比赛id

- 最早：2146342 | nip-vs-e-srael-steelseries-go-2012

- 最新：2357516 | eternal-fire-academy-vs-fnatic-rising-weplay-academy-league-season-5（8.4 3am）

### 赛事id

- 最早：939

- 最新：6705 | 有的更小的id还没开始的（8.4 3am）

## 使用方法

### 直接下载使用

前往 Release 页面下载编译好的程序压缩包，解压后运行


### 从源码构建

1. clone项目代码
2. 配置好 nodejs 环境
3. `npm install` 或 `yarn install` 安装依赖
4. `node match` 或 `node event` 下载比赛或赛事的信息

### 使用细节

命令行参数传递工作目录，非当前目录时务必加上，如：

```bash
node match /data/csgo-demo-batch

# 可执行程序
./match-linux /data/csgo-demo-batch
```

配置文件 `cfg_match.json` 和 `cfg_event.json` 在首次运行后自动生成，可以修改设置项后重新运行

- wd: 工作目录
- start: 起始id
- end: 结束id
- current: 当前id
- note: 说明，方便区分下载的范围