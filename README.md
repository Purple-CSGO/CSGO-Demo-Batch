# CSGO Demo Batch

批量收集CSGO比赛、赛事等信息。 

> Match Results, Events, etc

## 说明

利用 node `hltv` 库获取 Match 和 Event 的信息，保存 raw json 文件，另保存 Match: id - download_id - download_url - filename 和 Event: id - name - logo_url - match_list。

### 比赛id

- 最早csgo比赛id 2146342 | nip-vs-e-srael-steelseries-go-2012

- 最新8.4 3:00am 比赛id 2357516 | eternal-fire-academy-vs-fnatic-rising-weplay-academy-league-season-5

### 赛事id

- 最早：939

- 当前最新：6705 | 有的更小的id还没开始的