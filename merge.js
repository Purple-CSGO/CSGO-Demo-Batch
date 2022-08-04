// const fs = require('fs')

const {mergeEventMatchList} = require('./util.js')


// 入口函数
const main = async () => {
  cfg = readCFG(cfg, cfg.wd, 'cfg_merge.json')

  cfg = await mergeEventMatchList(cfg)
  
  writeCFG(cfg, cfg.wd, 'cfg_merge.json')

  console.log('end')
}

main()